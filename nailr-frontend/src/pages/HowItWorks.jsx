import { Search, Handshake, ClipboardCheck, Drill, Star } from "lucide-react";
import "../assets/css/howItWorks.css";
import FadeInSection from "../components/shared/FadeInSection";

const steps = [
	{
		icon: Search,
		step: "1. Browse Crafters",
		text: "Explore profiles of skilled carpenters, electricians, painters, and more in your area.",
		ribbon: false,
		direction: "up",
	},
	{
		icon: Handshake,
		step: "2. Connect Instantly",
		text: "Message and negotiate with crafters directly - no middlemen or hidden fees.",
		ribbon: false,
		direction: "left",
	},
	{
		icon: ClipboardCheck,
		step: "3. Book With Confidence",
		text: "Secure your project dates and payment safely through our trusted platform.",
		ribbon: true,
		direction: "right",
	},
	{
		icon: Drill,
		step: "4. Get The Job Done",
		text: "Your selected crafter brings your vision to life - on time and to the highest standard.",
		ribbon: false,
		direction: "down",
	},
	{
		icon: Star,
		step: "5. Rate & Review",
		text: "Share your experience to help others find the right crafter and build our trusted community.",
		ribbon: false,
		direction: "up",
	},
];

function HowItWorks() {
	return (
		<>
			<div className="container-fluid d-flex justify-content-center align-items-center flex-column p-5">
				<h2 className="fw-bold">How It Works</h2>
				<p className="text-muted small">
					Connect with skilled crafters in just a few easy steps.
				</p>
				<div className="row w-100 d-flex justify-content-space-between align-items-center">
					{steps.map(({ icon: Icon, step, text, ribbon, direction }) => {
						return (
							<FadeInSection direction={direction}>
								<div className="col-12 p-3">
									<div className="container d-flex flex-column justify-content-center align-items-center bg-white rounded p-3 shadow position-relative">
										<div
											className="bg-canvas text-accent-red d-flex justify-content-center align-items-center mb-2"
											style={{
												width: "40px",
												height: "40px",
												borderRadius: "50%",
											}}
										>
											<Icon />
										</div>
										<div>
											<h6 className="fw-bold">{step}</h6>
										</div>
										<div>
											<p
												className="small text-center"
												style={{ fontSize: "0.7rem" }}
											>
												{text}
											</p>
										</div>
										{ribbon && <div className="ribbon">Soon</div>}
									</div>
								</div>
							</FadeInSection>
						);
					})}
				</div>
			</div>
		</>
	);
}

export default HowItWorks;
