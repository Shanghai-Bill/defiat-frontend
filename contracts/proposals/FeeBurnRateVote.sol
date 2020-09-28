pragma solidity ^0.6.0;

import "../_Vote.sol";

// contract must be given governor rights

contract FeeBurnRateVote is _Vote {
  constructor (
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
    _Vote(
        _DeFiat_Gov, 
        _delayStartHours,
        _durationHours, 
        _voteName,
        _voteChoices,
        _quorum,
        _rewardToken, 
        _rewardAmount,
        _uniFactoryAddress,
        _wethAddress
    )
  {
  }

  function proposalAction() public override returns (bool) {
    uint256 newRate;
    uint256 winningChoice;
    uint256 maxVotes = 0;
    for (uint i = 0; i < voteChoices.length; i++) {
      if (voteChoices[i] >= maxVotes) {
        winningChoice = i;
        maxVotes = voteChoices[i];
      }
    }

    if (winningChoice == 0) {
      newRate = 0;
    } else if (winningChoice == 1) {
      newRate = 10;
    } else {
      newRate = 50;
    }

    IDeFiat_Gov(DeFiat_Gov).changeFeeRate(newRate);
    IDeFiat_Gov(DeFiat_Gov).changeBurnRate(newRate);

    return true;
  }
}