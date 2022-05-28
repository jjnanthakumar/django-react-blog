import Navbar from './components/Navbar'
import Home from './components/Home'
import Create from './components/Create';
import BlogDetails from './components/BlogDetails';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NotFound from './components/NotFound';
import Update from './components/Update';
import Login from './components/Login';
import Register from './components/Register';

function App() {
	return (
		<Router>
			<div className="App">
				<Navbar />
				<div className="content">
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/create">
							<Create />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/blog/:slug">
							<BlogDetails />
						</Route>
						<Route exact path="/blog/:slug/update">
							<Update />
						</Route>
						<Route path="*">
							<NotFound />
						</Route>
					</Switch>
				</div>
			</div>
		</Router>
  );
}

export default App;