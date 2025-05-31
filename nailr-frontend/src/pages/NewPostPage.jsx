import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { createPost } from "../services/postService";
import AuthContext from "../contexts/AuthContext";

const PostSchema = Yup.object().shape({
	title: Yup.string().required("Title is required"),
	description: Yup.string().required("Description is required"),
	tags: Yup.string(),
	location: Yup.string(),
	postType: Yup.string()
		.oneOf(["showcase", "request"], "Invalid post type")
		.required("Post type is required"),
	images: Yup.mixed(),
});

function NewPostPage() {
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [serverError, setServerError] = useState("");

	const initialValues = {
		title: "",
		description: "",
		images: [],
		tags: "",
		location: "",
		postType: "showcase",
	};

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			const formData = new FormData();
			formData.append("title", values.title);
			formData.append("description", values.description);
			formData.append("tags", values.tags);
			formData.append("location", values.location);
			formData.append("postType", values.postType);

			for (let i = 0; i < values.images.length; i++) {
				formData.append("images", values.images[i]);
			}

			let newPost = await createPost(formData, user.token);
			navigate(`/posts/${newPost._id}`);
		} catch (error) {
			console.error(error);
			setServerError("Failed to create post. Please try again.");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="container my-5">
			<h2 className="mb-4 text-center">Create a New Post</h2>
			<Formik
				initialValues={initialValues}
				validationSchema={PostSchema}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue, isSubmitting }) => (
					<Form encType="multipart/form-data">
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
								rows="4"
							/>
							<ErrorMessage
								name="description"
								component="div"
								className="text-danger"
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">Images</label>
							<input
								name="images"
								type="file"
								className="form-control"
								multiple
								onChange={(event) => {
									setFieldValue("images", event.currentTarget.files);
								}}
							/>
							<ErrorMessage
								name="images"
								component="div"
								className="text-danger"
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">Tags (comma separated)</label>
							<Field name="tags" className="form-control" />
							<ErrorMessage
								name="tags"
								component="div"
								className="text-danger"
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">Location</label>
							<Field name="location" className="form-control" />
							<ErrorMessage
								name="location"
								component="div"
								className="text-danger"
							/>
						</div>

						<div className="mb-3">
							<label className="form-label">Post Type</label>
							<Field name="postType" as="select" className="form-select">
								<option value="showcase">Showcase</option>
								<option value="request">Request</option>
							</Field>
							<ErrorMessage
								name="postType"
								component="div"
								className="text-danger"
							/>
						</div>

						{serverError && (
							<div className="alert alert-danger">{serverError}</div>
						)}

						<button
							type="submit"
							className="btn btn-primary w-100"
							disabled={isSubmitting}
						>
							{isSubmitting ? "Submitting..." : "Create Post"}
						</button>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default NewPostPage;
