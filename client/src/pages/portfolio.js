import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";

import "../assets/styles/portfolio.scss";
import { Layout, Gallery } from "../components";

const PortfolioSite = ({
	data: {
		allStrapiPortfolioPhoto: { photos },
		allStrapiCategory: { allCategories },
	},
}) => {
	const [filter, setFilter] = useState("all");

	//persist styling when de-selecting button
	const applyStyles = (e) => {
		const buttons = Array.from(document.querySelectorAll(".portfolio-header ul li button"));
		const selectedBtn = e.target;
		buttons.forEach((btn) => {
			if (btn.innerText !== selectedBtn.innerText) {
				btn.classList.remove("portfolio-selected");
			}
		});
		selectedBtn.classList.add("portfolio-selected");
	};

	//apply style to default filter
	useEffect(() => {
		const allBtn = Array.from(document.querySelectorAll(".portfolio-header ul li button"))[0];
		allBtn.classList.add("portfolio-selected");
	}, []);

	const filterPhotos = (e) => {
		setFilter(e.target.innerText.toLowerCase());
		applyStyles(e);
	};

	return (
		<Layout>
			<article id="portfolio">
				<header className="portfolio-header">
					<h1>Portfolio</h1>
					<ul>
						{allCategories.map((category, index) => {
							return (
								<li key={index}>
									<button type="button" onClick={(e) => filterPhotos(e)}>
										{category.name}
									</button>
								</li>
							);
						})}
					</ul>
				</header>

				<Gallery photos={photos} filter={filter} />
			</article>
		</Layout>
	);
};

export const getAllPhotos = graphql`
	query GetAllPhotos {
		allStrapiPortfolioPhoto {
			photos: nodes {
				categories {
					name
				}
				photo {
					childImageSharp {
						fluid(maxHeight: 1140) {
							...GatsbyImageSharpFluid
						}
					}
				}
				strapiId
			}
		}
		allStrapiCategory(sort: { fields: name }) {
			allCategories: nodes {
				name
			}
		}
	}
`;

export default PortfolioSite;
