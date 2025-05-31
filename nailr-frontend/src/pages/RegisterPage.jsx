import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";
import Page404 from "./Page404";

function RegisterPage() {
	const { user } = useContext(AuthContext);
	return user ? (
		<Page404 />
	) : (
		<div className="container d-flex justify-content-center align-items-center">
			<div className="col-12 col-sm-9 col-md-6 col-lg-4">
				<div className="text-center p-3">
					<h2>Welcome to Nailr!</h2>
				</div>
				<div className="bg-white p-3 border rounded-3 shadow-sm">
					<RegisterForm />
				</div>
				<div className="text-center p-3">
					<p className="fw-bold">
						Already on Nailr? <Link to="/login">Sign in!</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default RegisterPage;
