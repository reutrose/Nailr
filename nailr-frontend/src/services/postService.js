import { checkRateLimit } from "./checkRateLimit";

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
		if (await checkRateLimit(response)) return;

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
		if (await checkRateLimit(response)) return;
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getAllShowcasePosts = async () => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/posts/?postType=showcase`,
			requestOptions
		);
		if (await checkRateLimit(response)) return;
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
		if (await checkRateLimit(response)) return;
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
		if (await checkRateLimit(response)) return;
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
		if (await checkRateLimit(response)) return;
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const updatePostById = async (token, id, data) => {
	const myHeaders = new Headers();
	myHeaders.append("x-auth-token", token);

	const formdata = new FormData();
	formdata.append("title", data.title);
	formdata.append("description", data.description);
	formdata.append(
		"tags",
		Array.isArray(data.tags) ? data.tags.join(",") : data.tags
	);
	formdata.append("location", data.location);

	if (data.files?.length) {
		for (const file of data.files) {
			formdata.append("images", file);
		}
	}

	const requestOptions = {
		method: "PUT",
		headers: myHeaders,
		body: formdata,
	};

	try {
		const response = await fetch(`${API_URL}/posts/${id}`, requestOptions);
		if (await checkRateLimit(response)) return;
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
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
		if (await checkRateLimit(response)) return;
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
