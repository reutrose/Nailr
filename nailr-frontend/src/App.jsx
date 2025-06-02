import { HashRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import DesktopNavbar from "./components/layout/DesktopNavbar";
import Footer from "./components/layout/Footer";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import "./assets/scss/main.scss";
import MobileNavbar from "./components/layout/MobileNavbar";

function App() {
	return (
		<div
			className="app-wrapper container-fluid m-0 p-0 d-flex flex-column justify-content-between"
			style={{ maxWidth: "100vw", overflowX: "hidden", overflowY: "auto" }}
		>
			<Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
				<AuthProvider>
					<div className="app-header">
						<div className="d-none d-md-block">
							<DesktopNavbar />
						</div>
						<div className="d-md-none">
							<MobileNavbar />
						</div>
					</div>
					<main className="app-main container-fluid d-flex flex-column justify-content-between m-0 bg-background px-0">
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
