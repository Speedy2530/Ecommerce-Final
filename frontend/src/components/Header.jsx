import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser} from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'
import logo from '../Assets/logo.png';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand>
                    {/* <img src={logo} alt="SShop" />// */}
                    SShop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle data-bs-theme="dark"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <LinkContainer to="/cart">
                            <Nav.Link><FaShoppingCart /> Cart</Nav.Link>
                        </LinkContainer>
                        <LinkContainer>
                            <Nav.Link to="/login"><FaUser /> Sign In</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header
