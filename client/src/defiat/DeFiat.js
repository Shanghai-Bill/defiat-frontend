import Web3 from 'web3';
import { Addresses } from './lib/addresses';
import { Partners } from './lib/partners';
import { Pools } from './lib/pools';
import { Proposals } from './lib/proposals';
import { Contracts } from './Contracts';

export class DeFiat {
  constructor(provider, networkId, account=undefined) {
    this.web3 = new Web3(provider);

    if (account) {
      this.web3.eth.defaultAccount = account;
    }

    this.tokenAddress = Addresses[networkId].token;
    this.pointsAddress = Addresses[networkId].points;
    this.govAddress = Addresses[networkId].gov;
    this.pools = Pools[networkId];
    this.proposals = Proposals[networkId];
    this.partners = Partners[networkId];
    // this.governanceAddress = Addresses[networkId].gov;
    // this.priceAddress = Addresses[networkId].price;
    // this.wethAddress = Addresses[networkId].weth;
    // this.uniFactoryAddress = Addresses[networkId].uniFactory;

    this.contracts = new Contracts(provider, networkId, this.web3);
  }

  // addAccount(address, number) {
  //   this.accounts.push(new Account(this.contracts, address, number))
  // }

  setProvider(provider, networkId) {
    this.web3.setProvider(provider);
    this.contracts.setProvider(provider, networkId);
    this.operation.setNetworkId(networkId);
  }

  setDefaultAccount(account) {
    this.web3.eth.defaultAccount = account;
    this.contracts.setDefaultAccount(account);
  }

  getDefaultAccount() {
    return this.web3.eth.defaultAccount;
  }

  loadAccount(account) {
    const newAccount = this.web3.eth.accounts.wallet.add(account.privateKey);

    if (
      !newAccount ||
      (account.address &&
        account.address.toLowerCase() !== newAccount.address.toLowerCase())
    ) {
      throw new Error(`Loaded account address mismatch.
        Expected ${account.address}, got ${
        newAccount ? newAccount.address : null
      }`);
    }
  }
}