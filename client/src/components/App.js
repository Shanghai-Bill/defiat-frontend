import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { getLocale } from '../locales';
import NoMatch from './NoMatch';
import { Landing } from './Landing';
import Dashboard from './Dashboard/Dashboard';
import Scroll from './Scroll';
import { NavBar } from './NavBar';
import { Footer } from './Footer';
import { News } from './News'
import { About } from './About';
import { Legal } from './Legal';
import { ToastContainer } from 'react-toastify';
import { DisclaimerModal } from './DisclaimerModal';
import Cookies from 'universal-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/defiat.css';
//import 'assets/css/blk-design-system-react.css';
import 'assets/css/nucleo-icons.css';
import 'assets/css/demo.css';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const locale = getLocale();
  const cookies = new Cookies();
  const [isOpen, setOpen] = useState(false);

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const setCookie = () => {
    cookies.set('defiat-cookie', ':)', { path: '/' });
  }

  useEffect(() => {
    async function checkCookie() {
      if (!cookies.get("defiat-cookie")) {
        await sleep(2000);
        setOpen(true);
      }
    }
    checkCookie();
  });


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
          <ToastContainer position="bottom-right" />
          <DisclaimerModal
            isOpen={isOpen}
            setCookie={setCookie}
            setOpen={setOpen}
          />

          <div className="main">
            <Switch>
              <Route exact path="/" component={Landing} />
              {/* <Route exact path="/dashboard">
                <Dashboard {...this.props} />
              </Route> */}
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/about" component={About} />
              <Route path="/news" component={News} />
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
