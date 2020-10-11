
export const getDiscountRate = async (pointsContract, address) => {
  try {
    const discountRate = await pointsContract.methods
      .getDiscountRate(address)
      .call();
    return (+discountRate).toFixed(2);
  } catch (e) {
    return '0';
  }
}

export const viewEligibilityOf = async (pointsContract, address) => {
  try {
    const eligibleLevel = await pointsContract.methods
      .viewEligibilityOf(address)
      .call();
    return eligibleLevel;
  } catch (e) {
    return '0';
  }
}

export const viewDiscountOf = async (pointsContract, address) => {
 try {
    const discountLevel = await pointsContract.methods
      .viewDiscountOf(address)
      .call();
    return discountLevel; // return current level
 } catch (e) {
   return '0';
 }
}

export const _discountTranches = async (pointsContract, tranche) => {
  try {
    const tranchePoints = await pointsContract.methods
      ._discountTranches(tranche)
      .call();
    return tranchePoints;
  } catch (e) {
    return '0';
  }
} 

export const updateDiscountOf = async (pointsContract, address) => {
  try {
    return await pointsContract.methods
      .updateDiscountOf()
      .send({from: address})
      .on('transactionHash', (tx) => tx.transactionHash)
      .on('error', () => false);
  } catch (e) {
    return false;
  }
}