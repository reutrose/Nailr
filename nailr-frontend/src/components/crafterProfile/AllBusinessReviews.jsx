import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReviewsByBusinessId } from "../../services/reviewsService";
import { getBusinessById } from "../../services/businessService";
import { formatDateToMonthYear } from "../../services/timeService";
import useStarRenderer from "../../hooks/useStarRenderer";
import { ArrowLeft, SquarePlus } from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import AddReviewModal from "./AddReviewModal";

function AllBusinessReviews() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [reviews, setReviews] = useState([]);
	const [business, setBusiness] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const { user } = useContext(AuthContext);
	const { renderStars } = useStarRenderer();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const businessData = await getBusinessById(id);
				const reviewsData = await getReviewsByBusinessId(id);
				setBusiness(businessData);
				setReviews(reviewsData);
			} catch (error) {
				console.error("Error fetching business or reviews", error);
			}
		};
		fetchData();
	}, [id]);

	const isOwner = business?.owner === user?._id;

	return (
		<div className="container-fluid p-4" style={{ maxWidth: "1000px" }}>
			<div className="d-flex align-items-center mb-3">
				<ArrowLeft
					role="button"
					size={20}
					className="me-2 text-muted"
					onClick={() => navigate(-1)}
				/>
				<h3 className="fw-bold m-0">
					All Reviews for {business?.businessName}
				</h3>
			</div>

			{!isOwner && user && (
				<div className="mb-4">
					<button className="btn-add-review" onClick={() => setShowModal(true)}>
						<SquarePlus size={15} strokeWidth={1} absoluteStrokeWidth />
						&nbsp;Add Review
					</button>
				</div>
			)}

			{reviews && reviews.length ? (
				reviews.map((review) => (
					<div
						className="review-card mb-4 p-3 bg-white rounded shadow-sm"
						key={review._id}
					>
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
				<p className="text-muted text-center mt-4">No reviews found.</p>
			)}
			<AddReviewModal
				show={showModal}
				onHide={() => setShowModal(false)}
				businessId={business._id}
				onReviewAdded={async () => {
					const allBusinessReviews = await getReviewsByBusinessId(business._id);
					setReviews(allBusinessReviews);
				}}
			/>
		</div>
	);
}

export default AllBusinessReviews;
