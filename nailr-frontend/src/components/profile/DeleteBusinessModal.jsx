function DeleteBusinessModal({ setShowDeleteModal, handleDelete }) {
	return (
		<div
			className="modal fade show"
			tabIndex="-1"
			role="dialog"
			style={{
				display: "block",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
				position: "fixed",
				top: 0,
				left: 0,
				width: "100vw",
				height: "100vh",
				zIndex: 1050,
				overflow: "auto",
			}}
		>
			<div className="modal-dialog modal-dialog-centered" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title text-danger">Delete Business</h5>
						<button
							type="button"
							className="btn-close"
							onClick={() => setShowDeleteModal(false)}
						></button>
					</div>
					<div className="modal-body">
						<p>
							Are you sure you want to delete this business? This action cannot
							be undone.
						</p>
					</div>
					<div className="modal-footer">
						<button
							type="button"
							className="btn btn-secondary"
							onClick={() => setShowDeleteModal(false)}
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-danger"
							onClick={handleDelete}
						>
							Yes, I'm sure
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DeleteBusinessModal;
