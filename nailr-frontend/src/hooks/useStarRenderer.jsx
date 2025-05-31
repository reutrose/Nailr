import { useCallback } from "react";

const useStarRenderer = () => {
	const renderStars = useCallback((rating, options = {}) => {
		const { className = "", highlightColor = "" } = options;

		const stars = [];

		for (let i = 1; i <= 5; i++) {
			if (rating >= i) {
				stars.push(
					<i
						key={i}
						className={`fa-solid fa-star ${className}`}
						style={{
							color: highlightColor,
							fontSize: "clamp(0.5rem, 0.3846rem + 0.6154vw, 1rem)",
						}}
					></i>
				);
			} else if (rating >= i - 0.5) {
				stars.push(
					<i
						key={i}
						className={`fa-solid fa-star-half-stroke ${className}`}
						style={{
							color: highlightColor,
							fontSize: "clamp(0.5rem, 0.3846rem + 0.6154vw, 1rem)",
						}}
					></i>
				);
			} else {
				stars.push(
					<i
						key={i}
						className={`fa-regular fa-star ${className}`}
						style={{
							color: highlightColor,
							fontSize: "clamp(0.5rem, 0.3846rem + 0.6154vw, 1rem)",
						}}
					></i>
				);
			}
		}

		return stars;
	}, []);

	return { renderStars };
};

export default useStarRenderer;
