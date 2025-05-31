import { useEffect } from "react";
import { getReviewsByBusinessId } from "../../services/reviewsService";
import { useState } from "react";
import { formatDateToMonthYear } from "../../services/timeService";
import useStarRenderer from "../../hooks/useStarRenderer";
import { SquarePlus } from "lucide-react";

function ReviewsBox({ crafter, viewer }) {
	const [reviews, setReviews] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const { renderStars } = useStarRenderer();

	useEffect(() => {
		const fetchReviews = async () => {
			let allBusinessReviews = await getReviewsByBusinessId(crafter._id);
			setReviews(allBusinessReviews);
		};
		fetchReviews();
	}, [crafter]);

	return (
		<>
			<div
				className="container-fluid bg-white my-5 p-4 rounded shadow-sm"
				style={{ maxWidth: "1000px" }}
			>
				<div className="row m-0 p-0 mx-2">
					<div className="col d-flex justify-content-start align-items-center">
						<h4 className="fw-bold">Reviews</h4>
					</div>
					<div className="col d-flex justify-content-end align-items-center">
						{crafter.owner == viewer._id && (
							<div className="container d-flex justify-content-end">
								<button
									type="button"
									className="edit-profile-btn"
									onClick={() => setShowModal(true)}
								>
									<SquarePlus size={15} strokeWidth={1} absoluteStrokeWidth />
									&nbsp;Add
								</button>
							</div>
						)}
					</div>
				</div>
				{reviews && reviews.length ? (
					reviews.slice(0, 3).map((review) => {
						return (
							<>
								<div
									className="container-fluid d-flex flex-column m-0 p-0  border-bottom p-3"
									key={review._id}
								>
									<div className="row container m-0 p-0 d-flex flex-row align-items-center justify-content-between">
										<div className="col-12 col-md-6 text-start fw-bold">
											{review.user.name}
										</div>

										<div className="col-12 col-md-6 m-0 p-0 d-flex flex-row justify-content-end align-items-center">
											{renderStars(review.rating, {
												className: "me-1",
												highlightColor: "#f4a261",
											})}
											<div className="p-1 text-sky small">
												• {review.rating}
											</div>
										</div>
									</div>
									<div className="container">
										<div className="small text-muted">
											{formatDateToMonthYear(review.createdAt)}
										</div>
									</div>
									<div className="container">{review.comment}</div>
								</div>
							</>
						);
					})
				) : (
					<p>No reviews given.</p>
				)}
				<div className="container d-flex justify-content-center align-items-center p-3">
					<button className="btn btn-surface opacity-75 text-danger">
						View All Reviews
					</button>
				</div>
			</div>
		</>
	);
}

export default ReviewsBox;
