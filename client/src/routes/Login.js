import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import LoginForm from '../components/forms/LoginForm';

function Login() {
	return (
		<Container className="login--container" fluid>
			<Row className="justify-content-start">
				<Col lg={4}></Col>
				<Col lg><LoginForm /></Col>
				<Col lg={4}></Col>
			</Row>
		</Container>
	);
};

export default Login;