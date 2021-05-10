import React, { useState, useEffect, useCallback } from "react";

import "../../assets/styles/lightbox.scss";

const Lightbox = ({ filteredPhotos }) => {
	const [currentPhotoId, setCurrentPhotoId] = useState(null);
	const currentPhoto = filteredPhotos.filter((photo) => photo.strapiId === currentPhotoId)[0];

	//Select image on click
	const selectImage = useCallback(
		(e) => {
			//Closing lightbox when clicking on opened image
			if (e.target.id === "lightbox-image") {
				setCurrentPhotoId(null);
				return;
			}
			//Selecting image, or closing lightbox when clicking outside of opened image
			//gatsby-image plugin doesnt allow custom data- attribute, so Ive set strapiID as a class
			const divId = parseInt(e.target.parentElement.parentElement.className.split(" ")[0]);
			const imgSelected = e.target.parentElement.parentElement.className.includes("gatsby-image-wrapper");
			imgSelected && isNaN(divId) === false ? setCurrentPhotoId(divId) : setCurrentPhotoId(null);
		},
		[setCurrentPhotoId]
	);

	useEffect(() => {
		const gallery = document.getElementById("portfolio-gallery");
		gallery.addEventListener("click", selectImage);
		return () => {
			gallery.removeEventListener("click", selectImage);
		};
	}, [selectImage]);

	//Change image on keypress
	const changeImage = useCallback(
		(e) => {
			if (
				document.location.pathname !== "/portfolio" ||
				document.location.pathname !== "/portfolio/" ||
				currentPhotoId === null
			)
				return;
			const key = e.keyCode;
			const indexOf = filteredPhotos.indexOf(currentPhoto);
			//Close image
			if (key === 27) {
				setCurrentPhotoId(null);
			}
			//Next image
			else if (key === 39) {
				//if currently selected img is last one in an array
				if (indexOf === filteredPhotos.length - 1) {
					setCurrentPhotoId(filteredPhotos[0].strapiId);
				} else {
					setCurrentPhotoId(filteredPhotos[indexOf + 1].strapiId);
				}
			}
			//Prev image
			else if (key === 37) {
				//if currently selected img is first one in an array
				if (indexOf === 0) {
					setCurrentPhotoId(filteredPhotos.slice(-1)[0].strapiId);
					//setCurrentPhotoId(getFirstLastElements(filteredPhotos)[1]);
				} else {
					setCurrentPhotoId(filteredPhotos[indexOf - 1].strapiId);
				}
			}
		},
		[setCurrentPhotoId, currentPhotoId, filteredPhotos, currentPhoto]
	);

	useEffect(() => {
		document.addEventListener("keydown", changeImage);
		return () => {
			document.removeEventListener("keydown", changeImage);
		};
	}, [changeImage, currentPhotoId]);

	return currentPhotoId === null ? (
		<div id="lightbox" className="lightbox">
			<h4>Nothing to display</h4>
		</div>
	) : (
		<div id="lightbox" className="lightbox lightbox-active">
			<img
				src={currentPhoto.photo.childImageSharp.fluid.src}
				alt={currentPhoto.categories[0].name}
				id="lightbox-image"
			/>
		</div>
	);
};

export default Lightbox;
