import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { sleep } from '../utils';
import { About } from './About';
import { Dashboard } from './Dashboard';
import { Landing } from './Landing';
import { Legal } from './Legal';
import { News } from './News';
import { NoMatch } from './NoMatch';
import {
  DisclaimerModal,
  Footer,
  NavBar,
  Scroll
} from '../components';


export const App = () => {
  const cookies = new Cookies();
  const [isOpen, setOpen] = useState(false);

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
  }, []);

  return (
    <Router basename="/">
      <div className="App">
        <NavBar />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/about" component={About} />
            <Route path="/news" component={News} />
            <Route path="/legal" component={Legal} />
            <Route component={NoMatch} />
          </Switch>
        </div>
        <Footer />

        {/* Util components */}
        <ToastContainer position="bottom-right" />
        <Scroll /> 
        <DisclaimerModal
          isOpen={isOpen}
          setOpen={setOpen}
          setCookie={setCookie}
        />
      </div>
    </Router>
  )
}
