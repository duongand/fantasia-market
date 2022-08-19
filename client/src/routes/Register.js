import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import RegisterForm from '../components/forms/RegisterForm';

function Register({ registerForm, handleChange, handleSubmit }) {
	return (
		<Container className="register--container" fluid>
			<Row className="justify-content-start">
				<Col lg={4}></Col>
				<Col lg>
					<RegisterForm 
						registerForm={registerForm}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
				</Col>
				<Col lg={4}></Col>
			</Row>
		</Container>
	);
};

export default Register;