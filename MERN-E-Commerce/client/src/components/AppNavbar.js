import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/registerModal';
import LoginModal from './auth/loginModal';
import Logout from './auth/Logout';

const AppNavbar = ({ auth: { isAuthenticated, user }, cart: { cart } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleNavbar = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const authLinks = (
    <>
      <NavItem>
        <NavLink href="/" className="nav-link-hover">Home</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/cart" className="nav-link-hover">
          Cart{' '}
          {cart && cart.items.length > 0 && (
            <Badge color="success" pill>
              {cart.items.length}
            </Badge>
          )}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="/orders" className="nav-link-hover">Orders</NavLink>
      </NavItem>
      <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
        <DropdownToggle nav caret>
          {user ? `Hi, ${user.name}` : 'Account'}
        </DropdownToggle>
        <DropdownMenu end>
          <DropdownItem>
            <Logout />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );

  const guestLinks = (
    <>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem>
    </>
  );

  return (
    <Navbar color="dark" dark expand="md" className="mb-4 shadow-sm">
      <Container>
        <NavbarBrand href="/" className="fw-bold fs-4">E-Commerce Store</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto align-items-center" navbar>
            {isAuthenticated ? authLinks : guestLinks}
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
};

AppNavbar.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
  }).isRequired,
  cart: PropTypes.shape({
    cart: PropTypes.object
  })
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart
});

export default connect(mapStateToProps)(AppNavbar);
