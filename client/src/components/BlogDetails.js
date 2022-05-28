import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import axiosInstance from "../AxiosSetUp";

const BlogDetails = () => {
	const { slug } = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [blog, setBlog] = useState('')
	const [error, setError] = useState('')
	const history = useHistory();

	useEffect(() => {
		axiosInstance.get(`blog/${slug}/`)
		.then((res) => {
			setBlog(res.data)
			setIsLoading(false)
		})
		.catch((error) => {
			if (error.response) {setError(error.response.data)}
			else {setError(error.message)}
			setIsLoading(false)
		});
	}, [])

	const handleClick = () => {
		setIsPending(true);
		axiosInstance.delete(`blog/${slug}/`)
		.then(() => {
			setIsPending(false);
			history.push('/');
		});
	}

	let username = false
	localStorage.getItem('username') ? username = localStorage.getItem('username') : username = false

	return isLoading ? (<div>Loading...</div>) : (
		<div className="blog-details">
			{error && <div>{error}</div>}
			{blog && (
				<article>
					<h2>{ blog.title }</h2>
					<p>Written by, { blog.username }</p>
					<div>{ blog.body }</div>
					{blog.username === username && <Link className="padding-right" to={`/blog/${slug}/update`}><button>Update</button></Link>}
					{blog.username === username && !isPending && <button onClick={handleClick}>Delete</button>}
					{blog.username === username &&  isPending && <button disabled>Deleting Blog...</button>}
				</article>
			)}
		</div>
	);
}

export default BlogDetails;