// SPDX-License-Identifier: stupid

/*Readme:
This contract needs to be registered as a "governor" in the governing contract.
Below are the functions that can be used to generate a vote


COPY PASTE THESE 
//== SET EXTERNAL VARIABLES on the DeFiat_Gov contract ==  
    function setActorLevel(address _address, uint256 _newLevel) external;
    function changeBurnRate(uint _burnRate) external;
    function changeFeeRate(uint _feeRate) external;
    function setFeeDestination(address _nextDest) external;
    
//== SET EXTERNAL VARIABLES on the DeFiat_Points contract ==  
    function setTxTreshold(uint _amount) external;
    function overrideDiscount(address _address, uint256 _newDiscount) external;
    function overrideLoyaltyPoints(address _address, uint256 _newPoints) external;
    function setDiscountTranches(uint256 _tranche, uint256 _pointsNeeded) external;
    }
*/

// SPDX-License-Identifier: stupid

pragma solidity ^0.6.0;

import "IERC20.sol";
import "SafeMath.sol";
//import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC20/IERC20.sol";
//used to give tokens as rewards (tokens need to be loaded on the contract 1st)


abstract contract Vote {

  address public owner; // contract deployer
  address public DeFiat_Gov; //governance contract

  bytes32 public voteName; // name to describe the vote
  uint256 public voteStart; // UTC timestamp for voteStart
  uint256 public voteEnd; // UTC timestamp for voteEnd

  uint256 public quorum; // x / 100 = required % of votes / voting power for vote to be actionable
  uint256 public votesYAY;
  uint256 public votesNAY;
  mapping (address => uint256) public votes; //votes (block.time)

  address public votingPowerToken;
  address public rewardToken;
  uint256 public rewardAmount;

  event voteStart(address _Defiat_Gov, uint256 _voteStart, uint256 _voteEnd, bytes32 _hash, string _voteName);

  modifier OnlyOwner() {
      require(msg.sender == owner);
      _;
  }

  modifier TokenHolder{
      require(IERC20(votingPowerToken).balanceOf(msg.sender) > 0, "Only holders can vote");
      _;
  }

  modifier VoteClosed() {
      require(now > expirationDate, "Vote is still open");
      _;
  }

  modifier VoteOpen() {
      require(now > startDate, "Vote is not open");
      require(now < expirationDate, "Voting has expired");
      _;
  }

  modifier CanVote()   {
      require(votes[msg.sender] == 0, "Already voted"); //block time has not been updated
      _;
  }

  modifier QuorumReached {
    require(votesYAY + votesNAY > IERC20(votingPowerToken).totalSupply() * (quorum / 100), "Not enough votes have been cast");
    _;
  }

  modifier VotePassed {
      require(votesYAY + votesNAY > IERC20(votingPowerToken).totalSupply() * (quorum / 100), "Not enough votes have been cast");
      require(votesYAY > votesNAY, "Voted against");
      require(expirationDate < now, "Voting still ongoing");
      _;
  }



// INITIALIZE
    /*function setupTokens(address _votingPowerToken, address _rewardToken, uint256 _rewardAmount) external OnlyOwner {
        rewardToken = _rewardToken;
        rewardAmount = _rewardAmount;
        votingPowerToken = _votingPowerToken;
    }*/
  constructor(
      address _DeFiat_Gov,
      uint256 _delayStartHours,
      uint256 _durationHours, 
      uint256 _voteName,
      uint256 _quorum,
      address _votingPowerToken, 
      address _rewardToken, 
      uint256 _rewardAmount
  ) public {
      owner = msg.sender;
      DeFiat_Gov = _DeFiat_Gov;
      voteStart = block.timestamp + _delayStartHours.mul(3600);
      voteEnd = voteStart + _durationHours.mul(3600);
      voteName = _voteName;
      rewardToken = _rewardToken;
      rewardAmount = _rewardAmount;
      votingPowerToken = _votingPowerToken;
      quorum = _quorum;
      decisionActivated = false;

      bytes32 _hash = sha256(abi.encodePacked(DeFiat_Gov, expirationDate, _value));
      emit voteStart(DeFiat_Gov, voteStart, voteEnd,  _hash, voteName);
  }

  // 0 - define virtual proposal action function
  //    all new votes will override this method with the intended function to be activated on vote passing
  function proposalAction() public virtual VotePassed returns (bool);

  //1- define ACTIVATION function
  function activateDecision() external VotePassed { //anybody can activate this.
      require(expirationDate < now, "Voting still ongoing");
      require(!decisionActivated, "Vote decision has already been activated");

      proposalAction();
      
      voteIsOpen = false; //close vote
  }
  

  //2- Gather votes
  function voteYAY() external VoteOpen CanVote TokenHolder {
      votes[msg.sender] = block.number; //registers voteNAY
      votesYAY = votesYAY + myVotingPower(); //we can use external
      _sendReward(msg.sender);
  }

  function voteNAY() external VoteOpen CanVote TokenHolder {
      votes[msg.sender] = block.number; //registers voteNAY
      votesNAY = votesNAY + myVotingPower();
      _sendReward(msg.sender);
  }

  //3- reward voters
  function _sendReward(address _address) internal {
      if(IERC20(rewardToken).balanceOf(address(this)) >= rewardAmount){
        IERC20(rewardToken).transfer(_address, rewardAmount);
      }
  } //rewards if enough in the pool
    
  //0- Misc functions
  function forceVoteStatus(bool _open) external OnlyOwner {
      voteIsOpen = _open;
  }
  
  function killContract() external OnlyOwner {
      selfdestruct(msg.sender); //destroys the contract
  } //only Mastermind can kill contract

  function myVotingPower() internal view returns(uint256) {
    // simple 1:1 token to vote
      uint256 _power =  IERC20(votingPowerToken).balanceOf(msg.sender);
      return _power;
  }

  function widthdrawAnyToken(address _ERC20address) external OnlyOwner returns (bool) {
      uint256 _amount = IERC20(_ERC20address).balanceOf(address(this));
      _widthdrawAnyToken(msg.sender, _ERC20address, _amount);
      return true;
  } //get tokens sent by error to contract

  function _widthdrawAnyToken(address _recipient, address _ERC20address, uint256 _amount) internal returns (bool) {
      IERC20(_ERC20address).transfer(_recipient, _amount); //use of the _ERC20 traditional transfer
      return true;
  } //get tokens sent by error to contract
 
} //end contract


interface IDeFiat_Gov {
  function setActorLevel(address _address, uint256 _newLevel) external;
  function changeBurnRate(uint _burnRate) external;
  function changeFeeRate(uint _feeRate) external;
  function setFeeDestination(address _nextDest) external;

  //== SET EXTERNAL VARIABLES on the DeFiat_Points contract ==  
  function setTxTreshold(uint _amount) external;
  function overrideDiscount(address _address, uint256 _newDiscount) external;
  function overrideLoyaltyPoints(address _address, uint256 _newPoints) external;
  function setDiscountTranches(uint256 _tranche, uint256 _pointsNeeded) external;
}
  

//contract end
