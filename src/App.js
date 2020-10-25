import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { NoMatch } from './components/NoMatch'
import { Landing } from './views/Landing'
import Dashboard from './views/Dashboard'
import { Scroll } from './components/Scroll'
import { NavBar } from './components/NavBar'
import { Footer } from './components/Footer'
import { News } from './views/News'
import { About } from './views/About'
import { Legal } from './views/Legal'
import { ToastContainer } from 'react-toastify'
import { DisclaimerModal } from './components/DisclaimerModal'
import Cookies from 'universal-cookie'
import { sleep } from 'utils'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/defiat.css';
import 'assets/css/nucleo-icons.css';
import 'assets/css/demo.css';
import 'react-toastify/dist/ReactToastify.css';
import 'assets/css/styles.css';

const App = () => {
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
  }, [])


  return (
    <Router basename="/">
      <div className="App">
        

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
            <Route path="/dashboard" component={Dashboard} />
            {/* <Route path="/about" component={About} /> */}
            <Route path="/news" component={News} />
            <Route path="/legal" component={Legal} />
            <Route component={NoMatch} />
          </Switch>
        </div>

        <Footer />
      </div>
    </Router>
  )
}

export default App