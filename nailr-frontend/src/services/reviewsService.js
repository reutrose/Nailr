const API_URL = import.meta.env.VITE_API_URL;

export const createReview = async (token, comment, rating, businessId) => {
	const headers = new Headers();
	headers.append("x-auth-token", token);
	headers.append("Content-Type", "application/json");

	const body = JSON.stringify({
		comment: comment,
		rating: rating.toString(),
	});

	const requestOptions = {
		method: "POST",
		headers,
		body,
	};

	try {
		const response = await fetch(
			`${API_URL}/reviews/business/${businessId}`,
			requestOptions
		);

		if (!response.ok) {
			const errorText = await response.text();
			throw new Error(`Review failed: ${errorText}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		console.error("createReview error:", error);
		throw error;
	}
};

export const getAllReviews = async () => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(`${API_URL}/reviews/`, requestOptions);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getReviewsByBusinessId = async (businessId) => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/reviews/business/${businessId}`,
			requestOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
