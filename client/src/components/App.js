import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import getWeb3 from '../getWeb3';
import SimpleStorage from '../contracts/SimpleStorage.json';
import { connect } from 'react-redux';
import { setWeb3State, setContractState, setAccountsState } from '../store/action';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/blk-design-system-react.css';
import 'assets/css/nucleo-icons.css';
import 'assets/css/demo.css';
import { getLocale } from '../locales';
import NoMatch from './NoMatch';
// import Home from './Home/Home';
import Landing from './Landing';
import Dashboard from './Dashboard/Dashboard';
import Scroll from './Scroll';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { Tokenomics } from './Tokenomics';
import { About } from './About';
import { Whitepaper } from './Whitepaper';
import { Legal } from './Legal';
// import Counter from './components/About';

class App extends Component {
  componentDidMount() {
    this.loadWeb3();
  }

  // Instantiates Web3 library and smart contracts
  loadWeb3 = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorage.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorage.abi,
        deployedNetwork && deployedNetwork.address
      );
      // Set web3, accounts, and contract to the state.
      this.props.setWeb3({ web3 });
      this.props.setAccount({ accounts });
      this.props.setContractInstance({ instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  render() {
    const locale = getLocale();

    return (
      <IntlProvider locale={locale.locale} messages={locale.messages}>
        <Router basename="/">
          <div className="App">
            <link
              href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200"
              rel="stylesheet"
            />
            <link
              rel="stylesheet"
              href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css"
            />

            <NavBar />
            <Scroll />

            <div className="main">
              <Switch>
                {/* <Route exact path="/" component={Home} /> */}
                <Route exact path="/" component={Landing} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route path="/about" component={About} />
                <Route path="/whitepaper" component={Whitepaper} />
                <Route path="/tokenomics" component={Tokenomics} />
                <Route path="/legal" component={Legal} />
                <Route component={NoMatch} />
              </Switch>
            </div>

            <Footer />
          </div>
        </Router>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  setWeb3: PropTypes.func.isRequired,
  setAccount: PropTypes.func.isRequired,
  setContractInstance: PropTypes.func.isRequired,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
