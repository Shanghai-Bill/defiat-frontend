pragma solidity ^0.6.0;

import "../_Vote.sol";

contract FeeRateVote is Vote {
  uint256 proposedFeeRate;

  constructor (
    uint256 _proposedFeeRate,
    address _DeFiat_Gov,
    uint256 _startTime,
    uint256 _delayHours, 
    bytes32 _vote, 
    address _votingPowerToken, 
    address _rewardToken, 
    uint256 _rewardAmount
  ) public {
    proposedFeeRate = _proposedFeeRate;

    _constructor(
      _DeFiat_Gov, 
      _delayHours, 
      _value, 
      _votingPowerToken, 
      _rewardToken, 
      _rewardAmount);
  }

  function proposalAction() override VotePassed returns (bool) {
    IDeFiat_Gov(DeFiat_Gov).changeFeeRate(proposedFeeRate);

    return true;
  }
}

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