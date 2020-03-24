import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink, NavbarBrand, Navbar } from 'reactstrap';

const Navigation = () => {
    return(
        <div>
        <Navbar>
            <NavbarBrand tag={Link} to="/" className="mr-auto">
            Projects keeper
            </NavbarBrand>
            <NavLink tag={Link} to="/api/projects"> View all Projects</NavLink>
            <NavLink tag={Link} to="/"> Home </NavLink>
            <NavLink tag={Link} to="/api/newproject"> Add Project </NavLink>
        </Navbar>
        </div>
    )
}
export default Navigation;