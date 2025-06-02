const API_URL = import.meta.env.VITE_API_URL;

export const professions = [
	"General Contractor",
	"Handyman",
	"Carpenter",
	"Electrician",
	"Plumber",
	"Roofer",
	"Mason / Bricklayer",
	"Drywall Installer",
	"Flooring Installer",
	"Tiler",
	"Window Installer",
	"Door Installer",
	"Deck Builder",
	"Fence Installer",
	"HVAC Technician",
	"Solar Panel Installer",
	"Smart Home Technician",
	"Appliance Repair Technician",
	"Security System Installer",
	"Landscaper",
	"Gardener",
	"Irrigation Specialist",
	"Tree Surgeon / Arborist",
	"Pool Technician",
	"Stone Mason",
	"House Painter",
	"Interior Designer",
	"Wallpaper Installer",
	"Mural Artist",
	"Faux Finisher",
	"Tailor",
	"Curtain & Drapery Specialist",
	"Upholsterer",
	"Welder",
	"Blacksmith",
	"House Cleaner",
	"Window Cleaner",
	"Mold Remediation Specialist",
	"Post-Construction Cleaner",
	"Fire & Flood Restoration",
	"Sign Maker",
	"Engraver",
	"Ceramic Artist / Potter",
	"Glass Artist",
	"Sculptor",
	"TV / A/V Installer",
	"Chimney Sweep",
	"Drone Roof Inspector",
	"Septic System Technician",
	"CNC Operator",
	"3D Printing Specialist",
];

export const addNewBusiness = async (token, values) => {
	try {
		const formData = new FormData();
		Object.keys(values).forEach((key) => {
			formData.append(key, values[key]);
		});

		const res = await fetch(`${API_URL}/businesses`, {
			method: "POST",
			headers: {
				"x-auth-token": token,
			},
			body: formData,
		});

		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || "Failed to add business");
		}

		return await res.json();
	} catch (error) {
		console.error("addNewBusiness error:", error);
		throw error;
	}
};

export const findAllBusinessesByUser = async (userId) => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/users/${userId}/businesses`,
			requestOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const removeBusiness = async (token, businessId) => {
	const myHeaders = new Headers();
	myHeaders.append("x-auth-token", token);

	const requestOptions = {
		method: "DELETE",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/businesses/${businessId}`,
			requestOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getBusinessById = async (businessId) => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/businesses/${businessId}`,
			requestOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const uploadBusinessLogo = async (token, businessId, fileInput) => {
	const myHeaders = new Headers();
	myHeaders.append("x-auth-token", token);

	const formdata = new FormData();
	formdata.append("image", fileInput.files[0]);

	const requestOptions = {
		method: "PATCH",
		headers: myHeaders,
		body: formdata,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/businesses/${businessId}/logo`,
			requestOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getAllBusinesses = async () => {
	const myHeaders = new Headers();

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(`${API_URL}/businesses`, requestOptions);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const addReviewToBusiness = async (token, review, businessId) => {
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
			`${API_URL}/businesses/${businessId}/reviews`,
			requestOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const updateBusinessById = async (token, businessId, values) => {
	try {
		const formData = new FormData();

		formData.append("businessName", values.businessName || "");
		formData.append("profession", values.profession || "");
		formData.append("description", values.description || "");
		formData.append("location", values.location || "");

		if (values.logo && values.logo instanceof File) {
			formData.append("logo", values.logo);
		}

		const res = await fetch(`${API_URL}/businesses/${businessId}`, {
			method: "PUT",
			headers: {
				"x-auth-token": token,
			},
			body: formData,
		});

		if (!res.ok) {
			const error = await res.json();
			throw new Error(error.message || "Failed to update business");
		}

		return await res.json();
	} catch (error) {
		console.error("updateBusinessById error:", error);
		throw error;
	}
};

export const deleteBusiness = async (token, businessId) => {
	const myHeaders = new Headers();
	myHeaders.append("x-auth-token", token);

	const requestOptions = {
		method: "DELETE",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			`${API_URL}/businesses/${businessId}`,
			requestOptions
		);
		const result = await response.json();
		return result;
	} catch (error) {
		console.error(error);
	}
};
