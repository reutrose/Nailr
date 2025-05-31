import axios from "axios";

const BASE_URL = "/api/conversations";

export const createOrGetConversation = async (recipientId) => {
	const res = await axios.post(`${BASE_URL}/`, { recipientId });
	return res.data;
};

export const getUserConversations = async () => {
	const res = await axios.get(`${BASE_URL}/`);
	return res.data;
};

export const getConversationById = async (id) => {
	const res = await axios.get(`${BASE_URL}/${id}`);
	return res.data;
};
