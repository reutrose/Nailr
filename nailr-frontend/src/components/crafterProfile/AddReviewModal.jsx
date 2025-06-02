import { useContext, useEffect, useRef, useState } from "react";
import { createReview } from "../../services/reviewsService";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthContext from "../../contexts/AuthContext";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import confetti from "canvas-confetti";

function AddReviewModal({ show, onHide, businessId, onReviewAdded }) {
	const [loading, setLoading] = useState(false);
	const [hoverRating, setHoverRating] = useState(null);
	const [showThankYou, setShowThankYou] = useState(false);
	const toastRef = useRef();
	const modalRef = useRef();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (show && modalRef.current) {
			const modalElement = modalRef.current;
			const modalInstance = new bootstrap.Modal(modalElement, {
				backdrop: true,
			});
			modalInstance.show();

			const handleHidden = () => {
				onHide();
				setShowThankYou(false);
				formik.resetForm();
				document.body.classList.remove("modal-open");
				document.querySelector(".modal-backdrop")?.remove();
			};

			modalElement.addEventListener("hidden.bs.modal", handleHidden);
			return () => {
				modalElement.removeEventListener("hidden.bs.modal", handleHidden);
			};
		}
	}, [show, onHide]);

	const formik = useFormik({
		initialValues: {
			rating: "",
			comment: "",
		},
		validationSchema: Yup.object({
			rating: Yup.number().required("Rating is required").min(1).max(5),
			comment: Yup.string().required("Comment is required").min(2),
		}),
		onSubmit: async (values) => {
			try {
				setLoading(true);
				await createReview(
					user.token,
					values.comment,
					values.rating,
					businessId
				);
				onReviewAdded();
				setShowThankYou(true);
				confetti({ particleCount: 150, spread: 70 });

				setTimeout(() => {
					const modal = bootstrap.Modal.getInstance(modalRef.current);
					modal?.hide();

					const toastElement = toastRef.current;
					if (toastElement) {
						const toast = new bootstrap.Toast(toastElement, {
							autohide: true,
							delay: 3000,
						});
						toast.show();
					}
				}, 2500);
			} catch (err) {
				console.error("Error submitting review:", err);
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<>
			<div
				className="modal fade"
				tabIndex="-1"
				ref={modalRef}
				aria-hidden="true"
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						{showThankYou ? (
							<div className="p-5 text-center">
								<h5 className="mb-3">Thanks for the review! 🙏</h5>
								<p className="text-muted small">
									This will close automatically.
								</p>
							</div>
						) : (
							<form onSubmit={formik.handleSubmit}>
								<div className="modal-header">
									<h5 className="modal-title">Add a Review</h5>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
									></button>
								</div>

								<div className="modal-body">
									<div className="mb-3">
										<label className="form-label d-block">Rating</label>
										<div className="d-flex gap-1">
											{[1, 2, 3, 4, 5].map((star) => (
												<i
													key={star}
													className={`fa-star ${
														(hoverRating || formik.values.rating) >= star
															? "fa-solid text-warning"
															: "fa-regular text-muted"
													}`}
													style={{ fontSize: "1.5rem", cursor: "pointer" }}
													onClick={() => {
														formik.setFieldValue("rating", star);
														formik.setFieldTouched("rating", true, true);
													}}
													onMouseEnter={() => setHoverRating(star)}
													onMouseLeave={() => setHoverRating(null)}
												/>
											))}
										</div>
										{formik.touched.rating && formik.errors.rating && (
											<div className="text-danger small mt-1">
												{formik.errors.rating}
											</div>
										)}
									</div>

									<div className="mb-3">
										<label htmlFor="comment" className="form-label">
											Comment
										</label>
										<textarea
											id="comment"
											name="comment"
											rows="3"
											className={`form-control ${
												formik.touched.comment && formik.errors.comment
													? "is-invalid"
													: ""
											}`}
											value={formik.values.comment}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											disabled={loading}
										/>
										{formik.touched.comment && formik.errors.comment && (
											<div className="invalid-feedback">
												{formik.errors.comment}
											</div>
										)}
									</div>
								</div>

								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										data-bs-dismiss="modal"
										disabled={loading}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="btn btn-primary"
										disabled={loading || !formik.values.rating}
									>
										{loading ? "Saving..." : "Submit"}
									</button>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>

			<div
				ref={toastRef}
				className="toast position-fixed bottom-0 end-0 m-3"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
			>
				<div className="toast-header bg-success text-white">
					<strong className="me-auto">Success</strong>
					<small>Just now</small>
					<button
						type="button"
						className="btn-close btn-close-white"
						data-bs-dismiss="toast"
						aria-label="Close"
					></button>
				</div>
				<div className="toast-body">Review submitted successfully!</div>
			</div>
		</>
	);
}

export default AddReviewModal;
