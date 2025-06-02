import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function PrivacyPolicy() {
	return (
		<>
			<div className="container-fluid d-flex justify-content-center align-items-center flex-column p-5">
				<h2 className="fw-bold" style={{ color: "#38BDF8" }}>
					Privacy Policy
				</h2>
				<p className="text-muted small">Effective Date: June 2nd, 2025</p>
				<p
					className="text-muted small text-center"
					style={{ maxWidth: "600px" }}
				>
					At Nailr, your privacy is important to us. This Privacy Policy
					explains how we collect, use, disclose, and safeguard your information
					when you use our website and services.
				</p>
				<div className="container bg-white shadow">
					<div className="d-flex flex-column justify-content-start align-items-start p-4">
						<div>
							<h5 className="fw-semibold text-accent-red">
								1. Information We Collect
							</h5>
							<h6 className="fw-semibold">a. Personal Information</h6>
							<p>
								When you register for an account or use our platform, we may
								collect:
							</p>
							<ul>
								<li>Full name</li>
								<li>Email address</li>
								<li>Password (encrypted)</li>
								<li>Profile information (bio, profession, location, avatar)</li>
							</ul>
							<h6 className="fw-semibold">b. Usage Data</h6>
							<p>We may collect data on:</p>
							<ul>
								<li>Pages visited</li>
								<li>Time spent on pages</li>
								<li>Actions taken (e.g., posting, messaging, liking)</li>
								<li>Device and browser type</li>
							</ul>
							<h6 className="fw-semibold">
								c. Cookies & Tracking Technologies
							</h6>
							<p>
								We use cookies and similar technologies to improve your
								experience, analyze traffic, and personalize content.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								2. How We Use Your Information
							</h5>
							<p>We use the data we collect to:</p>
							<ul>
								<li>Provide and maintain our services</li>
								<li>Allow businesses and crafters to connect</li>
								<li>Personalize your user experience</li>
								<li>Respond to user support inquiries</li>
								<li>Monitor site usage and trends</li>
								<li>Ensure safety, prevent fraud, and enforce our policies</li>
							</ul>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								3. Sharing Your Information
							</h5>
							<p>
								We <span className="fw-semibold">never sell</span> your personal
								data.
							</p>
							<p>We may share data with:</p>
							<ul>
								<li>
									Trusted third-party services that help us operate the platform
									(e.g., hosting, analytics)
								</li>
								<li>
									Law enforcement or government agencies, if legally required
								</li>
							</ul>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								4. Your Privacy Rights
							</h5>
							<p>You have the right to:</p>
							<ul>
								<li>Access or update your personal data</li>
								<li>Delete your account and all related data</li>
								<li>
									Withdraw consent at any timeDelete your account and all
									related data
								</li>
							</ul>
							<p>
								To make a request, please{" "}
								<Link to={"/contact-us"}>contact us</Link>.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">5. Data Security</h5>
							<p>We implement strict security measures including:</p>
							<ul>
								<li>HTTPS encryption</li>
								<li>Secure password hashing</li>
								<li>Regular vulnerability audits</li>
							</ul>
							<p>However, no online service can guarantee absolute security.</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								6. Children's Privacy
							</h5>
							<p>
								Nailr is not intended for individuals under the age of 16. We do
								not knowingly collect personal data from children.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								7. Updates to This Policy
							</h5>
							<p>
								We may update this Privacy Policy from time to time. Changes
								will be posted on this page, and if significant, we will notify
								users via email or site banner.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">8. Contact Us</h5>
							<p>
								For questions about this Privacy Policy or your data,{" "}
								<Link to={"/contact-us"}>contact us</Link>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default PrivacyPolicy;
