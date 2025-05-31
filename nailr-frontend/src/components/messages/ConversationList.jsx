import { useContext } from "react";
import classNames from "classnames";
import AuthContext from "../../contexts/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;

function ConversationList({
	conversations,
	activeConversation,
	setActiveConversation,
}) {
	const { user } = useContext(AuthContext);

	if (!user?._id) return null;

	return (
		<div>
			{conversations.map((conv) => {
				const otherParticipant = conv.participants.find(
					(p) => p._id !== user._id
				);

				if (!otherParticipant) return null;

				const isActive = activeConversation?._id === conv._id;

				return (
					<div
						key={conv._id}
						className={classNames(
							"d-flex align-items-center p-2 mb-2 rounded-2",
							{
								"bg-light border": isActive,
								"cursor-pointer": true,
							}
						)}
						style={{ cursor: "pointer" }}
						onClick={() => setActiveConversation(conv)}
					>
						<img
							src={
								otherParticipant.avatar?.trim()
									? `${API_URL}${otherParticipant.avatar}`
									: "/noPhoto.jpg"
							}
							alt="Avatar"
							className="rounded-circle me-2"
							width="40"
							height="40"
							onError={(e) => (e.target.src = "/noPhoto.jpg")}
						/>
						<div>
							<div className="fw-semibold">
								{otherParticipant.firstName} {otherParticipant.lastName}
							</div>
							<div className="text-muted small">
								{conv.lastMessage || "Start the conversation"}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default ConversationList;
