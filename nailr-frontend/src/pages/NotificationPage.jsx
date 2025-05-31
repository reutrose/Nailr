import { useEffect, useState } from "react";
import {
	getAllNotifications,
	markAllAsRead,
} from "../services/notificationService";
import { MessageCircle, Star, RotateCcw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
const API_URL = import.meta.env.VITE_API_URL;

function NotificationsPage() {
	const [notifications, setNotifications] = useState([]);

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const data = await getAllNotifications();
				setNotifications(data);
			} catch (err) {
				console.error("Failed to fetch notifications", err);
			}
		};
		fetchNotifications();
	}, []);

	const handleMarkAllAsRead = async () => {
		try {
			await markAllAsRead();
			setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
		} catch (err) {
			console.error("Failed to mark notifications as read", err);
		}
	};

	const groupNotifications = () => {
		const today = [],
			yesterday = [],
			earlier = [];
		const now = new Date();

		notifications.forEach((n) => {
			const created = new Date(n.createdAt);
			const diff = Math.floor((now - created) / (1000 * 60 * 60 * 24));

			if (diff < 1) today.push(n);
			else if (diff === 1) yesterday.push(n);
			else earlier.push(n);
		});

		return { today, yesterday, earlier };
	};

	const { today, yesterday, earlier } = groupNotifications();

	const renderNotification = (n) => {
		const isReview = n.type === "review";
		const icon = isReview ? (
			<Star className="text-warning me-2" />
		) : (
			<MessageCircle className="text-primary me-2" />
		);

		const user = isReview ? n.data?.user : n.data?.sender;
		const avatar = user?.avatar ? `${API_URL}${user.avatar}` : "/noPhoto.jpg";
		const fullName =
			user?.firstName && user?.lastName
				? `${user.firstName} ${user.lastName}`
				: "Someone";

		const message = isReview
			? `New 5-star review from ${fullName}`
			: `New message from ${fullName}`;

		const previewText = isReview ? "" : n.data?.preview || "";
		const timeAgo = formatDistanceToNow(new Date(n.createdAt), {
			addSuffix: true,
		});

		return (
			<div
				key={n._id}
				className={`d-flex align-items-start p-3 rounded-3 mb-2 ${
					!n.isRead
						? "bg-light border-start border-4 border-primary"
						: "bg-white"
				}`}
			>
				<img
					src={avatar}
					alt="Avatar"
					className="rounded-circle me-3"
					width={40}
					height={40}
				/>
				<div>
					<div className="fw-semibold d-flex align-items-center">
						{icon}
						{message}
					</div>
					{previewText && <div className="text-muted small">{previewText}</div>}
					<div className="text-muted small">{timeAgo}</div>
				</div>
			</div>
		);
	};

	return (
		<div
			className="container py-4"
			style={{ background: "#fdf6f0", minHeight: "100vh" }}
		>
			<div className="d-flex justify-content-between align-items-center mb-4">
				<h4 className="fw-bold">Notifications</h4>
				<button
					onClick={handleMarkAllAsRead}
					className="btn btn-outline-primary btn-sm"
				>
					<RotateCcw size={16} className="me-1" /> Mark all as read
				</button>
			</div>

			{today.length > 0 && <h6 className="text-muted mb-2">Today</h6>}
			{today.map(renderNotification)}

			{yesterday.length > 0 && (
				<h6 className="text-muted mt-4 mb-2">Yesterday</h6>
			)}
			{yesterday.map(renderNotification)}

			{earlier.length > 0 && <h6 className="text-muted mt-4 mb-2">Earlier</h6>}
			{earlier.map(renderNotification)}
		</div>
	);
}

export default NotificationsPage;
