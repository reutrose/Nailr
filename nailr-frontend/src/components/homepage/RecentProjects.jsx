import { CalendarDays } from "lucide-react";

function RecentProjects() {
	return (
		<>
			<h3 className="text-center fw-bold pb-4">Recent Projects</h3>
			<div
				className="row row-cols-1 row-cols-lg-3 g-4 justify-content-center"
				style={{ maxWidth: "1000px" }}
			>
				<div className="d-flex justify-content-center">
					<div
						className="d-flex flex-column justify-content-between bg-white shadow-sm rounded-3"
						style={{ width: "300px" }}
					>
						<div
							style={{
								width: "300px",
								height: "150px",
								overflow: "hidden",
								position: "relative",
								zIndex: "1",
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "10px",
							}}
						>
							<img
								src="/homepageBookshelf.jpg"
								alt=""
								className="img-fluid"
								style={{ position: "absolute", top: "-30px" }}
							/>
						</div>
						<div className="card-body p-4 d-flex flex-column justify-content-between">
							<h5 className="fw-bold" style={{ fontSize: "1rem" }}>
								Custom Built-in Bookshelf
							</h5>
							<p className="card-text" style={{ fontSize: "0.8rem" }}>
								Handcrafted by James Carter for a cozy reading nook in Brooklyn.
							</p>
							<div
								className="small text-secondary d-flex align-items-center gap-1"
								style={{ fontSize: "0.7rem" }}
							>
								<CalendarDays size={14} strokeWidth={3} /> Mar 2024
							</div>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-center">
					<div
						className="d-flex flex-column justify-content-between bg-white shadow-sm rounded-3"
						style={{ width: "300px" }}
					>
						<div
							style={{
								width: "300px",
								height: "150px",
								overflow: "hidden",
								position: "relative",
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "10px",
							}}
						>
							<img
								src="/homepageBookshelf.jpg"
								alt=""
								className="img-fluid"
								style={{ position: "absolute", top: "-30px" }}
							/>
						</div>
						<div className="card-body p-4 d-flex flex-column justify-content-between">
							<h5 className="fw-bold" style={{ fontSize: "1rem" }}>
								Custom Built-in Bookshelf
							</h5>
							<p className="card-text" style={{ fontSize: "0.8rem" }}>
								Handcrafted by James Carter for a cozy reading nook in Brooklyn.
							</p>
							<div
								className="small text-secondary d-flex align-items-center gap-1"
								style={{ fontSize: "0.7rem" }}
							>
								<CalendarDays size={14} strokeWidth={3} /> Mar 2024
							</div>
						</div>
					</div>
				</div>
				<div className="d-flex justify-content-center">
					<div
						className="d-flex flex-column justify-content-between bg-white shadow-sm rounded-3"
						style={{ width: "300px" }}
					>
						<div
							style={{
								width: "300px",
								height: "150px",
								overflow: "hidden",
								position: "relative",
								borderTopLeftRadius: "10px",
								borderTopRightRadius: "10px",
							}}
						>
							<img
								src="/homepageBookshelf.jpg"
								alt=""
								className="img-fluid"
								style={{ position: "absolute", top: "-30px" }}
							/>
						</div>
						<div className="card-body p-4 d-flex flex-column justify-content-between">
							<h5 className="fw-bold" style={{ fontSize: "1rem" }}>
								Custom Built-in Bookshelf
							</h5>
							<p className="card-text" style={{ fontSize: "0.8rem" }}>
								Handcrafted by James Carter for a cozy reading nook in Brooklyn.
							</p>
							<div
								className="small text-secondary d-flex align-items-center gap-1"
								style={{ fontSize: "0.7rem" }}
							>
								<CalendarDays size={14} strokeWidth={3} /> Mar 2024
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default RecentProjects;
