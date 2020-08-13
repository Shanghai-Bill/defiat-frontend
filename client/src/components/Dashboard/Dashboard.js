import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import getWeb3 from 'getWeb3';
import DEFIAT from 'contracts/DEFIAT.json';
import constants from '../../constants';
import { connect } from 'react-redux';
import { 
  setWeb3State, 
  setContractState, 
  setAccountsState, 
  setNetworkState
 } from 'store/action';
import { NoWallet } from './NoWallet';

const Dashboard = ({
  web3,
  setWeb3,
  accounts,
  setAccount,
  contract,
  setContractInstance,
  network,
  setNetwork
}) => {
  useEffect(() => {
    async function loadWeb3() {
      try {
        // Get network provider and web3 instance.
        const w3 = await getWeb3();
  
        // Use web3 to get the user's accounts.
        const accts = await w3.eth.getAccounts();
  
        // Get the contract instance.
        const networkId = await w3.eth.net.getId();
        console.log(networkId, constants.networks)
        const ntk = constants.networks[networkId];
        // const smartContract = new w3.eth.Contract(
        //   DEFIAT.abi,
        //   ntk && ntk.address
        // );
        // Set web3, accounts, and contract to the state.
        setWeb3({ web3: w3 });
        setAccount({ accounts: accts });
        // setContractInstance({ contract: smartContract });
        setNetwork({ network: ntk });
      } catch (error) {
        // Catch any errors for any of the above operations.
        // alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    }
    loadWeb3();
  })

  return (
    <>
      <div className="wrapper">
        <div className="page-header">
          <img
            alt="..."
            className="path"
            src={require("assets/img/path4.png")}
          />

          <div className="content">
            {accounts && accounts.length ? (
              <>

              </>
            ) : (
              <div className="content-center">
                <NoWallet />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

Dashboard.propTypes = {
  setWeb3: PropTypes.func.isRequired,
  setAccount: PropTypes.func.isRequired,
  setContractInstance: PropTypes.func.isRequired,
  setNetwork: PropTypes.func.isRequired,
};

//May not need state
const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // connectMetamaskWallet: (payload) => {
    //   dispatch(connectWallet(payload));
    // },
    setWeb3: (payload) => {
      dispatch(setWeb3State(payload));
    },
    setAccount: (payload) => {
      dispatch(setAccountsState(payload));
    },
    setContractInstance: (payload) => {
      dispatch(setContractState(payload));
    },
    setNetwork: (payload) => {
      dispatch(setNetworkState(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);