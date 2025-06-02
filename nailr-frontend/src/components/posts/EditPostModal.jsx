import React, { useRef, useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updatePostById } from "../../services/postService";
import AuthContext from "../../contexts/AuthContext";

const PostSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
	tags: Yup.string().required("At least one tag is required"),
	location: Yup.string(),
	images: Yup.mixed(),
});

function EditPostModal({ post, showModal, setShowModal, onSuccess }) {
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

	if (!post) return;

	return (
		<div className="modal fade" ref={modalRef} tabIndex="-1" aria-hidden="true">
			<div className="modal-dialog">
				<div
					className="modal-content border-0"
					style={{ backgroundColor: "#f7fcff" }}
				>
					<Formik
						initialValues={{
							title: post.title,
							description: post.description,
							tags: post.tags.join(","),
							location: post.location || "",
							images: [],
						}}
						validationSchema={PostSchema}
						onSubmit={async (values, actions) => {
							try {
								const formData = new FormData();
								formData.append("title", values.title);
								formData.append("description", values.description);
								formData.append("tags", values.tags);
								formData.append("location", values.location);
								for (let file of values.images) {
									formData.append("images", file);
								}
								await updatePostById(user.token, post._id, formData);
								onSuccess();
								handleClose();
							} catch (err) {
								console.error("Failed to update post:", err);
							}
							actions.setSubmitting(false);
						}}
					>
						{({ setFieldValue, isSubmitting }) => (
							<Form className="p-4">
								<h5 className="text-sky fw-bold mb-4">
									<i className="fa-regular fa-pen-to-square me-2"></i>
									Edit Post
								</h5>

								<div className="mb-3">
									<label className="form-label">Title</label>
									<Field name="title" className="form-control" />
									<ErrorMessage
										name="title"
										component="div"
										className="text-danger"
									/>
								</div>

								<div className="mb-3">
									<label className="form-label">Description</label>
									<Field
										name="description"
										as="textarea"
										className="form-control"
										rows="3"
									/>
									<ErrorMessage
										name="description"
										component="div"
										className="text-danger"
									/>
								</div>

								<div className="mb-3">
									<label className="form-label">Tags</label>
									<Field
										name="tags"
										className="form-control"
										placeholder="Add a tag and press Enter"
									/>
									<ErrorMessage
										name="tags"
										component="div"
										className="text-danger"
									/>
								</div>

								<div className="mb-3">
									<label className="form-label">Location</label>
									<Field name="location" className="form-control" />
								</div>

								<div className="mb-3">
									<label className="form-label">Upload New Images</label>
									<input
										type="file"
										name="images"
										multiple
										className="form-control"
										onChange={(event) => {
											setFieldValue(
												"images",
												Array.from(event.currentTarget.files)
											);
										}}
									/>
									<ErrorMessage
										name="images"
										component="div"
										className="text-danger"
									/>
								</div>

								<div className="d-flex justify-content-end gap-2">
									<button
										type="button"
										className="btn btn-light"
										onClick={handleClose}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="btn btn-sky text-white"
										disabled={isSubmitting}
									>
										Update Post
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

export default EditPostModal;
