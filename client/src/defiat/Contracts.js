import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { Addresses } from './lib/addresses';
import { Partners } from './lib/partners';
import { Pools } from './lib/pools';
import { Proposals } from './lib/proposals';
import DeFiat_Native_Farming from '../contracts/DeFiat_Farming_v15.json';
import DeFiat_Partner_Farming_v1 from '../contracts/DeFiat_EXTFarming_V2.json';
import DeFiat_Gov from '../contracts/DeFiat_Gov.json';
import DeFiat_Points from '../contracts/DeFiat_Points.json';
import DeFiat_Token from '../contracts/DeFiat_Token.json';
import DeFiat_Vote from '../contracts/_Vote.json';
import IERC20 from '../contracts/_ERC20.json';
// import DeFiat

export const ConfirmationType = {
  Hash: 0,
  Confirmed: 1,
  Both: 2,
  Simulate: 3,
}

export class Contracts {
  // create all contract objects
  constructor(provider, networkId, web3) {
    this.web3 = web3;
    this.defaultAccount = this.web3.eth.defaultAccount;

    this.tokenContract = new this.web3.eth.Contract(DeFiat_Token.abi);
    this.pointsContract = new this.web3.eth.Contract(DeFiat_Points.abi);
    this.governanceContract = new this.web3.eth.Contract(DeFiat_Gov.abi);

    const mapPools =

    this.nativePools = Pools[networkId].map(({
      poolAddress,
      stakedAddress,
      rewardAddress
    }) => ({
      poolAddress,
      poolContract: new this.web3.eth.Contract(DeFiat_Native_Farming.abi),
      stakedAddress,
      stakedContract: new this.web3.eth.Contract(IERC20.abi),
      rewardAddress,
      rewardContract: new this.web3.eth.Contract(IERC20.abi)
    }));

    this.partnerPools = Partners[networkId].map(({
      poolAddress,
      stakedAddress,
      rewardAddress
    }) => ({
      poolAddress,
      poolContract: new this.web3.eth.Contract(DeFiat_Partner_Farming_v1.abi),
      stakedAddress,
      stakedContract: new this.web3.eth.Contract(IERC20.abi),
      rewardAddress,
      rewardContract: new this.web3.eth.Contract(IERC20.abi)
    }));

    this.proposals = Proposals[networkId].map(({
      proposalAddress
    }) => ({
      proposalAddress,
      proposalContract: new this.web3.eth.Contract(DeFiat_Vote.abi)
    }));

    this.setProvider(provider, networkId);
  }

  // bind contracts to network addresses
  setProvider(provider, networkId) {

    const setProvider = (contract, address) => {
      contract.setProvider(provider)
      if (address) contract.options.address = address
      else console.error('Contract address not found in network', networkId)
    }

    const setPoolProvider = ({ 
      poolContract,
      poolAddress,
      stakedContract,
      stakedAddress,
      rewardContract, 
      rewardAddress
    }) => {
      setProvider(poolContract, poolAddress);
      setProvider(stakedContract, stakedAddress);
      setProvider(rewardContract, rewardAddress);
    }

    setProvider(this.tokenContract, Addresses[networkId].token);
    setProvider(this.pointsContract, Addresses[networkId].points);
    setProvider(this.governanceContract, Addresses[networkId].gov);

    this.nativePools.forEach(pool => setPoolProvider(pool));
    this.partnerPools.forEach(pool => setPoolProvider(pool));
    this.proposals.forEach(({ proposalContract, proposalAddress }) =>
     setProvider(proposalContract, proposalAddress)
    );
  }

  setDefaultAccount(account) {
    this.defaultAccount = account;
  }

  async callContractFunction(method, options) {
    const {
      confirmations,
      confirmationType,
      autoGasMultiplier,
      ...txOptions
    } = options

    if (confirmationType === ConfirmationType.Simulate || !options.gas) {
      let gasEstimate
      if (
        this.defaultGas &&
        confirmationType !== ConfirmationType.Simulate
      ) {
        txOptions.gas = this.defaultGas
      } else {
        try {
          console.log('estimating gas')
          gasEstimate = await method.estimateGas(txOptions)
        } catch (error) {
          const data = method.encodeABI()
          const { from, value } = options
          const to = method._parent._address
          error.transactionData = { from, value, data, to }
          throw error
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier
        const totalGas = Math.floor(gasEstimate * multiplier)
        txOptions.gas =
          totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit
      }

      if (confirmationType === ConfirmationType.Simulate) {
        let g = txOptions.gas
        return { gasEstimate, g }
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0)
    } else {
      txOptions.value = '0'
    }

    const promi = method.send(txOptions)

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    }

    let hashOutcome = OUTCOMES.INITIAL
    let confirmationOutcome = OUTCOMES.INITIAL

    const t =
      confirmationType !== undefined ? confirmationType : this.confirmationType

    if (!Object.values(ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`)
    }

    let hashPromise
    let confirmationPromise

    if (
      t === ConfirmationType.Hash ||
      t === ConfirmationType.Both
    ) {
      hashPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        promi.on('transactionHash', (txHash) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.RESOLVED
            resolve(txHash)
            if (t !== ConfirmationType.Both) {
              const anyPromi = promi
              anyPromi.off()
            }
          }
        })
      })
    }

    if (
      t === ConfirmationType.Confirmed ||
      t === ConfirmationType.Both
    ) {
      confirmationPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (
            (t === ConfirmationType.Confirmed ||
              hashOutcome === OUTCOMES.RESOLVED) &&
            confirmationOutcome === OUTCOMES.INITIAL
          ) {
            confirmationOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        const desiredConf = confirmations || this.defaultConfirmations
        if (desiredConf) {
          promi.on('confirmation', (confNumber, receipt) => {
            if (confNumber >= desiredConf) {
              if (confirmationOutcome === OUTCOMES.INITIAL) {
                confirmationOutcome = OUTCOMES.RESOLVED
                resolve(receipt)
                const anyPromi = promi
                anyPromi.off()
              }
            }
          })
        } else {
          promi.on('receipt', (receipt) => {
            confirmationOutcome = OUTCOMES.RESOLVED
            resolve(receipt)
            const anyPromi = promi
            anyPromi.off()
          })
        }
      })
    }

    if (t === ConfirmationType.Hash) {
      const transactionHash = await hashPromise
      if (this.notifier) {
        this.notifier.hash(transactionHash)
      }
      return { transactionHash }
    }

    if (t === ConfirmationType.Confirmed) {
      return confirmationPromise
    }

    const transactionHash = await hashPromise
    if (this.notifier) {
      this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    }
  }

  async callConstantContractFunction(method, options) {
    const m2 = method
    const { blockNumber, ...txOptions } = options
    return m2.call(txOptions, blockNumber)
  }

}