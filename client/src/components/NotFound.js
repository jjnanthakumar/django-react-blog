import { Link } from 'react-router-dom';

const NotFound = () => {
	return (
		<div className="not-found">
			<h2>404 Not Found</h2>
			<p style={{display:'inline'}}>Page cannot be found. </p>
			<Link to='/'>Back to homepage...</Link>
		</div>
	);
}
 
export default NotFound;