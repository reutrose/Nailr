import { useState } from "react";
import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageUploadModal from "../shared/ImageUploadModal";
import { formatDateToMonthYear } from "../../services/timeService";
const API_URL = import.meta.env.VITE_API_URL;

function UserProfileHeader({
	profileOf,
	viewer,
	setProfileUser,
	refreshProfile,
}) {
	const nav = useNavigate();
	const [showImageModal, setShowImageModal] = useState(false);

	if (!profileOf) return null;

	const isOwner = viewer._id == profileOf._id;

	const { avatar, firstName, lastName, createdAt, location, bio } = profileOf;

	return (
		<div className="container-fluid bg-white py-4 rounded-4 my-4">
			<div className="container d-flex flex-column flex-md-row align-items-center gap-4">
				<button
					className="bg-transparent border-0"
					onClick={() => {
						if (isOwner) {
							setShowImageModal(true);
						}
					}}
					style={isOwner ? { cursor: "pointer" } : { cursor: "default" }}
				>
					<div className="text-center text-md-start">
						<img
							src={avatar ? `${API_URL}/${avatar}` : "/noPhoto.jpg"}
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

				<div className="flex-grow-1">
					<div className="d-flex flex-row">
						<h2 className="fw-bold text-dark mb-2">
							{firstName} {lastName}
						</h2>
						{isOwner && (
							<button
								type="button"
								className="btn btn-transparent text-muted fw-bold mx-3 opacity-75"
								onClick={() => {
									nav(`/profile/${viewer._id}/edit`);
								}}
							>
								<SquarePen size={20} strokeWidth={1} absoluteStrokeWidth />
							</button>
						)}
					</div>

					<div className="d-flex flex-wrap gap-4 text-muted opacity-50">
						<div className="d-flex flex-row justify-content-center align-items-center">
							<div className="fw-semibold d-flex justify-content-center align-items-center">
								<i className="fa-solid fa-location-dot"></i>
								&nbsp;
							</div>
							<div className="text-dark">{location}</div>
						</div>
						<div className="d-flex flex-row justify-content-center align-items-center">
							<div className="fw-semibold d-flex justify-content-center align-items-center">
								<i className="fa-regular fa-calendar-plus"></i>
								&nbsp;
							</div>
							<div className="text-dark">
								Joined {formatDateToMonthYear(createdAt)}
							</div>
						</div>
					</div>

					{bio && <p className="text-muted my-3">{bio}</p>}
				</div>
			</div>
			{showImageModal && (
				<ImageUploadModal
					showModal={showImageModal}
					setShowModal={setShowImageModal}
					onSuccess={() => {
						refreshProfile(viewer._id, setProfileUser);
					}}
					uploadType={"avatar"}
					uploadEndpoint={`${API_URL}/users/${viewer._id}/avatar`}
				/>
			)}
		</div>
	);
}

export default UserProfileHeader;
