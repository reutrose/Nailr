import { SquarePen, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploadModal from "../shared/ImageUploadModal";
const API_URL = import.meta.env.VITE_API_URL;

function CrafterProfileHeader({ crafter, viewer, refreshBusiness }) {
	const nav = useNavigate();
	const [showImageModal, setShowImageModal] = useState(false);

	if (!crafter) return null;

	const { owner, businessName, profession, description, location, logo } =
		crafter;

	const isOwner = owner === viewer?._id;

	const handleContact = () => {
		nav("/inbox", {
			state: { userToContactId: owner },
		});
	};

	return (
		<div className="container-fluid bg-white py-4 border-bottom">
			{isOwner && (
				<div className="container d-flex justify-content-end">
					<button
						type="button"
						className="edit-profile-btn"
						onClick={() => nav(`/profile/${viewer._id}/edit`)}
						aria-label="Edit your profile"
					>
						<SquarePen size={15} strokeWidth={1} absoluteStrokeWidth />
						&nbsp;Edit
					</button>
				</div>
			)}

			<div className="container d-flex flex-column flex-md-row align-items-center gap-4">
				<div className="text-center text-md-start">
					{isOwner ? (
						<button
							type="button"
							className="bg-transparent border-0"
							onClick={() => setShowImageModal(true)}
							aria-label="Change profile photo"
						>
							<img
								src={`${API_URL}/${logo}`}
								alt="Your profile avatar"
								className="rounded-circle shadow-sm profile-avatar"
							/>
						</button>
					) : (
						<img
							src={`${API_URL}/${logo}`}
							alt={`${businessName}'s profile avatar`}
							className="rounded-circle shadow-sm profile-avatar"
						/>
					)}
				</div>

				<div className="flex-grow-1">
					<h2 className="fw-bold text-dark mb-2">{businessName}</h2>
					<div className="d-flex flex-wrap gap-4 text-secondary">
						<div>
							<span className="text-dark">{profession}</span>
						</div>
						<div>
							<small className="text-muted">
								<i
									className="fa-solid fa-location-dot"
									style={{ color: "#f96c6c" }}
								></i>
								&nbsp; {location}
							</small>
						</div>
					</div>

					{description && <p className="text-muted mb-3">{description}</p>}

					{viewer && (
						<button
							type="button"
							className="btn btn-accent-red text-white"
							onClick={handleContact}
							aria-label={`Contact ${businessName}`}
						>
							<Send size={15} strokeWidth={1} absoluteStrokeWidth />
							&nbsp;Contact
						</button>
					)}
				</div>
			</div>

			{showImageModal && (
				<ImageUploadModal
					showModal={showImageModal}
					setShowModal={setShowImageModal}
					onSuccess={() => refreshBusiness(crafter._id)}
					uploadType="logo"
					uploadEndpoint={`${API_URL}/businesses/${crafter._id}/logo`}
				/>
			)}
		</div>
	);
}

export default CrafterProfileHeader;
