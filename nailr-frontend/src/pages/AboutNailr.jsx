const API_URL = import.meta.env.VITE_API_URL;

function AboutNailr() {
	return (
		<>
			<div className="container-fluid d-flex justify-content-center align-items-center flex-column p-5">
				<h2 className="fw-bold" style={{ color: "#38BDF8" }}>
					About Nailr
				</h2>
				<p className="text-muted small">
					Empowering hands-on professionals and customers to connect,
					collaborate, and create.
				</p>
				<div className="container bg-white shadow">
					<div className="row">
						<div className="col-12 col-md-6 d-flex flex-column justify-content-start align-items-start p-4">
							<h5 className="fw-semibold text-accent-red">Our Mission</h5>
							<p>
								At Nailr, we believe that skilled, hands-on work deserves
								visibility, respect, and opportunity. Our mission is to connect
								everyday people with talented local crafters who take pride in
								doing jobs well—whether it’s carpentry, plumbing, tiling, or any
								craft in between. We aim to simplify the way people find, trust,
								and hire reliable professionals, while giving tradespeople the
								platform they’ve always deserved.
							</p>
							<h5 className="fw-semibold text-accent-red">Our Vision</h5>
							<p>
								We envision a world where craftsmanship is celebrated. Where
								your next project—big or small—is matched with someone who not
								only knows how to get it done, but genuinely cares about the
								result. We want to be the go-to network for hands-on
								professionals across the country. A living, breathing portfolio
								for crafters. A hiring platform that’s personal. A home for jobs
								well done.
							</p>
							<h5 className="fw-semibold text-accent-red">
								What Makes Nailr Different?
							</h5>
							<ul>
								<li>
									Craftspeople-First: Unlike generic marketplaces, Nailr is
									built with the needs of tradespeople in mind. We give them
									tools to showcase their work, not just bid on jobs.{" "}
								</li>
								<li>
									Trust Through Transparency: Profiles include real reviews,
									project galleries, and clear information—so clients can hire
									with confidence.
								</li>
								<li>
									Tailored Matching: Whether you're a homeowner, small business,
									or landlord, Nailr helps you find someone right for your
									specific needs—not a one-size-fits-all contractor.
								</li>
							</ul>
							<h5 className="fw-semibold text-accent-red">
								The Story Behind Nailr
							</h5>
							<p>
								Nailr started in the most personal way: with a baby on the way
								and a bathroom too small to fit a baby bath. Hi, I’m Reut —
								founder of Nailr and full-stack developer. During my wife’s
								pregnancy, I found myself searching for a creative, reliable
								crafter who could help me adapt our tiny bathroom to suit our
								growing family's needs. I wasn’t asking for the world—just
								someone to help me reimagine a small space in a smart way. But I
								quickly realized how hard it was to even find that person. The
								platforms I tried were either cluttered, impersonal, or focused
								on big renovations only. I wanted a simple way to find someone
								good—a true pro who takes pride in their craft. That frustration
								became fuel. As part of my final project in a full-stack web
								development course, I decided to build the solution I couldn’t
								find: a platform for real people to find real professionals. A
								place where crafters can shine based on their work, not just on
								marketing budgets. That’s how Nailr was born.
							</p>
						</div>
						<div className="col-12 col-md-6 d-flex justify-content-center align-items-center p-4">
							<img
								src={`${API_URL}/static/about-us.jpg`}
								alt="Crafter"
								style={{ width: "80%", height: "auto" }}
								className="shadow-sm rounded-4"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AboutNailr;
