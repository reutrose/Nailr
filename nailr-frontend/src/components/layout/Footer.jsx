import { Link } from "react-router-dom";

function Footer() {
	return (
		<>
			<div className="container-fluid m-0 p-0 bg-canvas p-2 d-flex flex-column justify-content-center justify-content-md-between align-items-center">
				<div className="row w-100">
					<div className="col-12 col-md-2 m-0 p-0 d-flex justify-content-center">
						<div className="container m-0 p-0 d-flex flex-row justify-content-center justify-content-md-start align-items-center">
							<img src="/Nailr-favicon.png" alt="" width={30} height={30} />
							<h5 className="fw-bold m-0 p-0 p-2">Nailr</h5>
						</div>
					</div>
					<div className="col-12 col-md-8 m-0 p-0 d-flex justify-content-center">
						<div
							className="container m-0 p-0 pt-2 pb-2 d-flex flex-row justify-content-center align-items-center h-100"
							style={{ maxWidth: "400px" }}
						>
							<Link
								className="m-0 p-0 small px-3 text-center w-100"
								style={{
									color: "inherit",
									textDecoration: "none",
									fontSize: "0.7rem",
								}}
							>
								Privacy Policy
							</Link>
							<Link
								className="m-0 p-0 small px-3 text-center w-100"
								style={{
									color: "inherit",
									textDecoration: "none",
									fontSize: "0.7rem",
								}}
							>
								Terms of Service
							</Link>
							<Link
								className="m-0 p-0 small px-3 text-center w-100"
								style={{
									color: "inherit",
									textDecoration: "none",
									fontSize: "0.7rem",
								}}
							>
								Contact
							</Link>
						</div>
					</div>
					<div className="col-12 col-md-2 m-0 p-0 d-flex justify-content-center">
						<div className="container m-0 p-0 pt-2 pb-2 d-flex flex-row justify-content-center justify-content-md-end align-items-center h-100">
							<i
								className="fa-brands fa-instagram px-1"
								style={{ color: "#ff5496" }}
							></i>
							<i
								className="fa-brands fa-facebook px-1"
								style={{ color: "#0966fe" }}
							></i>
							<i
								className="fa-brands fa-youtube px-1"
								style={{ color: "#ff0133" }}
							></i>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Footer;
