const path = require("path")
const { paginate } = require("gatsby-awesome-pagination")

//Getting blog data from CMS
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const articles = await graphql(`
    query GetAllArticles {
      allStrapiBlog {
        nodes {
          slug
        }
      }
    }
  `)

  //Creating pages for blog list -> url.com/blog/page-1
  paginate({
    createPage, // The Gatsby `createPage` function
    items: articles.data.allStrapiBlog.nodes, // An array of objects
    itemsPerPage: 6,
    pathPrefix: "/blog", // Creates pages like `/blog`, `/blog/2`, etc
    component: path.resolve("src/templates/blogList-template.js"), // Just like `createPage()`
  })

  //Creating pages for each article dynamically -> url.com/blog/5-tips-and-tricks
  //Context passes data (slug, id...) for each individual page to query specific data (image, post, headings....) to that page
  articles.data.allStrapiBlog.nodes.forEach(article => {
    createPage({
      path: `/blog/${article.slug}`,
      component: path.resolve(`src/templates/article-template.js`),
      context: {
        slug: article.slug,
      },
    })
  })
}
