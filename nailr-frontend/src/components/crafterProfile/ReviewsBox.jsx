import { useEffect, useState } from "react";
import { getReviewsByBusinessId } from "../../services/reviewsService";
import { formatDateToMonthYear } from "../../services/timeService";
import useStarRenderer from "../../hooks/useStarRenderer";
import { SquarePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddReviewModal from "./AddReviewModal";

function ReviewsBox({ crafter, viewer }) {
	const [reviews, setReviews] = useState(null);
	const { renderStars } = useStarRenderer();
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchReviews = async () => {
			const allBusinessReviews = await getReviewsByBusinessId(crafter._id);
			setReviews(allBusinessReviews);
		};
		fetchReviews();
	}, [crafter]);

	const isOwner = crafter?.owner === viewer?._id;

	return (
		<div className="container-fluid bg-white my-5 p-4 rounded shadow-sm review-box">
			<div className="d-flex justify-content-between align-items-center mb-3 px-2">
				<h4 className="fw-bold m-0">Reviews</h4>
				{!isOwner && viewer && (
					<button
						type="button"
						className="btn-add-review"
						onClick={() => setShowModal(true)}
					>
						<SquarePlus size={15} strokeWidth={1} absoluteStrokeWidth />
						&nbsp;Add
					</button>
				)}
			</div>

			{reviews && reviews.length ? (
				reviews.slice(0, 3).map((review) => (
					<div className="review-card" key={review._id}>
						<div className="review-header d-flex flex-column flex-md-row justify-content-between align-items-md-center">
							<div className="fw-bold">{review.user.name}</div>
							<div className="d-flex align-items-center mt-2 mt-md-0">
								{renderStars(review.rating, {
									className: "me-1",
									highlightColor: "#f4a261",
								})}
								<div className="text-sky small">• {review.rating}</div>
							</div>
						</div>
						<div className="text-muted small">
							{formatDateToMonthYear(review.createdAt)}
						</div>
						<p className="mb-0">{review.comment}</p>
					</div>
				))
			) : (
				<p className="text-muted text-center mt-3">No reviews given.</p>
			)}

			<div className="d-flex justify-content-center align-items-center pt-3">
				<button
					className="btn btn-surface opacity-75 text-danger"
					onClick={() => {
						navigate(`/businesses/${crafter._id}/reviews`);
					}}
				>
					View All Reviews
				</button>
			</div>
			<AddReviewModal
				show={showModal}
				onHide={() => setShowModal(false)}
				businessId={crafter._id}
				onReviewAdded={async () => {
					const allBusinessReviews = await getReviewsByBusinessId(crafter._id);
					setReviews(allBusinessReviews);
				}}
			/>
		</div>
	);
}

export default ReviewsBox;
