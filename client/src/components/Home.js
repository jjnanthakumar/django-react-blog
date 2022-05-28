import { useEffect, useState } from 'react';
import axiosInstance from '../AxiosSetUp';
import BlogList from './BlogList';

const Home = () => {
	const [isLoading, setIsLoading] = useState(true)
	const [blogs, setBlogs] = useState('')
	const [error, setError] = useState('')

	useEffect(() => {
		axiosInstance.get(`blog/`)
		.then((res) => {
			setBlogs(res.data)
			setIsLoading(false)
		})
		.catch((error) => {
			if (error.response) {setError(error.response.data)}
			else {setError(error.message)}
			setIsLoading(false)
		});
	}, [])

	return (
		<div className="home">
			{isLoading && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{blogs && <BlogList blogs={blogs} title='Read Through!' />}
		</div>
	);
}
 
export default Home;