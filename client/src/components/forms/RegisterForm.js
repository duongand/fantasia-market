import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function RegisterForm() {
	return (
		<Container className="register--form-container">
			<h4 className="register--form-header">Register</h4>
			<Form>
				<Form.Group>
					<Form.Label>Email Address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>

				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" plaholder="Password" />
				</Form.Group>

				<Form.Group>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control type="password" plaholder="Password" />
				</Form.Group>

				<Form.Group>
					<Link to="/login">Already have an account?</Link>
				</Form.Group>

				<Button variant="primary" type="submit">Register</Button>
			</Form>

		</Container>

	);
};

export default RegisterForm;