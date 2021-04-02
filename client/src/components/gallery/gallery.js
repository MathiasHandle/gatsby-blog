import React, { useState, useEffect } from "react";
import Image from "gatsby-image";

import "../../assets/styles/portfolio.scss";
import { Lightbox } from "../";

const Gallery = ({ photos, filter }) => {
	const [filteredPhotos, setFilteredPhotos] = useState([]);

	//Change state on every filter change
	const getFilteredPhotos = (photos, filter) => {
		let filtered = [];
		filtered = photos.filter((photo) => photo.categories.some((category) => category.name === filter));
		filtered.length === 0 && filter === "all" ? setFilteredPhotos(photos) : setFilteredPhotos(filtered);
	};

	useEffect(() => {
		getFilteredPhotos(photos, filter);
	}, [filter, photos]);

	//Initial fill from props upon rendering component
	useEffect(() => setFilteredPhotos(photos), [photos]);

	return (
		<main id="portfolio-gallery" className="portfolio-gallery">
			{filteredPhotos.map((item) => {
				return (
					<Image
						key={item.strapiId}
						fluid={item.photo.childImageSharp.fluid}
						alt={item.categories[0].name}
						className={`${item.strapiId}`}
					/>
				);
			})}
			<Lightbox filteredPhotos={filteredPhotos} />
		</main>
	);
};

export default Gallery;
