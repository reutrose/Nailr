import { getTokenFromStorage } from "./usersService";
import { checkRateLimit } from "./checkRateLimit";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllNotifications = async () => {
	try {
		const token = getTokenFromStorage();
		const response = await fetch(`${API_URL}/notifications/`, {
			method: "GET",
			headers: {
				"x-auth-token": token,
			},
		});
		if (await checkRateLimit(response)) return;
		if (!response.ok) throw new Error("Failed to fetch notifications");
		return await response.json();
	} catch (error) {
		console.error("getAllNotifications error:", error);
	}
};

export const markNotificationAsRead = async (noteId) => {
	try {
		const token = getTokenFromStorage();
		const response = await fetch(`${API_URL}/notifications/${noteId}/read`, {
			method: "PATCH",
			headers: {
				"x-auth-token": token,
			},
		});
		if (await checkRateLimit(response)) return;
		if (!response.ok) throw new Error("Failed to mark notification as read");
		return await response.json();
	} catch (error) {
		console.error("markNotificationAsRead error:", error);
	}
};

export const markAllAsRead = async () => {
	try {
		const token = getTokenFromStorage();
		const response = await fetch(`${API_URL}/notifications/mark-all-read`, {
			method: "PATCH",
			headers: {
				"x-auth-token": token,
			},
		});
		if (await checkRateLimit(response)) return;
		if (!response.ok) throw new Error("Failed to mark all as read");
		return await response.json();
	} catch (error) {
		console.error("markAllAsRead error:", error);
	}
};
