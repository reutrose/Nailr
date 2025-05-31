import { useEffect } from "react";
import { useState } from "react";
import { getAllBusinesses } from "../../services/businessService";
const API_URL = import.meta.env.VITE_API_URL;

function FeaturedCrafters() {
	const [crafters, setCrafters] = useState(null);

	useEffect(() => {
		const fetchCrafters = async () => {
			try {
				let allCrafters = await getAllBusinesses();
				const filtered = allCrafters
					.filter((crafter) => crafter.averageRating === 5)
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.slice(0, 3);
				setCrafters(filtered);
			} catch (err) {
				console.error("Failed to load crafters", err);
			}
		};
		fetchCrafters();
	}, []);

	return (
		<>
			<h3 className="text-center fw-bold pb-4">Featured Crafters</h3>
			<div
				className="row row-cols-1 row-cols-lg-3 g-4 justify-content-center"
				style={{ maxWidth: "1000px" }}
			>
				{crafters && crafters.length ? (
					crafters.map((crafter) => {
						return (
							<div
								className="d-flex justify-content-center text-center"
								key={crafter._id}
							>
								<div
									className="d-flex flex-column justify-content-between bg-white shadow-sm rounded-3"
									style={{ width: "300px" }}
								>
									<div className="w-100 p-3 d-flex justify-content-center align-items-center">
										<img
											src={
												crafter.logo
													? `${API_URL}${crafter.logo}`
													: "/noPhoto.jpg"
											}
											alt=""
											className="img-fluid"
											style={{
												width: "70px",
												height: "70px",
												borderRadius: "50%",
												border: "2px solid rgba(189, 201, 30, 0.3)",
											}}
										/>
									</div>
									<div className="card-body p-4 d-flex flex-column justify-content-between">
										<h5 className="fw-bold" style={{ fontSize: "1rem" }}>
											{crafter.businessName}
										</h5>
										<p
											style={{
												fontSize: "0.8rem",
												fontWeight: "600",
												color: "#ff0000",
											}}
										>
											{crafter.profession}
										</p>
										<p className="card-text" style={{ fontSize: "0.8rem" }}>
											{crafter.description}
										</p>
										<div className="p-2">
											<i
												className="fa-solid fa-star"
												style={{ color: "#febe7e" }}
											></i>
											<i
												className="fa-solid fa-star"
												style={{ color: "#febe7e" }}
											></i>
											<i
												className="fa-solid fa-star"
												style={{ color: "#febe7e" }}
											></i>
											<i
												className="fa-solid fa-star"
												style={{ color: "#febe7e" }}
											></i>
											<i
												className="fa-solid fa-star"
												style={{ color: "#febe7e" }}
											></i>{" "}
										</div>
										<p
											className="card-text fw-bold"
											style={{ fontSize: "0.7rem" }}
										>
											{crafter.location}
										</p>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div className="d-flex justify-content-center text-center">
						<div
							className="d-flex flex-column justify-content-between bg-white shadow-sm rounded-3"
							style={{ width: "300px" }}
						>
							<p>No Crafters Yet.</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default FeaturedCrafters;
