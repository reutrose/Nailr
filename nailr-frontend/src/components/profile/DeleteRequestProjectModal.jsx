function DeleteRequestProjectModal({ setShowDeleteModal, handleDelete }) {
	return (
		<>
			<div
				className="modal fade show d-block"
				tabIndex="-1"
				style={{
					backgroundColor: "rgba(0,0,0,0.5)",
					position: "fixed",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					zIndex: 1050,
				}}
			>
				<div className="modal-dialog modal-dialog-centered">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title text-danger">Mark as Done</h5>
							<button
								type="button"
								className="btn-close"
								onClick={() => setShowDeleteModal(false)}
							></button>
						</div>
						<div className="modal-body">
							<p>Are you sure you want to mark this project as done?</p>
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
								Yes, Mark as Done
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DeleteRequestProjectModal;
