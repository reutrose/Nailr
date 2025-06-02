import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

function FadeInSection({ children, direction = "up", delay = 0 }) {
	const controls = useAnimation();
	const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

	const variants = {
		hidden: {
			opacity: 0,
			x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
			y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
		},
		visible: {
			opacity: 1,
			x: 0,
			y: 0,
			transition: {
				duration: 0.6,
				delay,
			},
		},
	};

	useEffect(() => {
		if (inView) {
			controls.start("visible");
		}
	}, [controls, inView]);

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={controls}
			variants={variants}
		>
			{children}
		</motion.div>
	);
}

export default FadeInSection;
