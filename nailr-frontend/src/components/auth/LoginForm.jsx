import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { userLogin } from "../../services/usersService";
import useCheckEmailAvailability from "../../hooks/useCheckEmailAvailablity";
import AuthContext from "../../contexts/AuthContext";

function LoginForm() {
	const nav = useNavigate();
	const { status: emailStatus, checkEmail } = useCheckEmailAvailability();
	const [errorMessage, setErrorMessage] = useState(null);
	const { authenticateUser } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.email("Invalid email format.")
				.required("Email is a required field."),
			password: Yup.string().required("Password is a required field."),
		}),
		onSubmit: (values) => {
			userLogin(values.email, values.password, false)
				.then(() => {
					authenticateUser();
				})
				.then(() => nav("/"))
				.catch((err) => {
					console.error("Login failed:", err);
					setErrorMessage("Something went wrong.");
				});
		},
	});

	return (
		<form onSubmit={formik.handleSubmit}>
			<div className="mb-3">
				<label htmlFor="email-input" className="form-label">
					Email address:
				</label>
				<input
					type="email"
					name="email"
					id="email-input"
					className={`form-control ${
						formik.touched.email && (formik.errors.email || !emailStatus.exists)
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
				{formik.touched.email &&
					!emailStatus.exists &&
					!formik.errors.email && (
						<div className="invalid-feedback">
							Email does not belong to a user.
						</div>
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
					}}
					onBlur={formik.handleBlur}
				/>
			</div>

			<button
				type="submit"
				className="btn btn-prime w-100 rounded-4 text-white"
				disabled={
					!formik.isValid ||
					!formik.dirty ||
					emailStatus.exists === false ||
					formik.isSubmitting
				}
			>
				Login
			</button>

			{errorMessage && (
				<div className="bg-danger-subtle rounded p-2 mt-3 text-center text-dark">
					<p>{errorMessage}</p>
				</div>
			)}
		</form>
	);
}

export default LoginForm;
