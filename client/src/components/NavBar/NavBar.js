import React, { useState, useEffect } from 'react'
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  Container
} from "reactstrap";
import { Link } from 'react-router-dom';
import logo from 'assets/img/defiat.png'

// Probably need to pass state into here that indicates whether or not the wallet is connected and display the button accordingly
export const NavBar = () => {
  const [color, setColor] = useState("navbar-transparent");
  // const [showConnectButton, setConnectButton] = useState(true);

  useEffect(() => {
    const changeColor = () => {
      if (
        document.documentElement.scrollTop > 99 ||
        document.body.scrollTop > 99
      ) {
        setColor("bg-info");
      } else if (
        document.documentElement.scrollTop < 100 ||
        document.body.scrollTop < 100
      ) {
        setColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", changeColor);
    return () => window.removeEventListener("scroll", changeColor);
  });

  const connectWallet = () => {
    console.log("wallet");
  }
  
  return (
    <Navbar
      className={`fixed-top ${color}`}
      color-on-scroll="100"
      expand="lg"
    >
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            to="/"
            id="navbar-brand"
            tag={Link}
          >
            <div className="d-inline-flex align-items-center">
              <img className="mr-2" width="30" height="30" src={logo} alt="logo" />
              <span>DFT• </span>
              DeFiat
            </div>
          </NavbarBrand>
        </div>
        <Collapse
          className={"justify-content-end "}
          navbar
        >
          <Nav navbar>
            <NavItem className="p-0">
              <Button
                // className={showConnectButton ? "" : "hidden"}
                color="success"
                onClick={() => connectWallet()} 
              >
                Connect Your Wallet
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}