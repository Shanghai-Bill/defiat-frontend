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
import { Link, useLocation } from 'react-router-dom';
import logo from 'assets/img/defiat.png';
import { FaTwitter, FaDiscord, FaTelegramPlane } from 'react-icons/fa';

// Probably need to pass state into here that indicates whether or not the wallet is connected and display the button accordingly
export const NavBar = ({ 
  hasWeb3Connection,
  setWeb3Connection
}) => {
  const [color, setColor] = useState("navbar-transparent");
  const [isCollapsed, setCollapsed] = useState(true);
  const location = useLocation();
  console.log(location.pathname)
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

  const closeNavIfOpen = () => {
    
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
            {/* <NavItem className="p-0">
              <Link className="nav-link" to="/dashboard" onClick={() =>!isCollapsed && setCollapsed(true)}>
                Dashboard
              </Link>
            </NavItem> */}
            <NavItem className="p-0">
              <Link className="nav-link" to="/news" onClick={() =>!isCollapsed && setCollapsed(true)}>
                News
              </Link>
            </NavItem>
            <NavItem className="p-0">
              <Link className="nav-link" to="/about" onClick={() =>!isCollapsed && setCollapsed(true)}>
                About
              </Link>
            </NavItem>
            <NavItem className="p-0">
              <Button color="primary">
                Get DFT
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  )
}