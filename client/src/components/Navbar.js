import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import axiosInstance from '../AxiosSetUp';

const Navbar = () => {
	const history = useHistory();
	let temp = ''
	const [username, setUsername] = useState(temp)

	useEffect(() => {
		localStorage.getItem('username') ? temp = localStorage.getItem('username') : temp = ''
		setUsername(temp)
	}, [])

	const handleLogout = () => {
		axiosInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token')
		}).then(() => {
			localStorage.removeItem('access_token')
			localStorage.removeItem('refresh_token')
			localStorage.removeItem('username')
			setUsername('')
			history.push('/')
		})
	}

	return (
		<div className="navbar">
			<h1><Link to="/">Future Diary</Link></h1>
			<div className="links">
				<Link to="/create" style={{
					color: '#f1356d',
					fontWeight: '600',
				}}>New Blog</Link>
				{username && <p><i>Welcome, {username}</i></p>}
				{username && <button onClick={handleLogout}>Logout</button>}
				{!username && <Link to='/login'>Login</Link>}
				{!username && <Link to='/register'>Register</Link>}
			</div>
		</div>
	);
}

export default Navbar;