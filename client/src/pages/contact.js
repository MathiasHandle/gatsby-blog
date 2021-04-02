import React, { useState } from "react";

import { Layout } from "../components";
import "../assets/styles/contact.scss";

const ContactPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setName("");
		setEmail("");
		setMessage("");
	};

	const animateForm = (e) => {
		const btn = e.target;
		const modal = document.querySelector(".contact-modal");
		btn.classList.add("btn-animated");
		modal.classList.add("contact-modal-active");
		setTimeout(() => {
			btn.classList.remove("btn-animated");
		}, 300);
		setTimeout(() => {
			modal.classList.remove("contact-modal-active");
		}, 2000);
	};

	return (
		<Layout>
			<article id="contact">
				<h1>contact me</h1>
				<p>
					Got any business proposals, or want to ask me something? Leave me a message bellow. I'll gladly answer all
					your questions.
				</p>

				<h3>Services I'm availible for</h3>
				<ul>
					<li>
						<p>Portraits</p>
					</li>
					<li>
						<p>Photo retouchment</p>
					</li>
					<li>
						<p>Product photograpy and branding</p>
					</li>
					<li>
						<p>Tutoring</p>
					</li>
				</ul>

				<form action="submit" onSubmit={(e) => handleSubmit(e)}>
					<div className="contact-modal">
						<p>Thank you for your message, I will reply ASAP!</p>
					</div>

					<h2>Contact formular</h2>
					<input type="text" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
					<input
						type="text"
						placeholder="Your e-mail adress"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<textarea
						cols="30"
						rows="10"
						placeholder="What would you like to know?"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
					<button type="submit" className="btn" onClick={(e) => animateForm(e)}>
						Send
					</button>
				</form>
			</article>
		</Layout>
	);
};

export default ContactPage;
