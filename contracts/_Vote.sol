// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

import "./_Interfaces.sol";
import "./SafeMath.sol";
import "./ERC20_Utils.sol";
import "./Uni_Price_v2.sol";

abstract contract _Vote is ERC20_Utils, Uni_Price_v2 {
    using SafeMath for uint256;

    address public DeFiat_Gov; //governance contract

    string public voteName; // name to describe the vote
    uint256 public voteStart; // UTC timestamp for voteStart
    uint256 public voteEnd; // UTC timestamp for voteEnd
    bool public decisionActivated; // track whether decision has been activated

    uint256 public quorum; // x / 100 = required % of votes / voting power for vote to be actionable
    uint256 public totalVotes; // total votes cast
    uint256[] public voteChoices; // array of choices to vote for 
    mapping (address => uint256) public votes; // address => user vote choice

    uint internal stackPointer;

    struct PoolStruct {
        address poolAddress;
        address stakedAddress;
    }
    mapping (uint => PoolStruct) public stakingPools;

    address public rewardToken;
    uint256 public rewardAmount;

    event voteStarting(address _Defiat_Gov, uint256 _voteStart, uint256 _voteEnd, bytes32 _hash, string _voteName);
    event voteSending(address indexed user, uint voteChoice, uint256 timestamp);

    modifier OnlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier TokenHolder{
        require(myVotingPower(msg.sender) > 0, "Only holders can vote");
        _;
    }

    modifier VoteClosed() {
        require(now > voteEnd, "Vote is still open");
        require(decisionActivated, "Vote decision must be activated");
        _;
    }

    modifier VoteOpen() {
        require(now > voteStart, "Vote is not open");
        require(now < voteEnd, "Voting has expired");
        _;
    }

    modifier CanVote()   {
        require(votes[msg.sender] == 0, "Already voted"); //block time has not been updated
        _;
    }

    // modifier QuorumReached {
    //     require(totalVotes > IERC20(votingPowerToken).totalSupply() * (quorum / 100), "Not enough votes have been cast");
    //     _;
    // }

    constructor(
        address _DeFiat_Gov,
        uint256 _delayStartHours,
        uint256 _durationHours, 
        string memory _voteName,
        uint256 _voteChoices,
        uint256 _quorum,
        address _rewardToken, 
        uint256 _rewardAmount,
        address _uniFactoryAddress,
        address _wethAddress
    ) public
        Uni_Price_v2(_uniFactoryAddress, _wethAddress)
    {    
        DeFiat_Gov = _DeFiat_Gov;
        voteStart = block.timestamp + (_delayStartHours * 3600);
        voteEnd = voteStart + (_durationHours * 3600);
        voteName = _voteName;
        voteChoices = new uint256[](_voteChoices);
        rewardToken = _rewardToken;
        rewardAmount = _rewardAmount;
        quorum = _quorum;
        decisionActivated = false;

        bytes32 _hash = sha256(abi.encodePacked(DeFiat_Gov, voteEnd));
        emit voteStarting(DeFiat_Gov, voteStart, voteEnd,  _hash, voteName);
    }

    // 0 - define virtual proposal action function
    //    all new votes will override this method with the intended function to be activated on vote passing
    function proposalAction() public virtual returns (bool);

    //1- define ACTIVATION function
    function activateDecision() external { //anybody can activate this.
        require(voteEnd < now, "Voting still ongoing");
        require(!decisionActivated, "Vote decision has already been activated");

        decisionActivated = true; // mark decision activated
        proposalAction();
    }
    
    //2- define power function
    function myVotingPower(address _address) public view returns(uint256) {
        // simple 1:1 token to vote
        uint256 _power = 0;
        for (uint i = 0; i < stackPointer; i++) {
            PoolStruct memory pool = stakingPools[i];
            uint256 tokensPerEth = getUniPrice(pool.stakedAddress);
            uint256 stakedTokens = getStake(_address, pool.poolAddress);
            _power = _power + stakedTokens.mul(tokensPerEth).div(1e18);
        }

        return _power;
    }

    function getStake(address _address, address _poolAddress) public view returns(uint256) {
        return IDungeon(_poolAddress).myStake(_address);
    }

    function vote(uint voteChoice) external VoteOpen CanVote TokenHolder {
        require(voteChoice < voteChoices.length && voteChoice >= 0, "Invalid vote choice");

        uint256 votePower = myVotingPower(msg.sender);
        votes[msg.sender] = voteChoice; // log of user vote 
        voteChoices[voteChoice] = voteChoices[voteChoice] + votePower; // increase vote count
        totalVotes = totalVotes + votePower; // increase total votes

        _sendReward(msg.sender);

        emit voteSending(msg.sender, voteChoice, block.timestamp);
    }

    //3- reward voters
    function _sendReward(address _address) internal {
        if(IERC20(rewardToken).balanceOf(address(this)) >= rewardAmount){
            IERC20(rewardToken).transfer(_address, rewardAmount);
        }
    } //rewards if enough in the pool

    // Owner Functions

    function pushStakingPool(address _poolAddress, address _stakedAddress) external OnlyOwner {
        stakingPools[stackPointer++] = PoolStruct(_poolAddress, _stakedAddress);
    }

    function popStakingPool() external OnlyOwner {
        require(stackPointer > 0, "Nothing to pop!");
        delete(stakingPools[--stackPointer]);
    }
    
    function forceVoteEnd() external OnlyOwner {
        voteEnd = now;
    }

    function forceDecision(bool _decision) external OnlyOwner {
        decisionActivated = _decision;
    }
    
} //end contract
