import { Mailbox } from "lucide-react";
import ContactForm from "../components/generalPages/ContactForm";

function ContactUs() {
	return (
		<>
			<div className="container-fluid bg-eggshell py-5">
				<div className="row justify-content-center align-items-center">
					<div className="col-lg-6 col-md-12 d-none d-lg-flex justify-content-center align-items-center p-5">
						<Mailbox
							size={300}
							strokeWidth={7.5}
							absoluteStrokeWidth
							style={{ opacity: "50%" }}
							className="text-accent-red"
						/>
					</div>
					<div className="col-12 col-md-6 mt-5">
						<div
							className="container bg-white shadow rounded-4 p-4"
							style={{ maxWidth: "500px" }}
						>
							<h2 className="text-center fw-bold mb-4">Contact Us</h2>
							<p className="text-muted text-center mb-4">
								Have a question, suggestion, or just want to say hi? We’d love
								to hear from you!
							</p>
							<ContactForm />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default ContactUs;
