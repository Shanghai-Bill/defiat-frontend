
export const viewBurnRate = async (governanceContract) => {
  try {
    const burnRate = await governanceContract.methods
      .viewBurnRate()
      .call();
    return (burnRate/100).toFixed(2);
  } catch (e) {
    return '0';
  }
}

export const viewFeeRate = async (governanceContract) => {
  try {
    const feeRate = await governanceContract.methods
      .viewFeeRate()
      .call();
    return (feeRate/100).toFixed(2);
  } catch (e) {
    return '0';
  }
}
