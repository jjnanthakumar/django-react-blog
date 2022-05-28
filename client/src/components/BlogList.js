import { Link } from "react-router-dom";

const BlogList = ({blogs, title}) => {

	return (
		<div className="blog-list">
			<div style={{display:'flex', justifyContent:'space-between'}}>
			<div><h2>{ title }</h2></div>
			<div><a href='https://github.com/namanshah01/react-blog' target='_blank' rel="noreferrer">Source code</a></div>
			</div>
			{blogs.map((blog) => (
				<div className="blog-preview" key={blog.slug}>
					<Link to={`/blog/${blog.slug}`}>
						<h2>{ blog.title }</h2>
						<p>Written by, { blog.username }</p>
					</Link>
				</div>
			))}
		</div>
	);
}
 
export default BlogList;