import { useState, useCallback } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const useCheckEmailAvailability = () => {
	const [status, setStatus] = useState({
		valid: null,
		exists: null,
		error: "",
	});

	const checkEmail = useCallback(async (email) => {
		const trimmed = email.trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

		if (!emailRegex.test(trimmed)) {
			setStatus({
				valid: false,
				exists: null,
				error: "Invalid email format",
			});
			return false;
		}

		try {
			const res = await axios.get(
				`${API_URL}/users/check-email?email=${trimmed}`
			);
			setStatus({
				valid: true,
				exists: res.data.exists,
				error: "",
			});
			return !res.data.exists;
		} catch (err) {
			setStatus({
				valid: true,
				exists: null,
				error: "Server error. Try again." + err,
			});
			return false;
		}
	}, []);

	return { status, checkEmail };
};

export default useCheckEmailAvailability;
