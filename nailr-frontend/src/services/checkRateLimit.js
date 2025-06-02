let rateLimitTriggered = false;

export const checkRateLimit = async (res) => {
	if (res.status === 429) {
		if (
			rateLimitTriggered ||
			window.location.pathname === "#/too-many-requests"
		)
			return true;
		rateLimitTriggered = true;

		let message = "Too many requests";
		try {
			const contentType = res.headers.get("content-type");
			if (contentType?.includes("application/json")) {
				const data = await res.json();
				message = data.message || message;
			} else {
				message = await res.text();
			}
		} catch (err) {
			console.warn("Failed to parse 429 response:", err);
		}

		console.warn("Rate limit triggered:", message);
		setTimeout(() => {
			window.location.replace("#/too-many-requests");
		}, 100);
		return true;
	}
	return false;
};
