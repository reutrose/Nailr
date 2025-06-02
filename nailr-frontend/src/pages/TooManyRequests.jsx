import { Link } from "react-router-dom";

function TooManyRequests() {
	return (
		<div className="container text-center mt-5">
			<h1 className="text-danger">Slow Down!</h1>
			<p className="lead">
				You've made too many requests in a short time. Please try again later.
			</p>
			<Link to="/" className="btn btn-primary mt-3">
				Back to Home
			</Link>
		</div>
	);
}

export default TooManyRequests;
