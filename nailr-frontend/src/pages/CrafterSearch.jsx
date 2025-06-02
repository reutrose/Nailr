import { useState, useEffect } from "react";
import { professions } from "../services/businessService";
import { Eraser } from "lucide-react";

function CrafterSearch({ onFilter }) {
	const [form, setForm] = useState({
		search: "",
		profession: "",
		location: "",
		skills: "",
	});
	const [shouldFilter, setShouldFilter] = useState(false);

	useEffect(() => {
		if (!shouldFilter) return;

		const delayDebounce = setTimeout(() => {
			onFilter(form);
		}, 300);

		return () => clearTimeout(delayDebounce);
	}, [form, shouldFilter, onFilter]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
		setShouldFilter(true);
	};

	return (
		<form className="row g-2 align-items-end mb-4">
			<div className="col-12 col-md-3">
				<label className="form-label">Search</label>
				<input
					type="text"
					name="search"
					value={form.search}
					onChange={handleChange}
					className="form-control"
					placeholder="Name, skills, or location"
				/>
			</div>
			<div className="col-6 col-md-3">
				<label className="form-label">Profession</label>
				<select
					name="profession"
					value={form.profession}
					onChange={handleChange}
					className="form-select"
				>
					{professions &&
						professions.length &&
						professions.map((profession, index) => {
							return <option key={index}>{profession}</option>;
						})}
				</select>
			</div>
			<div className="col-6 col-md-3">
				<label className="form-label">Location</label>
				<input
					type="text"
					name="location"
					value={form.location}
					onChange={handleChange}
					className="form-control"
					placeholder="City or area"
				/>
			</div>
			<div
				className="col-12 col-md-3"
				onClick={() => {
					setForm({ search: "", profession: "", location: "", skills: "" });
				}}
			>
				<button className="btn btn-outline-accent-red w-100">
					<Eraser size={16} /> Clear
				</button>
			</div>
		</form>
	);
}

export default CrafterSearch;
