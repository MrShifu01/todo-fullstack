import { Container, Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux';
import "../assets/styles/index.css"

function Header() {
  const page = useSelector((state) => state.page.page)
  
  return (
    <Navbar>
      <Container>
        <LinkContainer to='/home'><Navbar.Brand className={`nav-link-${page === "login" ? 'inactive' : ''}`}>todo.</Navbar.Brand></LinkContainer>
        <Nav className="justify-content-end">
          <Nav.Item>
            <LinkContainer to='/profile'><Nav.Link className={`nav-link-${page === "login" ? 'inactive' : ''}`}>profile.</Nav.Link></LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='/'><Nav.Link className={`nav-link-${page === "login" ? 'inactive' : ''}`}>logout.</Nav.Link></LinkContainer>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;