import "../assets/css/pageNotFound.css";

function Page404() {
	return (
		<>
			<div className="not-found-page">
				<div className="not-found-container">
					<div>
						<h2>404 Page Not Found</h2>
					</div>
					<div className="not-found-message">
						<div>
							<h4>🔨 Whoops! This Page Got Lost in the Workshop</h4>
						</div>
						<div>
							<p className="not-found-paragraph">
								Looks like this page took a wrong turn at the glue gun and never
								made it back. Maybe it&apos;s still drying, maybe it&apos;s
								under a pile of sawdust… Either way, it&apos;s not here.
							</p>
						</div>
						<div>
							<p>Try one of these instead:</p>
							<ul>
								<li>🔍 Double-check the URL</li>
								<li>🧶 Go back to the homepage and stitch a new path</li>
								<li>🛠️ Or grab a coffee and pretend this never happened</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Page404;
