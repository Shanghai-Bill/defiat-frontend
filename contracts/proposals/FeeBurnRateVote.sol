pragma solidity ^0.6.0;

import "../_Vote.sol";

contract FeeBurnRateVote is VoteBase {
  constructor (
    address _DeFiat_Gov,
    uint256 _delayStartHours,
    uint256 _durationHours, 
    bytes32 _voteName,
    uint256 _voteChoices,
    uint256 _quorum,
    address _votingPowerToken, 
    address _rewardToken, 
    uint256 _rewardAmount
  ) public 
    VoteBase(
      _DeFiat_Gov, 
      _delayStartHours,
      _durationHours, 
      _voteName,
      _voteChoices,
      _quorum,
      _votingPowerToken, 
      _rewardToken, 
      _rewardAmount)
  {
  }

  function proposalAction() public override QuorumReached returns (bool) {
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