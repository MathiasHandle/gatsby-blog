import React from "react";
import PropTypes from "prop-types";

import { Header, Footer } from "./";
import "../assets/styles/layout.scss";

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<div className="container">{children}</div>
			<Footer />
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
