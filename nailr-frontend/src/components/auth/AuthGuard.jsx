import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";

const AuthGuard = ({ children }) => {
	const { user } = useContext(AuthContext);
	const location = useLocation();

	if (!user) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
};

export default AuthGuard;
