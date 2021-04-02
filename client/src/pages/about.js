import React from "react";
import { graphql } from "gatsby";
import ReactMarkdown from "react-markdown";
import { GatsbyImage } from "gatsby-plugin-image";

import "../assets/styles/about.scss";
import { Layout } from "../components";

const AboutPage = ({ data }) => {
	return (
		<Layout>
			<article id="about">
				<h1>about me</h1>
				<section>
					<GatsbyImage image={data.strapiAboutme.portrait.childImageSharp.gatsbyImageData} alt="Sophie Turner" />

					<div>
						<ReactMarkdown source={data.strapiAboutme.content} />
					</div>
				</section>

				<div className="about-gallery">
					{data.allStrapiPortfolioPhoto.nodes.map((image, index) => (
						<GatsbyImage image={image.photo.childImageSharp.gatsbyImageData} key={index} alt="about me photos" />
					))}
				</div>
			</article>
		</Layout>
	);
};

export const getAboutme = graphql`
	query MyQuery {
		strapiAboutme {
			content
			portrait {
				childImageSharp {
					gatsbyImageData
				}
			}
		}
		allStrapiPortfolioPhoto(limit: 3, skip: 5) {
			nodes {
				photo {
					childImageSharp {
						gatsbyImageData
					}
				}
			}
		}
	}
`;

export default AboutPage;
