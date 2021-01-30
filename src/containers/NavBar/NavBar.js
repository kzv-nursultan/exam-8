import React, {useState} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';


const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Quotes</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/add-quote">Add new quote</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Exam-8</NavbarText>
        </Collapse>
      </Navbar>
    </div>
    );
};

export default NavBar;