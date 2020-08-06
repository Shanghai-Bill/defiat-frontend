import React, { useState, useEffect } from 'react'
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  Nav,
  NavLink,
  Container,
  Row,
  Col
} from "reactstrap";
import { Link } from 'react-router-dom';
import logo from 'assets/img/defiat.png';
import { FaTwitter, FaDiscord, FaTelegramPlane } from 'react-icons/fa';

// Probably need to pass state into here that indicates whether or not the wallet is connected and display the button accordingly
export const NavBar = ({ 
  hasWeb3Connection,
  setWeb3Connection
}) => {
  const [color, setColor] = useState("navbar-transparent");
  const [isCollapsed, setCollapsed] = useState(true);
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
          <button
              aria-expanded={!isCollapsed}
              className="navbar-toggler navbar-toggler"
              onClick={() => setCollapsed(!isCollapsed)}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
        </div>
        <Collapse
          className={"justify-content-end "}
          isOpen={!isCollapsed}
          navbar
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <Link to="/">
                  DeFiat
                </Link>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={!isCollapsed}
                  className="navbar-toggler"
                  onClick={() => setCollapsed(!isCollapsed)}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>
          <Nav navbar>
            
            <NavItem className="p-0">
              {hasWeb3Connection && (
                <Link to="/dashboard">
                  <Button
                    color="success"
                  >
                    <i className="tim-icons icon-check-2" />
                    Wallet Connected
                  </Button>
                </Link>
              ) || (
                <Button
                  color="primary"
                  onClick={() => setWeb3Connection()} 
                >
                  <i className="tim-icons icon-wallet-43" />
                  Connect Your Wallet
                </Button>
              )}
            </NavItem>
            <NavItem className="p-0 d-lg-none d-xl-none">
              <NavLink
                data-placement="bottom"
                href="https://twitter.com/"
                rel="noopener noreferrer"
                target="_blank"
                title="Follow us on Twitter"
              >
                <FaTwitter />
                <p className="">Twitter</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0 d-lg-none d-xl-none">
              <NavLink
                data-placement="bottom"
                href="https://www.telegram.com"
                rel="noopener noreferrer"
                target="_blank"
                title="Join us on Telegram"
              >
                <FaTelegramPlane />
                <p>Telegram</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0 d-lg-none d-xl-none">
              <NavLink
                data-placement="bottom"
                href="https://www.instagram.com/CreativeTimOfficial"
                rel="noopener noreferrer"
                target="_blank"
                title="Join us on Discord"
              >
                <FaDiscord />
                <p>Discord</p>
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}