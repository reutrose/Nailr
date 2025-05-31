const API_URL = import.meta.env.VITE_API_URL;

export const createReview = async (token, review, businessId) => {
	const myHeaders = new Headers();
	myHeaders.append("x-auth-token", token);

	const raw = JSON.stringify(review);

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
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
