import { useEffect, useState } from "react";
import { useHistory } from  'react-router-dom';
import axiosInstance from "../AxiosSetUp";

const Create = () => {
	const [title, setTitle] = useState('')
	const [body, setBody] = useState('')
	const [isPending, setIsPending] = useState(false);
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsPending(true);
		axiosInstance.post(`blog/`, {
			title: title,
			body: body,
		})
		.then(() => {
			setIsPending(false);
			history.push('/');
		});
	}

	useEffect(() => {
		if (!localStorage.getItem('username')) {history.push('/login')}
	}, [])

	return (
		<div className="create" onSubmit={handleSubmit}>
			<h2 className='centerText'>Create Blog</h2>
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

				{ !isPending && <button>Create Blog</button> }
				{ isPending && <button disabled>Adding Blog...</button> }
			</form>
		</div>
	);
}
 
export default Create;