import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createPost = async (formData, token) => {
	const requestOptions = {
		method: "POST",
		headers: {
			"x-auth-token": token,
		},
		body: formData,
	};

	try {
		const response = await fetch(`${API_URL}/posts/`, requestOptions);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Server error response:", response.status, errorText);
			throw new Error("Failed to create post");
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("Error creating post:", error);
		throw error;
	}
};

export const getAllRequestPosts = async () => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/posts/?postType=request`,
			requestOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getPostById = async (id) => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(`${API_URL}/posts/${id}`, requestOptions);
		let result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getPostsByUser = async (userId) => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/posts/user/${userId}`,
			requestOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getPostsByBusiness = async (businessId) => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/posts/business/${businessId}`,
			requestOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const updatePostById = async (id, data) => {
	const res = await axios.put(`${API_URL}/posts/${id}`, data);
	return res.data;
};

export const deletePostById = async (postId, token) => {
	const myHeaders = new Headers();
	myHeaders.append("x-auth-token", token);

	const requestOptions = {
		method: "DELETE",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(`${API_URL}/posts/${postId}`, requestOptions);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
