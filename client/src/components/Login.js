import React, { useState } from 'react';
import axiosInstance from '../AxiosSetUp';
import jwt from 'jwt-decode'

const Login = () => {
	const initialFormData = Object.freeze({
		email: '',
		password: '',
	});

	const [formData, setFormData] = useState(initialFormData);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value.trim(),
		});
	};

	const [message, setMessage] = useState('')

	const handleSubmit = (e) => {
		e.preventDefault();

		axiosInstance.post(`token/`, {
			email: formData.email,
			password: formData.password,
		})
		.then((res) => {
			localStorage.setItem('access_token', res.data.access);
			localStorage.setItem('refresh_token', res.data.refresh);
			localStorage.setItem('username', jwt(localStorage.getItem('access_token')).username);
			axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
			window.location.replace('/')
		})
		.catch((error) => {
			if (error.response) {
				if (error.response.data.detail) {setMessage(error.response.data.detail)}
				else {setMessage(error.response.data)}
			} else {
				setMessage('We are having trouble processing login request. Please try back later.')
			}
		});
	};

	return (
		<div>
		<h2 className='centerText'>Login</h2>
		{message && <p className='error-message'>{message}</p>}
			<form className="create" onSubmit={handleSubmit}>
				<label>Email:</label>
				<input
					type="text"
					required
					id="email"
					name="email"
					autoComplete="email"
					autoFocus
					value={formData.email}
					onChange={handleChange}
				/>
				<label>Password:</label>
				<input
					type="password"
					required
					id="password"
					name="password"
					autoComplete="password"
					autoFocus
					value={formData.password}
					onChange={handleChange}
				/>
				<button>Sign In</button>
			</form>
		</div>
	);
}

export default Login;