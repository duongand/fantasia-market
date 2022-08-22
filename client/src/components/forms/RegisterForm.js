import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

function RegisterForm({ registerForm, handleChange, handleSubmit }) {
	return (
		<Container className="register--form-container">
			<h4 className="register--form-header">Register</h4>
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Email Address</Form.Label>
					<Form.Control 
						name="email"
						type="email" 
						placeholder="Enter email" 
						value={registerForm.email}
						onChange={handleChange}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Password</Form.Label>
					<Form.Control 
						name="password"
						type="password" 
						placeholder="Enter password"
						value={registerForm.password}
						onChange={handleChange}	
					/>
				</Form.Group>
				<Form.Group>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						name="confirmPassword" 
						type="password" 
						placeholder="Confirm password"
						value={registerForm.confirmPassword}
						onChange={handleChange}
					/>
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