import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useRegister() {
	const [registerForm, setRegisterForm] = useState({
		'email': '',
		'password': '',
		'confirmPassword': ''
	});
	let navigate = useNavigate();

	function handleRegisterChange(event) {
		const { name, value } = event.target;
		setRegisterForm((prevregisterForm) => ({
			...prevregisterForm,
			[name]: value
		}));
	};

	function handleRegisterSubmit(event) {
		event.preventDefault();
		if (!checkMatchingPasswords(registerForm.password, registerForm.confirmPassword)) return;
		
		axios.post('/auth/user', {
			data: {
				email: registerForm.email,
				password: registerForm.password
			}
		}).then((response) => {
			console.log(response);
			if (response.status === 200) {
				setRegisterForm({
					'email': '',
					'password': '',
					'confirmPassword': ''
				});
				navigate('../login', { replace:true });
			};
		}).catch((error) => {
			console.log(error);
		});
	};

	return { registerForm, handleRegisterChange, handleRegisterSubmit };
};

export default useRegister;

function checkMatchingPasswords(password, confirmPassword) {
	return password.toLowerCase() === confirmPassword.toLowerCase();
};