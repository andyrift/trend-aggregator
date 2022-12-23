import { useHistory } from 'react-router-dom';

import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

const Navbar = ({ setAuthenticated, authenticated, userData, isPendingUser, errorUser }) => {

  const history = useHistory();

  const handleLogOut = (e) => {
    fetch('http://localhost:8000/api/v1/logout', { 
      method: 'GET',
      credentials: 'include'
    })
    .then(res => {
      setAuthenticated(false);
      history.push('/')
    }).catch(err => {
      console.log(err);
    });
  }
    return (
      <BootstrapNavbar bg="light" variant='light' expand="lg" className="fixed-top">
        <Container>
          <BootstrapNavbar.Brand>Lamet</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BootstrapNavbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Item>
                <LinkContainer to="/" exact={true}>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
              </Nav.Item>
              {authenticated && <LinkContainer to="/profile" exact={true}>
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>}
              {authenticated && <Nav.Link onClick={handleLogOut}>Log out</Nav.Link>}
              {!authenticated && <LinkContainer to="/login" exact={true}>
                <Nav.Link>Log in</Nav.Link>
              </LinkContainer>}
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container> 
      </BootstrapNavbar>
    );
  }
   
  export default Navbar;