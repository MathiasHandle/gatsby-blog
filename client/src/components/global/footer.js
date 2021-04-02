import React, { useState } from "react";

import "../../assets/styles/footer.scss";
import { ImFacebook, ImInstagram, ImTwitter } from "react-icons/im";

const Footer = () => {
	const [email, setEmail] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setEmail("");
	};

	const animateButton = (e) => {
		const btn = e.target;
		btn.classList.add("btn-animated");
		setTimeout(() => {
			btn.classList.remove("btn-animated");
		}, 300);
	};

	return (
		<footer id="footer">
			<p>Ⓒ {new Date().getFullYear().toString()}</p>

			<form className="footer-newsletter" onSubmit={(e) => handleSubmit(e)}>
				<label htmlFor="e-mail">Subscribe to my newsletter</label>
				<div>
					<input
						id="e-mail"
						type="text"
						placeholder="Your e-mail address"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<button type="submit" className="btn footer-btn" onClick={(e) => animateButton(e)}>
						Subscribe
					</button>
				</div>
			</form>

			<nav className="footer-socials">
				<ul>
					<li>
						<a href="https://facebook.com">
							<ImFacebook />
						</a>
					</li>
					<li>
						<a href="https://instagram.com">
							<ImInstagram />
						</a>
					</li>
					<li>
						<a href="https://twitter.com">
							<ImTwitter />
						</a>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
