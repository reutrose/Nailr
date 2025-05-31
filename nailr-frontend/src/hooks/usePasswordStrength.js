import { useState, useCallback } from "react";

const usePasswordStrength = () => {
	const [strength, setStrength] = useState({
		lowercase: false,
		uppercase: false,
		digit: false,
		specialChar: false,
		length: false,
	});

	const evaluate = useCallback((password) => {
		const trimmed = password.trim();
		setStrength({
			lowercase: /[a-z]/.test(trimmed),
			uppercase: /[A-Z]/.test(trimmed),
			digit: /\d/.test(trimmed),
			specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(trimmed),
			length: trimmed.length >= 8,
		});
	}, []);

	return { strength, evaluate };
};

export default usePasswordStrength;
