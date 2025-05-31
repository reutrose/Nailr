function ImageViewModal({ imageUrl, setImageSelected }) {
	if (!imageUrl) return null;

	return (
		<div
			className="modal fade show d-block"
			tabIndex="-1"
			style={{
				backgroundColor: "rgba(0, 0, 0, 0.8)",
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 1055,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div
				style={{
					position: "relative",
					width: "100vw",
					height: "100vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<img
					src={imageUrl}
					alt="Preview"
					className="img-fluid rounded shadow"
					style={{ maxHeight: "90vh", maxWidth: "90vw" }}
				/>
				<button
					onClick={() => {
						setImageSelected(false);
					}}
					className="btn btn-light position-absolute top-0 end-0 m-2"
					style={{ fontSize: "1.5rem", lineHeight: "1rem" }}
				>
					&times;
				</button>
			</div>
		</div>
	);
}

export default ImageViewModal;
