import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { jwtDecode } from "jwt-decode";
import { getTokenFromStorage, getUserById } from "../services/usersService";
import { findAllBusinessesByUser } from "../services/businessService";
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const authenticateUser = async () => {
		let storagedToken = getTokenFromStorage();
		if (storagedToken) {
			const decodedToken = jwtDecode(storagedToken);
			const fullUser = await getUserById(decodedToken._id, storagedToken);
			const businesses = await findAllBusinessesByUser(fullUser._id);
			setUser({
				...fullUser,
				avatar: `${API_URL}${fullUser.avatar}`,
				token: storagedToken,
				businesses: businesses,
			});
		} else {
			setUser(null);
		}
	};

	useEffect(() => {
		const initializeAuth = async () => {
			await authenticateUser();
			setLoading(false);
		};
		initializeAuth();
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
