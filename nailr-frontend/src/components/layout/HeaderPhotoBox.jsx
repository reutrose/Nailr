import "../../assets/css/HeaderPhotoBox.css";

const imagePaths = [
	"/headerCarpenter.jpg",
	"/headerElectrician.jpg",
	"/headerPainter.jpg",
	"/headerWelder.jpg",
];

const HeaderPhotoBox = () => {
	return (
		<div className="header-photo-box">
			{imagePaths.map((src, index) => (
				<div key={index} className="photo-cell">
					<img src={src} alt={`header-${index}`} />
				</div>
			))}
		</div>
	);
};

export default HeaderPhotoBox;
