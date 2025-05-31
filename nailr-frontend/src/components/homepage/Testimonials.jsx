import { useEffect } from "react";
import { getAllReviews } from "../../services/reviewsService";
import { useState } from "react";

function Testimonials() {
	const [testimonials, setTestimonials] = useState(null);

	useEffect(() => {
		const fetchTestimonials = async () => {
			try {
				let allTestimonials = await getAllReviews();
				const filtered = allTestimonials
					.filter((review) => review.rating === 5)
					.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
					.slice(0, 3);
				setTestimonials(filtered);
			} catch (err) {
				console.error("Failed to load testimonials", err);
			}
		};
		fetchTestimonials();
	}, []);

	return (
		<>
			<h3 className="text-center fw-bold pb-4">What Our Users Say</h3>
			<div
				className="row row-cols-1 row-cols-lg-3 g-4 justify-content-center"
				style={{ maxWidth: "1000px" }}
			>
				{testimonials && testimonials.length ? (
					testimonials.map((review) => {
						return (
							<div
								className="d-flex justify-content-center text-center"
								key={review._id}
							>
								<div
									className="d-flex flex-column justify-content-between bg-white shadow-sm rounded-3 p-4"
									style={{ width: "250px" }}
								>
									<div className="card-body p-4 d-flex flex-column justify-content-between">
										<p className="card-text" style={{ fontSize: "0.8rem" }}>
											{review.comment}
										</p>
										<p style={{ fontSize: "0.8rem", fontWeight: "600" }}>
											{review.user.name}
										</p>
										<div>
											{review.rating == 1 && (
												<i
													className="fa-solid fa-star"
													style={{ color: "#febe7e" }}
												></i>
											)}

											{review.rating == 2 && (
												<>
													<i
														className="fa-solid fa-star"
														style={{ color: "#febe7e" }}
													></i>
													<i
														className="fa-solid fa-star"
														style={{ color: "#febe7e" }}
													></i>
												</>
											)}
											{review.rating == 3 && (
												<>
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
												</>
											)}
											{review.rating == 4 && (
												<>
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
												</>
											)}
											{review.rating == 5 && (
												<>
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
													></i>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<div className="d-flex justify-content-center text-center">
						<div
							className="d-flex flex-column justify-content-between bg-white shadow-sm rounded-3 p-4"
							style={{ width: "250px" }}
						>
							<p>No one left a review yet.</p>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export default Testimonials;
