import { HashRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import "./assets/scss/main.scss";

function App() {
	return (
		<div
			className="root-css-box container-fluid m-0 p-0 d-flex flex-column justify-content-between"
			style={{ maxWidth: "100vw", overflow: "hidden" }}
		>
			<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
				<AuthProvider>
					<div
						style={{
							minHeight: "70px",
							width: "100vw",
							position: "fixed",
							zIndex: "1000",
							boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
						}}
					>
						<Navbar />
					</div>
					<main
						className="container-fluid d-flex flex-column justify-content-between m-0 bg-background px-0"
						style={{ minHeight: "100vh", paddingTop: "70px" }}
					>
						<AppRouter />
						<div className="container-fluid m-0 p-0">
							<Footer />
						</div>
					</main>
				</AuthProvider>
			</Router>
		</div>
	);
}

export default App;
