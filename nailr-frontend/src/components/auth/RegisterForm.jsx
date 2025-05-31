import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser, userLogin } from "../../services/usersService";
import usePasswordStrength from "../../hooks/usePasswordStrength";
import useCheckEmailAvailability from "../../hooks/useCheckEmailAvailablity";
import AuthContext from "../../contexts/AuthContext";

function RegisterForm() {
	const { authenticateUser } = useContext(AuthContext);
	const nav = useNavigate();
	const { status: emailStatus, checkEmail } = useCheckEmailAvailability();
	const { strength: passwordStatus, evaluate: evaluatePassword } =
		usePasswordStrength();
	const [errorMessage, setErrorMessage] = useState(null);

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.min(2, "Must be at least 2 characters")
				.max(50, "Too long")
				.required("First name is required"),
			lastName: Yup.string()
				.min(2, "Must be at least 2 characters")
				.max(50, "Too long")
				.required("Last name is required"),
			email: Yup.string()
				.email("Invalid email format.")
				.min(5, "Email must contain at least 5 characters.")
				.required("Email is a required field."),
			password: Yup.string()
				.min(8, "Password must be at least 8 characters.")
				.max(20, "Password cannot exceed 20 characters.")
				.matches(/[A-Z]/, "Must include an uppercase letter.")
				.matches(/[a-z]/, "Must include a lowercase letter.")
				.matches(/.*\d.*\d.*\d.*\d/, "Must include at least four digits.")
				.matches(
					/[!@#$%^&*_-]/,
					"Must include a special character (*_-*&^%$#@!)."
				)
				.required("Password is a required field."),
		}),
		onSubmit: (values) => {
			registerUser(
				values.email,
				values.password,
				values.firstName,
				values.lastName
			)
				.then(() => {
					userLogin(values.email, values.password, false)
						.then(() => {
							authenticateUser();
						})
						.then(() => nav("/"))
						.catch((err) => {
							console.error("Login failed:", err);
						});
				})
				.catch((err) => {
					console.error("Registration failed:", err);
					setErrorMessage("Something went wrong.");
				});
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="mb-3">
				<label htmlFor="firstName" className="form-label">
					First Name:
				</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					className={`form-control ${
						formik.touched.firstName && formik.errors.firstName
							? "is-invalid"
							: formik.touched.firstName
							? "is-valid"
							: ""
					}`}
					value={formik.values.firstName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.firstName && formik.errors.firstName && (
					<div className="invalid-feedback">{formik.errors.firstName}</div>
				)}
			</div>

			<div className="mb-3">
				<label htmlFor="lastName" className="form-label">
					Last Name:
				</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					className={`form-control ${
						formik.touched.lastName && formik.errors.lastName
							? "is-invalid"
							: formik.touched.lastName
							? "is-valid"
							: ""
					}`}
					value={formik.values.lastName}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.lastName && formik.errors.lastName && (
					<div className="invalid-feedback">{formik.errors.lastName}</div>
				)}
			</div>
			<div className="mb-3">
				<label htmlFor="email-input" className="form-label">
					Email address:
				</label>
				<input
					type="email"
					name="email"
					id="email-input"
					className={`form-control ${
						formik.touched.email && (formik.errors.email || emailStatus.exists)
							? "is-invalid"
							: formik.touched.email
							? "is-valid"
							: ""
					}`}
					value={formik.values.email}
					onChange={(e) => {
						formik.handleChange(e);
						checkEmail(e.target.value);
					}}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.email && formik.errors.email && (
					<div className="invalid-feedback">{formik.errors.email}</div>
				)}
				{formik.touched.email && emailStatus.exists && !formik.errors.email && (
					<div className="invalid-feedback">Email is already in use</div>
				)}
				{formik.touched.email && emailStatus.error && (
					<div className="invalid-feedback">{emailStatus.error}</div>
				)}
			</div>

			<div className="mb-3">
				<label htmlFor="password-input" className="form-label">
					Password:
				</label>
				<input
					type="password"
					name="password"
					id="password-input"
					className={`form-control ${
						formik.touched.password && formik.errors.password
							? "is-invalid"
							: formik.touched.password
							? "is-valid"
							: ""
					}`}
					value={formik.values.password}
					onChange={(e) => {
						formik.handleChange(e);
						evaluatePassword(e.target.value);
					}}
					onBlur={formik.handleBlur}
				/>

				<p
					className={
						passwordStatus.lowercase
							? "text-success small m-0 p-0"
							: "text-danger small m-0 p-0"
					}
				>
					&bull; At least one lowercase letter
				</p>
				<p
					className={
						passwordStatus.uppercase
							? "text-success small m-0 p-0"
							: "text-danger small m-0 p-0"
					}
				>
					&bull; At least one uppercase letter
				</p>
				<p
					className={
						passwordStatus.digit
							? "text-success small m-0 p-0"
							: "text-danger small m-0 p-0"
					}
				>
					&bull; At least one digit
				</p>
				<p
					className={
						passwordStatus.specialChar
							? "text-success small m-0 p-0"
							: "text-danger small m-0 p-0"
					}
				>
					&bull; At least one special character
				</p>
				<p
					className={
						passwordStatus.length
							? "text-success small m-0 p-0"
							: "text-danger small m-0 p-0"
					}
				>
					&bull; At least 8 characters
				</p>
			</div>

			<button
				type="submit"
				className="btn btn-prime w-100 rounded-4 text-white"
				disabled={
					!formik.isValid ||
					!formik.dirty ||
					emailStatus.exists === true ||
					formik.isSubmitting
				}
			>
				Sign Up
			</button>

			{errorMessage && (
				<div className="bg-danger-subtle rounded p-2 mt-3 text-center text-dark">
					<p>{errorMessage}</p>
				</div>
			)}
		</form>
	);
}

export default RegisterForm;
