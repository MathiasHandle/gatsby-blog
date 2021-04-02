import React from "react"
import { Link } from "gatsby"

import "../assets/styles/pagination.scss"

const Pagination = ({ pageContext }) => {
  const { previousPagePath, nextPagePath } = pageContext

  return (
    <nav className="pagination">
      {previousPagePath && (
        <Link className="btn" to={previousPagePath}>
          Previous
        </Link>
      )}

      {nextPagePath && (
        <Link className="btn" to={nextPagePath}>
          Next
        </Link>
      )}
    </nav>
  )
}

export default Pagination
