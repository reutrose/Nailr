const API_URL = import.meta.env.VITE_API_URL;
import { io } from "socket.io-client";

const socket = io(API_URL, {
	transports: ["websocket"],
	withCredentials: true,
});

export default socket;
