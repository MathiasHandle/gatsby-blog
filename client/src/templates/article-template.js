import React, { useEffect } from "react";
import { graphql, Link } from "gatsby";
import Image from "gatsby-image";
import ReactMarkdown from "react-markdown"; //Transforming mark down to styled text

import "../assets/styles/article.scss";
import { Layout } from "../components";
import { ImArrowUp } from "react-icons/im";

const ArticleTemplate = ({
	data: {
		strapiBlog: {
			title,
			date,
			post,
			image: {
				childImageSharp: { fluid },
			},
		},
		allStrapiBlog: { nodes },
	},
}) => {
	const scrollTop = () => {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0;
	};

	useEffect(() => {
		const sideArrow = document.querySelector(".article-arrow");
		const totalHeight = document.body.clientHeight;
		document.addEventListener("scroll", () => {
			const scroll = window.scrollY;

			if (scroll > totalHeight * 0.3) {
				if (sideArrow.classList.contains("arrow-show")) {
					return;
				} else {
					sideArrow.classList.add("arrow-show");
				}
			} else {
				if (sideArrow.classList.contains("arrow-show")) {
					sideArrow.classList.remove("arrow-show");
				} else {
					return;
				}
			}
		});
	}, []);

	return (
		<Layout>
			<main id="article">
				<article>
					<section className="article-header">
						<Image fluid={fluid} />
						<time>{date}</time>
					</section>

					<section className="article-content">
						<h1>{title}</h1>
						<ReactMarkdown source={post} />
					</section>
				</article>

				<aside>
					<div className="article-aside-wrapper">
						<nav className="article-nav">
							<ul>
								<h3>Just came out</h3>
								{nodes.map((item) => (
									<li>
										<Link to={`/blog/${item.slug}`}>{item.title}</Link>
									</li>
								))}
							</ul>
						</nav>

						<div className="article-arrow">
							<ImArrowUp onClick={scrollTop} />
						</div>
					</div>
				</aside>
			</main>
		</Layout>
	);
};

export const query = graphql`
	query GetSingleArticle($slug: String) {
		strapiBlog(slug: { eq: $slug }) {
			title
			date
			post
			image {
				childImageSharp {
					fluid(maxWidth: 1140, maxHeight: 500, quality: 100) {
						...GatsbyImageSharpFluid
					}
				}
			}
		}
		allStrapiBlog(sort: { fields: created_at, order: DESC }, limit: 3) {
			nodes {
				slug
				title
			}
		}
	}
`;

export default ArticleTemplate;
