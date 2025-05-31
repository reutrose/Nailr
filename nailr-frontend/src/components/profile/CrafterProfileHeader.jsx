import { SquarePen, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploadModal from "./ImageUploadModal";
const API_URL = import.meta.env.VITE_API_URL;

function CrafterProfileHeader({
	crafter,
	viewer,
	refreshBusiness,
	setCrafter,
}) {
	const nav = useNavigate();
	const [showImageModal, setShowImageModal] = useState(false);

	if (!crafter) return null;

	const { owner, businessName, profession, description, location, logo } =
		crafter;

	const isOwner = owner == viewer._id;

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
						onClick={() => {
							nav(`/profile/${viewer._id}/edit`);
						}}
					>
						<SquarePen size={15} strokeWidth={1} absoluteStrokeWidth />
						&nbsp;Edit
					</button>
				</div>
			)}
			<div className="container d-flex flex-column flex-md-row align-items-center gap-4">
				{isOwner ? (
					<button
						className="bg-transparent border-0"
						onClick={() => {
							setShowImageModal(true);
						}}
					>
						<div className="text-center text-md-start">
							<img
								src={`${API_URL}/${logo}`}
								alt="User Avatar"
								className="rounded-circle shadow-sm"
								style={{
									width: "120px",
									height: "120px",
									objectFit: "cover",
									border: "2px solid #e5e5e5",
								}}
							/>
						</div>
					</button>
				) : (
					<div className="text-center text-md-start">
						<img
							src={`${API_URL}/${logo}`}
							alt="User Avatar"
							className="rounded-circle shadow-sm"
							style={{
								width: "120px",
								height: "120px",
								objectFit: "cover",
								border: "2px solid #e5e5e5",
							}}
						/>
					</div>
				)}

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

					<div className="flex-grow-1">
						<button
							className="btn btn-accent-red text-white"
							onClick={handleContact}
						>
							<Send size={15} strokeWidth={1} absoluteStrokeWidth />
							&nbsp;Contact
						</button>
					</div>
				</div>
			</div>
			{showImageModal && (
				<ImageUploadModal
					showModal={showImageModal}
					setShowModal={setShowImageModal}
					onSuccess={() => {
						refreshBusiness(crafter._id, setCrafter);
					}}
					uploadType={"logo"}
					uploadEndpoint={`${API_URL}/businesses/${crafter._id}/logo`}
				/>
			)}
		</div>
	);
}

export default CrafterProfileHeader;
