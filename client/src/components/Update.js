import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from  'react-router-dom';
import axiosInstance from "../AxiosSetUp";

const Update = () => {
	const { slug } = useParams();
	const [isLoading, setIsLoading] = useState(true)
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [user, setUser] = useState('')
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState('')
	const history = useHistory();

	useEffect(() => {
		axiosInstance.get(`blog/${slug}/`)
		.then((res) => {
			setTitle(res.data.title)
			setBody(res.data.body)
			setUser(res.data.username)
			setIsLoading(false)
		})
		.catch((error) => {
			if (error.response) {setError(error.response.data)}
			else {setError(error.message)}
			setIsLoading(false)
		});
	}, [])

	const handleSubmit = (e) => {	
		e.preventDefault();
		setIsPending(true);
		axiosInstance.put(`blog/${slug}/`, {
			title: title,
			body: body,
		})
		.then((res) => {
			setIsPending(false);
			history.push('/');
		});
	}

	const display = () => {
		if (user !== localStorage.getItem('username')) {
			return (
				<div className="not-found">
					<h2>403 Forbidden</h2>
					<p>Updating and deleting blogs is restricted to authors only.</p>
					<Link to='./'>Back to blog <b>'{title}'</b></Link>
				</div>
			)
		} else {
			return (
				<div className="create" onSubmit={handleSubmit}>
					<h2 className='centerText'>Update Blog</h2>
					<form>

						<label>Title:</label>
						<input
							type="text"
							required
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>

						<label>Body:</label>
						<textarea
							required
							rows='10'
							value={body}
							onChange={(e) => setBody(e.target.value)}
						></textarea>

						{ !isPending && <button>Update Blog</button> }
						{ isPending && <button disabled>Updating Blog...</button> }
					</form>
				</div>
			)
		}
	}

	return isLoading ? (<div>Loading...</div>) : display()
}
 
export default Update;