import React, { useEffect } from "react";
import { Link } from "gatsby";

import "../../assets/styles/header.scss";
import { BiMenu } from "react-icons/bi";

const Header = () => {
	//Header background-color and scroll effect
	useEffect(() => {
		const header = document.getElementById("header");
		const location = document.location.pathname;
		window.addEventListener("scroll", () => {
			window.scrollY > 1 ? header.classList.add("header-scrolled") : header.classList.remove("header-scrolled");
		});
		if (location === "/") {
			header.classList.add("header-home");
		} else {
			header.classList.remove("header-home");
		}
	}, []);

	//Header text color
	useEffect(() => {
		const headerLinks = Array.from(document.querySelectorAll("#header ul li"));
		let location = document.location.pathname.split("/")[1];
		if (location === "") location = "home";
		headerLinks.forEach((link) => {
			if (link.innerText.toLowerCase() !== location) {
				link.classList.remove("header-active");
			} else {
				link.classList.add("header-active");
			}
		});
	}, []);

	//Hide or show menu
	const handleMenu = () => {
		const header = document.querySelector(".header > ul");
		header.classList.toggle("show-menu");
	};

	return (
		<nav id="header" className="header">
			<Link to="/" className="logo">
				<h3>sophie turner</h3>
			</Link>

			<span className="hamburger-menu">
				<BiMenu className="hamburger-menu-icon" onClick={handleMenu} />
			</span>

			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/blog">Blog</Link>
				</li>
				<li>
					<Link to="/portfolio">Portfolio</Link>
				</li>
				<li>
					<Link to="/contact">Contact</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Header;
