import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { updateUserById } from "../../services/usersService";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const EditProfileForm = ({ user, onUpdate }) => {
	const { user: contextUser, authenticateUser } = useContext(AuthContext);

	const [preview, setPreview] = useState(user.avatar || "");

	const validationSchema = Yup.object({
		firstName: Yup.string().min(2).max(50).required("Required"),
		lastName: Yup.string().min(2).max(50).required("Required"),
		bio: Yup.string().max(300),
		location: Yup.string().max(100),
		dateOfBirth: Yup.string().nullable(),
		gender: Yup.string().oneOf(["male", "female", "other", ""]),
	});

	const initialValues = {
		firstName: user.firstName || "",
		lastName: user.lastName || "",
		bio: user.bio || "",
		avatar: "",
		location: user.location || "",
		dateOfBirth: user.dateOfBirth || "",
		gender: user.gender || "",
	};

	const handleImageChange = (e, setFieldValue) => {
		const file = e.currentTarget.files[0];
		if (file) {
			setFieldValue("avatar", file);

			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = async (values, { setSubmitting }) => {
		const formData = new FormData();

		for (const key in values) {
			if (key === "avatar") {
				if (values.avatar instanceof File) {
					formData.append("avatar", values.avatar);
				}
			} else {
				formData.append(key, values[key]);
			}
		}

		try {
			await updateUserById(contextUser._id, formData, contextUser.token);
			await authenticateUser();
			onUpdate();
		} catch (error) {
			console.error("Profile update failed:", error);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ isSubmitting, setFieldValue }) => (
				<Form
					className="container rounded-4 p-4 shadow-sm my-5"
					style={{ backgroundColor: "#fff0ea", maxWidth: "520px" }}
				>
					<h5 className="fw-bold mb-4 text-danger">
						<i className="fa-solid fa-user-pen me-2"></i>Edit Profile
					</h5>

					<div className="row g-3">
						<div className="col-md-6">
							<label htmlFor="firstName" className="form-label">
								First Name
							</label>
							<Field name="firstName" className="form-control" />
							<ErrorMessage
								name="firstName"
								component="div"
								className="text-danger small"
							/>
						</div>

						<div className="col-md-6">
							<label htmlFor="lastName" className="form-label">
								Last Name
							</label>
							<Field name="lastName" className="form-control" />
							<ErrorMessage
								name="lastName"
								component="div"
								className="text-danger small"
							/>
						</div>

						<div className="col-md-12">
							<label htmlFor="bio" className="form-label">
								Bio
							</label>
							<Field
								as="textarea"
								name="bio"
								className="form-control"
								rows="3"
								style={{ resize: "none" }}
							/>
							<ErrorMessage
								name="bio"
								component="div"
								className="text-danger small"
							/>
						</div>

						<div className="col-md-12">
							<label htmlFor="location" className="form-label">
								Location
							</label>
							<Field name="location" className="form-control" />
							<ErrorMessage
								name="location"
								component="div"
								className="text-danger small"
							/>
						</div>

						<div className="col-md-6">
							<label htmlFor="dateOfBirth" className="form-label">
								Date of Birth
							</label>
							<Field type="date" name="dateOfBirth" className="form-control" />
							<ErrorMessage
								name="dateOfBirth"
								component="div"
								className="text-danger small"
							/>
						</div>

						<div className="col-md-6">
							<label htmlFor="gender" className="form-label">
								Gender
							</label>
							<Field as="select" name="gender" className="form-select">
								<option value="">Select</option>
								<option value="female">Female</option>
								<option value="male">Male</option>
								<option value="other">Other</option>
							</Field>
							<ErrorMessage
								name="gender"
								component="div"
								className="text-danger small"
							/>
						</div>

						<div className="col-12">
							<label htmlFor="avatar" className="form-label">
								Avatar
							</label>
							<div className="d-flex align-items-center">
								<img
									src={preview || "/noPhoto.jpg"}
									alt="Avatar Preview"
									className="rounded-circle shadow-sm mx-3"
									style={{
										width: "60px",
										height: "60px",
										objectFit: "cover",
										border: "2px solid #e5e5e5",
									}}
								/>
								<input
									type="file"
									accept="image/*"
									onChange={(e) => handleImageChange(e, setFieldValue)}
									className="form-control"
								/>
							</div>

							<div className="mt-2"></div>
						</div>

						<div className="col-12 mt-4">
							<button
								type="submit"
								className="btn btn-accent-red w-100 text-white rounded"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Saving..." : "Save Changes"}
							</button>
						</div>
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default EditProfileForm;
