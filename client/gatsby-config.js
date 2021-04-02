module.exports = {
	siteMetadata: {
		title: `Sophie Turner photography`,
		description: `Personal photography blog built with GatsbyJS and Strapi`,
		author: `Mathias Handle`,
		url: `https://gatsby-blog-strapi.netlify.app`,
	},
	plugins: [
		`gatsby-plugin-react-helmet`,
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/assets/images`,
			},
		},
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		`gatsby-plugin-image`,
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `gatsby-starter-default`,
				short_name: `starter`,
				start_url: `/`,
				background_color: `#663399`,
				theme_color: `#663399`,
				display: `minimal-ui`,
				icon: `src/assets/images/camera.png`, // This path is relative to the root of the site.
			},
		},
		`gatsby-plugin-sass`,
		{
			resolve: `gatsby-source-strapi`,
			options: {
				//apiURL: `http://localhost:1337`,
				apiURL: `https://gatsby-strapi-mysql.herokuapp.com`,
				queryLimit: 1000,
				contentTypes: [`Blog`, `Category`, `Portfolio-Photo`],
				singleTypes: [`Aboutme`],
			},
		},
		`gatsby-awesome-pagination`,

		// this (optional) plugin enables Progressive Web App + Offline functionality
		// To learn more, visit: https://gatsby.dev/offline
		// `gatsby-plugin-offline`,
	],
};
