import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getTokenFromStorage, getUserById } from "../services/usersService";
import { findAllBusinessesByUser } from "../services/businessService";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const authenticateUser = async () => {
		if (window.location.pathname === "/too-many-requests") {
			setLoading(false);
			return;
		}

		let storagedToken = getTokenFromStorage();
		if (storagedToken) {
			try {
				const decodedToken = jwtDecode(storagedToken);
				const fullUser = await getUserById(decodedToken._id, storagedToken);
				if (!fullUser) return;

				const businesses = await findAllBusinessesByUser(fullUser._id);
				setUser({
					...fullUser,
					avatar: `${API_URL}${fullUser.avatar}`,
					token: storagedToken,
					businesses: businesses,
				});
			} catch (err) {
				console.error("Auth failed:", err);
				setUser(null);
			}
		} else {
			setUser(null);
		}
		setLoading(false);
	};

	useEffect(() => {
		authenticateUser();
	}, []);

	useEffect(() => {
		let timeout;

		const resetTimer = () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				localStorage.removeItem("nailrToken");
				sessionStorage.removeItem("nailrToken");
				toast.info("You've been logged out due to 4 hours of inactivity.");
				navigate("/login");
			}, 4 * 60 * 60 * 1000);
		};

		window.addEventListener("mousemove", resetTimer);
		window.addEventListener("keydown", resetTimer);
		resetTimer();

		return () => {
			window.removeEventListener("mousemove", resetTimer);
			window.removeEventListener("keydown", resetTimer);
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, setUser, authenticateUser }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AuthContext;
