import axios from "axios";
import { checkRateLimit } from "./checkRateLimit";

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (email, password, firstName, lastName) => {
	let data = JSON.stringify({
		email: email,
		password: password,
		firstName: firstName,
		lastName: lastName,
	});

	let config = {
		method: "post",
		maxBodyLength: Infinity,
		url: `${API_URL}/users/`,
		headers: {
			"Content-Type": "application/json",
		},
		data: data,
	};
	try {
		return await axios
			.request(config)
			.then((response) => response.data)
			.catch((error) => {
				console.error(error);
			});
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const userLogin = async (email, password, loggedIn) => {
	try {
		const data = JSON.stringify({ email, password });
		const config = {
			method: "post",
			maxBodyLength: Infinity,
			url: `${API_URL}/users/login`,
			headers: { "Content-Type": "application/json" },
			data: data,
		};
		const response = await axios.request(config);
		const token = response.data;
		if (!token) {
			throw new Error("No token received from server.");
		}
		if (loggedIn) {
			localStorage.setItem("nailrToken", token);
			sessionStorage.setItem("nailrToken", token);
		} else {
			sessionStorage.setItem("nailrToken", token);
		}
		return token;
	} catch (error) {
		console.error("Login Error:", error.response?.data || error.message);
		throw error;
	}
};

export const userLogout = async () => {
	localStorage.removeItem("nailrToken");
	sessionStorage.removeItem("nailrToken");
};

export const getTokenFromStorage = () => {
	return (
		localStorage.getItem("nailrToken") || sessionStorage.getItem("nailrToken")
	);
};

export const getUserById = async (id) => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(`${API_URL}/users/${id}`, requestOptions);
		if (await checkRateLimit(response)) return;
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const updateUserById = async (id, formData, token) => {
	try {
		const response = await fetch(`${API_URL}/users/${id}/edit`, {
			method: "PUT",
			headers: {
				"x-auth-token": token,
			},
			body: formData,
		});
		if (await checkRateLimit(response)) return;

		const contentType = response.headers.get("content-type");

		if (!response.ok) {
			const errorText = contentType?.includes("application/json")
				? await response.json()
				: await response.text();
			throw new Error(errorText?.error || errorText || "Update failed");
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const deleteUserById = async (id) => {
	const res = await axios.delete(`${API_URL}/users/${id}`);
	return res.data;
};

export const uploadAvatar = async (token, userId, fileInput) => {
	const myHeaders = new Headers();
	myHeaders.append("x-auth-token", token);

	const formdata = new FormData();
	formdata.append("avatar", fileInput.files[0]);

	const requestOptions = {
		method: "PATCH",
		headers: myHeaders,
		body: formdata,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/users/${userId}/avatar`,
			requestOptions
		);
		if (await checkRateLimit(response)) return;
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
