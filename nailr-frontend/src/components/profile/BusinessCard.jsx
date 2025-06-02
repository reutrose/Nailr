import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function BusinessCard({ business, viewer }) {
	const navigate = useNavigate();
	const isOwner = viewer._id === business.owner;

	return (
		<>
			<div
				className="container-fluid m-0 p-0 bg-white rounded shadow-sm p-4"
				style={{ height: "200px" }}
			>
				<div className="container m-0 p-0 d-flex flex-column justify-content-between align-items-start h-100">
					<div
						className="row"
						style={{ cursor: "pointer" }}
						onClick={() => {
							navigate(`/crafter/${business._id}`);
						}}
					>
						<div className="col-3">
							<img
								src={`${API_URL}/${business.logo}`}
								alt=""
								width={40}
								height={40}
								style={{ borderRadius: "50%" }}
							/>
						</div>
						<div className="col-9">
							<div className="container m-0 p-0 d-flex flex-column justify-content-between align-items-start">
								<p
									className="m-0 p-0"
									style={{
										fontSize: "0.9rem",
										fontWeight: "600",
									}}
								>
									{business.businessName}
								</p>

								<p
									className="m-0 p-0"
									style={{
										fontSize: "0.7rem",
										fontWeight: "300",
										textTransform: "capitalize",
									}}
								>
									{business.profession} • {business.location}
								</p>
							</div>
						</div>
					</div>
					<div className="p-0 py-1">
						<p style={{ fontSize: "0.8rem" }}>{business.description}</p>
					</div>
					{isOwner && (
						<button
							className="btn btn-accent-red text-white fw-bold rounded-1 mx-2"
							style={{ fontSize: "0.7rem", padding: "2px 8px 2px 8px" }}
							onClick={() => {
								navigate(`/crafters/edit/${business._id}`);
							}}
						>
							<SquarePen size={14} />
							&nbsp;Edit
						</button>
					)}
				</div>
			</div>
		</>
	);
}

export default BusinessCard;
