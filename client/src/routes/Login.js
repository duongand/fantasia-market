import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import LoginForm from '../components/forms/LoginForm';

function Login({ loginForm, handleChange, handleSubmit }) {
	let navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token') !== null) navigate('../dashboard', { replace: true });
	}, [navigate]);

	return (
		<Container className="login--container" fluid>
			<Row className="justify-content-start">
				<Col lg={4}></Col>
				<Col lg>
					<LoginForm 
						loginForm={loginForm}
						handleChange={handleChange}
						handleSubmit={handleSubmit}
					/>
				</Col>
				<Col lg={4}></Col>
			</Row>
		</Container>
	);
};

export default Login;