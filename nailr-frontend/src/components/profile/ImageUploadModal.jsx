import { useRef, useEffect, useContext } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthContext from "../../contexts/AuthContext";

const ImageUploadSchema = Yup.object().shape({
	image: Yup.mixed().required("Image is required"),
});

function ImageUploadModal({
	showModal,
	setShowModal,
	onSuccess,
	uploadType,
	uploadEndpoint,
}) {
	const modalRef = useRef(null);
	const bootstrapModal = useRef(null);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!modalRef.current) return;
		if (!bootstrapModal.current) {
			bootstrapModal.current = new window.bootstrap.Modal(modalRef.current);
		}
		showModal ? bootstrapModal.current.show() : bootstrapModal.current.hide();
	}, [showModal]);

	const handleClose = () => {
		setShowModal(false);
		if (bootstrapModal.current) bootstrapModal.current.hide();
		const backdrop = document.querySelector(".modal-backdrop");
		if (backdrop) backdrop.remove();
		document.body.classList.remove("modal-open");
		document.body.style.paddingRight = "";
	};

	return (
		<div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
			<div className="modal-dialog">
				<div className="modal-content">
					<Formik
						initialValues={{ image: null }}
						validationSchema={ImageUploadSchema}
						onSubmit={async (values, actions) => {
							try {
								const formData = new FormData();
								formData.append("image", values.image);

								await fetch(uploadEndpoint, {
									method: "PATCH",
									headers: {
										"x-auth-token": user.token,
									},
									body: formData,
								});

								onSuccess();
								handleClose();
							} catch (error) {
								console.error("Image upload failed:", error);
							}
							actions.setSubmitting(false);
						}}
					>
						{({ setFieldValue, isSubmitting }) => (
							<Form>
								<div className="modal-header">
									<h5 className="modal-title">
										Upload{" "}
										{uploadType === "avatar"
											? "Profile Picture"
											: "Business Logo"}
									</h5>
									<button
										type="button"
										className="btn-close"
										onClick={handleClose}
									></button>
								</div>
								<div className="modal-body">
									<div className="mb-3">
										<label className="form-label">Choose image</label>
										<input
											type="file"
											name="image"
											accept="image/*"
											className="form-control"
											onChange={(event) => {
												setFieldValue("image", event.currentTarget.files[0]);
											}}
										/>
										<ErrorMessage
											name="image"
											component="div"
											className="text-danger"
										/>
									</div>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										onClick={handleClose}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="btn btn-primary"
										disabled={isSubmitting}
									>
										Upload
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default ImageUploadModal;
