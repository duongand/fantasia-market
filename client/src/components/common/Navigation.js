import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Navigation() {
	return (
		<Navbar bg="dark" variant="dark" className="nav-bar">
			<Navbar.Brand as={Link} className="nav-bar--title" to="/">Fantasia Market</Navbar.Brand>
			<Nav.Link as={Link} className="nav-bar--link" to="/login">Login</Nav.Link>
			<Nav.Link as={Link} className="nav-bar--link" to="/dashboard">Dashboard</Nav.Link>
			<Nav.Link as={Link} className="nav-bar--link" to="/trade">Trade</Nav.Link>
		</Navbar>
	);
};

export default Navigation;