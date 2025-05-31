import axios from "axios";

const BASE_URL = "/api/posts";

export const likePost = async (postId) => {
	const res = await axios.post(`${BASE_URL}/${postId}/likes`);
	return res.data;
};

export const getLikesForPost = async (postId) => {
	const res = await axios.get(`${BASE_URL}/${postId}/likes`);
	return res.data;
};

export const unlikePost = async (postId) => {
	const res = await axios.delete(`${BASE_URL}/${postId}/likes`);
	return res.data;
};
