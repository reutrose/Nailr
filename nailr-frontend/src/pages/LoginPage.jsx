import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Page404 from "./Page404";

function LoginPage() {
	const { user } = useContext(AuthContext);
	return user ? (
		<Page404 />
	) : (
		<>
			<div className="container d-flex justify-content-center align-items-center">
				<div className="col-12 col-sm-9 col-md-6 col-lg-4">
					<div className="text-center p-3">
						<h2>Good To See You Back!</h2>
					</div>
					<div className="bg-white p-3 border rounded-3 shadow-sm">
						<LoginForm />
					</div>
					<div className="text-center p-3">
						<p className="fw-bold">
							Don't have an account? <Link to="/register">Sign up!</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoginPage;
