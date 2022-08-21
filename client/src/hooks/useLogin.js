import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function useLogin() {
	const [accessToken, setAccessToken] = useState('');
	const [loginForm, setLoginForm] = useState({
		'email': '',
		'password': ''
	});
	let navigate = useNavigate();

	useEffect(() => {
		const accessToken = getToken();
		if (accessToken) setAccessToken(accessToken);
	}, []);

	function handleLoginChange(event) {
		const { name, value } = event.target;
		setLoginForm((prevLoginForm) => ({
			...prevLoginForm,
			[name]: value
		}));
	};

	function handleLoginSubmit(event) {
		event.preventDefault();
		axios.post('/auth/login', {
			data: {
				email: loginForm.email,
				password: loginForm.password
			}
		}).then((response) => {
			setToken(response.data.token);
			setAccessToken(response.data.token);
			setLoginForm({
				'email': '',
				'password': ''
			});
			navigate('../dashboard', { replace: true });
		}).catch((error) => {
			console.log(error);
		});
	};

	function logout() {
		removeToken();
		setAccessToken('');
	};

	return { accessToken, loginForm, handleLoginChange, handleLoginSubmit, logout };
};

export default useLogin;

function getToken() {
	return localStorage.getItem('token');
};

function setToken(token) {
	localStorage.setItem('token', token);
};

function removeToken() {
	localStorage.clear();
};