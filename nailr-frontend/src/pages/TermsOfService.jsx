import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function TermsOfService() {
	return (
		<>
			<div className="container-fluid d-flex justify-content-center align-items-center flex-column p-5">
				<h2 className="fw-bold" style={{ color: "#38BDF8" }}>
					Terms of Service
				</h2>
				<p className="text-muted small">Effective Date: June 2nd, 2025</p>
				<p
					className="text-muted small text-center"
					style={{ maxWidth: "600px" }}
				>
					Welcome to Nailr! These Terms of Service (“Terms”) govern your access
					to and use of our platform, services, and content. By accessing or
					using Nailr, you agree to be bound by these Terms.
				</p>
				<div className="container bg-white shadow">
					<div className="d-flex flex-column justify-content-start align-items-start p-4">
						<div>
							<h5 className="fw-semibold text-accent-red">1. Eligibility</h5>
							<p>To use Nailr, you must:</p>
							<ul>
								<li>Be at least 16 years old</li>
								<li>Provide accurate registration information</li>
								<li>
									Agree to comply with all local, state, and international laws
								</li>
							</ul>
							<p>
								If you're accessing Nailr on behalf of a business or
								organization, you represent that you have authority to bind that
								entity to these Terms.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">2. Your Account</h5>
							<p>You are responsible for:</p>
							<ul>
								<li>
									Maintaining the confidentiality of your login credentials
								</li>
								<li>All activity under your account</li>
								<li>
									Ensuring your profile content is accurate and respectful
								</li>
							</ul>
							<p>
								We reserve the right to suspend or terminate your account for
								violating these Terms or any community guidelines.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								3. Use of the Platform
							</h5>
							<p>
								Nailr is a marketplace for showcasing and hiring skilled
								crafters. You agree not to:
							</p>
							<ul>
								<li>Impersonate others or misrepresent your identity</li>
								<li>Use Nailr for illegal or harmful purposes</li>
								<li>Upload malicious software or spam</li>
								<li>
									Copy, scrape, or redistribute content without permission
								</li>
							</ul>
							<p>
								We reserve the right to monitor and moderate all content for
								safety and quality purposes.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								4. Content Ownership
							</h5>
							<ul>
								<li>
									You retain ownership of content you upload to Nailr (e.g.,
									projects, reviews, profile photos).
								</li>
								<li>
									By posting content, you grant Nailr a non-exclusive,
									royalty-free license to display and distribute it as part of
									the platform.
								</li>
								<li>
									You may not post content that infringes upon the rights of
									others or violates any laws.
								</li>
							</ul>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								5. Interactions & Conduct
							</h5>
							<p>
								You agree to interact with other users respectfully and
								professionally. This includes:
							</p>
							<ul>
								<li>Honoring agreed-upon terms for services</li>
								<li>Providing honest reviews</li>
								<li>Avoiding harassment, discrimination, or abuse</li>
							</ul>
							<p>
								We are not responsible for disputes between users but may
								intervene at our discretion.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">6. Termination</h5>
							<p>You may terminate your account at any time.</p>
							<p>We reserve the right to suspend or delete accounts that:</p>
							<ul>
								<li>Violate these Terms</li>
								<li>Harm the integrity or safety of the platform</li>
								<li>Remain inactive for a prolonged period</li>
							</ul>
							<p>
								Termination does not relieve you of obligations related to prior
								activity.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								7. Third-Party Services and Disclaimers
							</h5>
							<p>
								Nailr is a <span className="fw-semibold">platform only</span> —
								we provide the digital infrastructure for clients and crafters
								to connect, communicate, and transact. We{" "}
								<span className="fw-semibold">
									do not guarantee, control, or take responsibility
								</span>{" "}
								for:
							</p>
							<ul>
								<li>
									The{" "}
									<span className="fw-semibold">
										quality, accuracy, safety,
									</span>{" "}
									or <span className="fw-semibold">legality</span> of services
									or goods provided by users
								</li>
								<li>
									The <span className="fw-semibold">qualifications</span> or
									<span className="fw-semibold">professional conduct</span> of
									crafters
								</li>
								<li>
									The <span className="fw-semibold">satisfaction</span> of
									completed work or project outcomes
								</li>
								<li>
									<span className="fw-semibold">Payments, scheduling, </span>or
									<span className="fw-semibold">delivery</span> arrangements
									between users
								</li>
							</ul>
							<p>You acknowledge and agree that:</p>
							<ul>
								<li>
									Nailr is <span className="fw-semibold">not a party</span> to
									any agreement between you and other users
								</li>
								<li>
									Any transactions or interactions are conducted{" "}
									<span className="fw-semibold">at your own risk</span>
								</li>
							</ul>
							<p>
								We recommend that users exercise good judgment, communicate
								clearly, and use contracts or documentation when entering into
								service agreements.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								8. Disclaimer of Warranties
							</h5>
							<p>Nailr is provided “as-is” and “as available.”</p>
							<p>We make no guarantees about:</p>
							<ul>
								<li>Availability or uptime</li>
								<li>The accuracy of user-generated content</li>
								<li>Successful matches between users</li>
							</ul>
							<p>Use Nailr at your own risk.</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								9. Limitation of Liability
							</h5>
							<p>
								To the fullest extent permitted by law, Nailr shall not be
								liable for:
							</p>
							<ul>
								<li>Indirect, incidental, or consequential damages</li>
								<li>Loss of data or business interruption</li>
								<li>Disputes or outcomes of user interactions</li>
							</ul>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">
								10. Changes to Terms
							</h5>
							<p>We may update these Terms periodically. When we do:</p>
							<ul>
								<li>We’ll update the “Effective Date”</li>
								<li>
									Notify you via email or platform banners if changes are
									significant
								</li>
							</ul>
							<p>
								Continuing to use Nailr after changes constitutes acceptance of
								the new Terms.
							</p>
						</div>
						<div>
							<h5 className="fw-semibold text-accent-red">11. Contact Us</h5>
							<p>
								If you have questions or concerns about these Terms,{" "}
								<Link to={"/contact-us"}>contact us</Link>.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default TermsOfService;
