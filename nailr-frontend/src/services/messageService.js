import { getTokenFromStorage } from "./usersService";
import { checkRateLimit } from "./checkRateLimit";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchMessagesByConversation = async (conversationId, token) => {
	try {
		const response = await fetch(`${API_URL}/messages/${conversationId}`, {
			headers: {
				"x-auth-token": token,
			},
		});
		if (await checkRateLimit(response)) return;
		if (!response.ok) throw new Error("Failed to fetch messages");
		return await response.json();
	} catch (err) {
		console.error("fetchMessagesByConversation error:", err);
		throw err;
	}
};

export const sendMessage = async (conversationId, text, imageFile, token) => {
	const formData = new FormData();
	formData.append("conversationId", conversationId);
	formData.append("text", text);
	if (imageFile) formData.append("image", imageFile);

	try {
		const response = await fetch(`${API_URL}/messages`, {
			method: "POST",
			headers: {
				"x-auth-token": token,
			},
			body: formData,
		});
		if (await checkRateLimit(response)) return;
		if (!response.ok) throw new Error("Failed to send message");
		return await response.json();
	} catch (err) {
		console.error("sendMessage error:", err);
		throw err;
	}
};

export const getUserConversations = async (token) => {
	try {
		const response = await fetch(`${API_URL}/conversations`, {
			method: "GET",
			headers: {
				"x-auth-token": token,
			},
		});
		if (await checkRateLimit(response)) return;
		if (!response.ok) {
			throw new Error("Failed to fetch conversations");
		}
		const data = await response.json();
		return data;
	} catch (err) {
		console.error("getUserConversations error:", err);
		throw err;
	}
};

export const createConversationIfNotExists = async (participantId) => {
	const token = getTokenFromStorage();
	const response = await fetch(`${API_URL}/conversations/initiate`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-auth-token": token,
		},
		body: JSON.stringify({ participantId }),
	});
	if (await checkRateLimit(response)) return;
	if (!response.ok) throw new Error("Failed to initiate conversation");
	return await response.json();
};
