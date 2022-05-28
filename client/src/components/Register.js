import React, { useState } from 'react';
import axiosInstance from '../AxiosSetUp';
import { useHistory } from 'react-router-dom';

const Register = () => {
	const history = useHistory();
	const initialFormData = Object.freeze({
		email: '',
		username: '',
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

		axiosInstance.post(`user/create/`, {
			email: formData.email,
			username: formData.username,
			password: formData.password,
		})
		.then((res) => {
			localStorage.setItem('access_token', res.data.access);
			localStorage.setItem('refresh_token', res.data.refresh);
			axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token');
			history.push('/login');
		})
		.catch((error) => {
			if (error.response) {
				if (error.response.data.email) {setMessage(error.response.data.email)}
				else if (error.response.data.username) {setMessage(error.response.data.username)}
				else if (error.response.data.password) {setMessage(error.response.data.password[0])}
				else {setMessage(error.response.data)}
			} else {
				setMessage('We are having trouble registering a new account. Please try back later.')
			}
		});
	};

	return (
		<div>
		<h2 className='centerText'>Register</h2>
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
				<label>Username:</label>
				<input
					type="text"
					required
					id="username"
					name="username"
					autoComplete="username"
					autoFocus
					value={formData.username}
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
				<button>Register</button>
			</form>
		</div>
	);
}

export default Register;