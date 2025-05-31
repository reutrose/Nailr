import { CircleCheck } from "lucide-react";

function WhatIsNailr() {
	return (
		<>
			<div className="row" style={{ maxWidth: "1400px" }}>
				<div className="col-12 col-md-6 p-5">
					<h3
						className="fw-bold px-5"
						style={{ fontSize: "clamp(1.2rem, 1.1rem + 0.5vw, 1.6rem)" }}
					>
						What is Nailr?
					</h3>
					<p
						className="px-5"
						style={{ fontSize: "clamp(0.7rem, 0.65rem + 0.25vw, 0.9rem)" }}
					>
						Nailr connects you with experienced local professionals ready to
						help with your home projects - big or small. Browse vetted crafters,
						view recent projects, and hire with confidence.
					</p>
					<p
						className="m-0 p-0 pt-2 px-5"
						style={{ fontSize: "clamp(0.7rem, 0.65rem + 0.25vw, 0.9rem)" }}
					>
						<CircleCheck color="#ff6b6b" strokeWidth={3} size={14} />
						&nbsp;Verified and reviewed professionals.
					</p>
					<p
						className="m-0 p-0 pt-2 px-5"
						style={{ fontSize: "clamp(0.7rem, 0.65rem + 0.25vw, 0.9rem)" }}
					>
						<CircleCheck color="#38bdf8" strokeWidth={3} size={14} />
						&nbsp;Wide range of professions.
					</p>
					<p
						className="m-0 p-0 pt-2 px-5"
						style={{ fontSize: "clamp(0.7rem, 0.65rem + 0.25vw, 0.9rem)" }}
					>
						<CircleCheck color="#febe7e" strokeWidth={3} size={14} />
						&nbsp;Secure, easy booking process.
					</p>
				</div>
				<div className="col-12 col-md-6 p-5">
					<div className="container d-flex justify-content-center justify-content-md-end align-items-center px-5">
						<img
							src="/headerCrafters.png"
							alt=""
							width={250}
							height={250}
							className="rounded-3 shadow"
							style={{ border: "3px solid #fff" }}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default WhatIsNailr;
