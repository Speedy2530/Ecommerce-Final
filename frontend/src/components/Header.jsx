import { Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import logo from '../Assets/logo.png';
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../slices/userApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import '../extraCss/Header.css' 

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); //unwrap beause its a promise
      dispatch(logout())
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <header>
      <Navbar style={{backgroundColor: '#333',
                      height: '75px',
                      }} 
                      expand='lg' collapseOnSelect className='mb-0'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand className='d-flex align-items-center'>
              <img src={logo} alt='' className='main-logo'/>
              <h2 className='ml-6 mb-0' style={{color: '#ecf0f1'}}>Shop</h2>
              {/* <>For your shopping needs</> */}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <SearchBox /> 

              <LinkContainer to='/cart'>
                <Nav.Link className='custom-link'>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                      {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              { userInfo ? (
                <NavDropdown title={userInfo.name} id='username' className='custom-link'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>
                      Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (

                <LinkContainer to='/login'>
                <Nav.Link className='custom-link'>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>

              ) }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
