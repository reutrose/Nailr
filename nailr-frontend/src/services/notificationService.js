import axios from "axios";
import { getTokenFromStorage } from "./usersService";

const API_URL = import.meta.env.VITE_API_URL;

export const createNotification = async (data) => {
	const res = await axios.post(`${API_URL}/notifications/`, data, {
		headers: {
			"x-auth-token": getTokenFromStorage(),
		},
	});
	return res.data;
};

export const getAllNotifications = async () => {
	try {
		const token = getTokenFromStorage();
		const response = await fetch(`${API_URL}/notifications/`, {
			method: "GET",
			headers: {
				"x-auth-token": token,
			},
		});
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
		if (!response.ok) throw new Error("Failed to mark all as read");
		return await response.json();
	} catch (error) {
		console.error("markAllAsRead error:", error);
	}
};

export const deleteNotificationById = async (id) => {
	const res = await axios.delete(`${API_URL}/notifications/${id}`, {
		headers: {
			"x-auth-token": getTokenFromStorage(),
		},
	});
	return res.data;
};
