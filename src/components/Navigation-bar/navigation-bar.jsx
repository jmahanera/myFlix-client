import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg" className="justify-content-center"> {/* Centering Navbar */}
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            {user && <Nav.Link as={Link} to="/">Home</Nav.Link>} {/* Home link conditionally rendered */}
            
            {/* Add login and signup links */}
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}

            {/* ... Other navigation links ... */}
            
            {user && (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavigationBar.propTypes = {
  user: PropTypes.any,
  onLoggedOut: PropTypes.func.isRequired,
};
