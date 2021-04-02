import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";

import { SEO, Header } from "../components";

const getBackground = graphql`
	{
		bg1: file(relativePath: { eq: "bg.jpg" }) {
			childImageSharp {
				fluid(quality: 100, maxWidth: 1920) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`;

const IndexPage = () => {
	const data = useStaticQuery(getBackground);

	return (
		<BackgroundImage id="home" Tag="section" fluid={data.bg1.childImageSharp.fluid} backgroundColor={`#040e18`}>
			<Header />
			<SEO title="Home" />
		</BackgroundImage>
	);
};

export default IndexPage;
