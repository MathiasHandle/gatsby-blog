import React from "react";
import { graphql, Link } from "gatsby";
import Image from "gatsby-image";
import Reactmarkdown from "react-markdown";

import { Layout, Pagination } from "../components";
import "../assets/styles/blog.scss";

//pageContext is a prop that comes from gatsby-awesome-pagination plugin
const BlogListTemplate = ({ data, pageContext }) => {
	const articles = data.allStrapiBlog.nodes;

	return (
		<Layout>
			<h1>Blog</h1>

			<div className="blog-container">
				{articles.map((item, index) => {
					return (
						<article key={index} className="blog-item">
							<Link to={`/blog/${item.slug}`} className="blog-item-header">
								<Image fluid={item.image.childImageSharp.fluid} alt={item.title} />
							</Link>

							<div className="blog-item-content">
								<Link to={`/blog/${item.slug}`}>
									<h2>{item.title}</h2>
								</Link>
								<Reactmarkdown source={item.post.substr(2, 300)} />
							</div>
						</article>
					);
				})}
			</div>

			<Pagination pageContext={pageContext} />
		</Layout>
	);
};

//Getting exact amount of articles per page -> set in gatsby-node.js
export const getArticles = graphql`
	query($skip: Int!, $limit: Int!) {
		allStrapiBlog(sort: { fields: created_at, order: DESC }, skip: $skip, limit: $limit) {
			nodes {
				date
				slug
				title
				post
				image {
					childImageSharp {
						fluid {
							...GatsbyImageSharpFluid
						}
					}
				}
			}
		}
	}
`;

export default BlogListTemplate;
