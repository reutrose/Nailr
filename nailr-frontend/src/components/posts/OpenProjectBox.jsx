import { useState } from "react";
import { formatRelativeTime } from "../../services/timeService";
import ImageViewModal from "./ImageViewModal";
import { Link, useNavigate } from "react-router-dom";

function OpenProjectBox({ project }) {
	const [imageSelected, setImageSelected] = useState(false);
	const navigate = useNavigate();

	const handleContact = () => {
		navigate("/inbox", {
			state: { userToContactId: project.userId },
		});
	};

	return (
		<div className="border rounded-4 shadow-sm p-3 bg-white h-100 d-flex flex-column justify-content-between">
			<div>
				<div className="d-flex justify-content-between align-items-center mb-2">
					<span className="badge bg-primary text-uppercase small">
						{project.profession}
					</span>
					<small className="text-muted">
						{formatRelativeTime(project.createdAt)}
					</small>
				</div>

				<h6 className="fw-semibold mb-2">{project.title}</h6>
				<p className="small text-muted">{project.description}</p>

				{project.images?.length > 0 && (
					<div className="d-flex gap-2 pb-2">
						{project.images.map((img, index) => (
							<div key={index}>
								<Link
									className="btn btn-transparent m-0 p-0"
									onClick={() => {
										setImageSelected(true);
									}}
									key={index}
								>
									<img
										key={index}
										src={img}
										alt="project"
										style={{
											width: "60px",
											height: "60px",
											objectFit: "cover",
										}}
										className="rounded"
									/>
								</Link>
								{imageSelected && (
									<ImageViewModal
										imageUrl={img}
										setImageSelected={setImageSelected}
									/>
								)}
							</div>
						))}
					</div>
				)}

				<small className="text-muted d-block mb-1">
					<i className="fa-solid fa-location-dot me-1"></i>
					{project.location}
				</small>

				{project.tags?.length > 0 && (
					<div className="d-flex flex-wrap gap-1 mb-2">
						{project.tags.map((tag, idx) => (
							<span key={idx} className="badge bg-light text-dark fw-normal">
								{tag}
							</span>
						))}
					</div>
				)}
			</div>

			<div className="pt-2 d-flex justify-content-end">
				<button
					className="btn btn-danger btn-sm rounded-pill px-3"
					onClick={handleContact}
				>
					<i className="fa-solid fa-message me-2"></i>Contact
				</button>
			</div>
		</div>
	);
}

export default OpenProjectBox;
