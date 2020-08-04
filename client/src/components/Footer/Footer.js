import React from 'react'
import { Link } from "react-router-dom";
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col
} from "reactstrap";
import { FaTwitter, FaFacebookSquare, FaTelegramPlane } from 'react-icons/fa'
import logo from 'assets/img/defiat.png' 

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md="3">
            <div className="d-inline-flex align-items-center justify-space-around">
              <img className="mr-2" width="50" height="50" src={logo} alt="logo" />
              <h1 className="title">DeFiat</h1>
            </div>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink to="/" tag={Link}>
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/landing" tag={Link}>
                  Landing
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/dashboard" tag={Link}>
                  Dashboard
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <Nav>
              <NavItem>
                <NavLink href="#">
                  Whitepaper
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/about">
                  About Us
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/tokenomics">
                  Tokenomics
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col md="3">
            <h3 className="title">Follow us:</h3>
            <div className="btn-wrapper profile d-flex align-items-center">
              <Button
                className="btn-icon btn-neutral btn-round btn-simple d-flex justify-content-center align-items-center"
                color="default"
                href="#"
              >
                <FaTwitter />
              </Button>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple d-flex justify-content-center align-items-center"
                color="default"
                href="#"
              >
                <FaTelegramPlane />
              </Button>
              <Button
                className="btn-icon btn-neutral btn-round btn-simple d-flex justify-content-center align-items-center"
                color="default"
                href="#"
              >
                <FaFacebookSquare />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}