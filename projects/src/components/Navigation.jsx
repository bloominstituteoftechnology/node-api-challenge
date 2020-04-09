import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink, NavbarBrand, Navbar } from 'reactstrap';
import { Icon } from 'semantic-ui-react';

const Navigation = () => (
  <div className="navigation">
    <Navbar>
      <NavbarBrand tag={Link} to="/" className="mr-auto">
        Projects keeper
      </NavbarBrand>
      <NavLink tag={Link} to="/api/projects">Projects</NavLink>
      <NavLink tag={Link} to="/api/actions">Actions</NavLink>
      <NavLink tag={Link} to="/">
        <Icon name="home" size="big" alternate outline />
      </NavLink>
      <NavLink tag={Link} to="/api/newproject">
        <Icon name="add" size="big" alternate outline />
      </NavLink>
    </Navbar>
  </div>
);
export default Navigation;
