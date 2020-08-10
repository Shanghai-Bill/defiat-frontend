// SPDX-License-Identifier: stupid


/* basic interfaces used for testing */

pragma solidity ^0.6.0;


interface myPoints {
    // launch code "AT ADDRESS"  0xBac9EF6a9eBF7e109c1011C68b0Dbac8C309fCc6
    
    
    //see your points
    function balanceOf(address _address) external view returns(uint256);
    
    //see the discount of an address in base 1000 (20 = 2%)
    function viewDiscountOf(address _address) external view returns(uint256);
    
    //check the eligibility of a discount. Returns a "tranche" -> 1 = 10%, 2 = 20%
    function viewEligibilityOf(address _address) external view returns (uint256 tranche);
    
    //update my discount: check my eligibility and activates the highest discount I can get.
    function updateMyDiscountOf() external returns (bool);
    
    /*Discount Table nbLoyalty Points -> discount
    0       -> 0%
    5       -> 10%
    10      -> 20%
    25      -> 30%
    50      -> 40%
    100     -> 50%
    250     -> 60%
    500     -> 70%
    1000    -> 80%
    100000  -> 90%
    */
    
    
//force discount: gives an arbitrary discount (should not work for the pleb... only governance):
function overrideDiscount(address _address, uint256 _newDiscount) external;
}
//====
interface Governance{
// launch code "AT ADDRESS"  0x064FD7D9C228e8a4a2bF247b432a34D6E1CB9442

//shows burn and fees rate. Base 1000 ( 1 = 0.1%   10 = 1%   100 = 10%)
    function viewBurnRate() external returns (uint256); 
    function viewFeeRate() external returns (uint256); 

//for governors only (should not work with plebls)
//use base1000 numbers. 1 = 0.1%, 10 = 1%
    function changeBurnRate(uint _burnRate) external;     //base 1000
    function changeFeeRate(uint _feeRate) external;   //base 1000
    function setFeeDestination(address _nextDest) external view;
}
