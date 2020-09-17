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
//import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/contracts/token/ERC20/IERC20.sol";
//used to give tokens as rewards (tokens need to be loaded on the contract 1st)

library SafeMath{
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     *
     * _Available since v2.4.0._
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
    
        /**
     * @dev Returns the largest of two numbers.
     */
    function max(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    /**
     * @dev Returns the smallest of two numbers.
     */
    function min(uint256 a, uint256 b) internal pure returns (uint256) {
        return a < b ? a : b;
    }

    /**
     * @dev Returns the average of two numbers. The result is rounded towards
     * zero.
     */
    function average(uint256 a, uint256 b) internal pure returns (uint256) {
        // (a + b) / 2 can overflow, so we distribute
        return (a / 2) + (b / 2) + ((a % 2 + b % 2) / 2);
    }
}


abstract contract Vote {

  address public owner; // contract deployer
  address public DeFiat_Gov; //governance contract

  bytes32 public voteName; // name to describe the vote
  uint256 public voteStart; // UTC timestamp for voteStart
  uint256 public voteEnd; // UTC timestamp for voteEnd
  bool public decisionActivated; // track whether decision has been activated

  uint256 public quorum; // x / 100 = required % of votes / voting power for vote to be actionable
  uint256 public totalVotes; // total votes cast
  uint256[] public voteChoices; // array of choices to vote for 
  mapping (address => uint256) public votes; // address => user vote choice
  mapping (address => uint256) public votingTokens; // address => locked tokens

  address public votingPowerToken;
  address public rewardToken;
  uint256 public rewardAmount;

  event voteStarting(address _Defiat_Gov, uint256 _voteStart, uint256 _voteEnd, bytes32 _hash, bytes32 _voteName);

  modifier OnlyOwner() {
      require(msg.sender == owner);
      _;
  }

  modifier TokenHolder{
      require(IERC20(votingPowerToken).balanceOf(msg.sender) > 0, "Only holders can vote");
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

  modifier QuorumReached {
    require(totalVotes > IERC20(votingPowerToken).totalSupply() * (quorum / 100), "Not enough votes have been cast");
    _;
  }

  constructor(
      address _DeFiat_Gov,
      uint256 _delayStartHours,
      uint256 _durationHours, 
      bytes32 _voteName,
      uint256 _voteChoices,
      uint256 _quorum,
      address _votingPowerToken, 
      address _rewardToken, 
      uint256 _rewardAmount
  ) public {
      owner = msg.sender;
      DeFiat_Gov = _DeFiat_Gov;
      voteStart = block.timestamp + (_delayStartHours * 3600);
      voteEnd = voteStart + (_durationHours * 3600);
      voteName = _voteName;
      voteChoices = new uint256[](_voteChoices);
      rewardToken = _rewardToken;
      rewardAmount = _rewardAmount;
      votingPowerToken = _votingPowerToken;
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

  function vote(uint voteChoice, uint256 votePower) external VoteOpen CanVote TokenHolder {
        require(voteChoice < voteChoices.length, "Invalid vote choice");
        
        IERC20(votingPowerToken).transferFrom(msg.sender, address(this), votePower); // transfer tokens to contract
        votes[msg.sender] = voteChoice; // log of user vote 
        votingTokens[msg.sender] = votingTokens[msg.sender] + votePower; // increase locked token pointer
        voteChoices[voteChoice] = voteChoices[voteChoice] + votePower; // increase vote count
        totalVotes = totalVotes + votePower; // increase total votes

        _sendReward(msg.sender);
  }

  //3- reward voters
  function _sendReward(address _address) internal {
      if(IERC20(rewardToken).balanceOf(address(this)) >= rewardAmount){
        IERC20(rewardToken).transfer(_address, rewardAmount);
      }
  } //rewards if enough in the pool

  //4- claim tokens when vote is over
  function claimTokens() external VoteClosed {
        require(votingTokens[msg.sender] > 0, "No tokens to claim");

        uint256 votingPower = votingTokens[msg.sender];
        IERC20(votingPowerToken).transfer(msg.sender, votingPower);
        votingTokens[msg.sender] = votingTokens[msg.sender] - votingPower;

  } 
    
  //0- Misc functions
  function forceVoteEnd() external OnlyOwner {
      voteEnd = now;
  }

  function forceDecision(bool _decision) external OnlyOwner {
      decisionActivated = _decision;
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
