import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

import { NavBarStyle } from "../styles/styles";

export default function Header() {
  return (
    <header>
      <NavBarStyle>
        <Navbar expand="lg">
          <Navbar.Brand>My Projects Workbook</Navbar.Brand>
          <Navbar.Toggle area-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item>
                <Link to="/">Home</Link>
              </Nav.Item>
              <Nav.Item>
                <Link to="/">Add Project</Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </NavBarStyle>
    </header>
  );
}
