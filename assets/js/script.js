// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');
if (navToggle && siteNav) {
	navToggle.addEventListener('click', () => {
		const open = siteNav.classList.toggle('open');
		navToggle.setAttribute('aria-expanded', String(open));
	});
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
	link.addEventListener('click', (e) => {
		const targetId = link.getAttribute('href');
		if (!targetId || targetId === '#') return;
		const target = document.querySelector(targetId);
		if (target) {
			e.preventDefault();
			target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			if (siteNav && siteNav.classList.contains('open')) {
				siteNav.classList.remove('open');
				navToggle?.setAttribute('aria-expanded', 'false');
			}
		}
	});
});

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
	const year = new Date().getFullYear();
	yearEl.textContent = String(year);
}

// Basic client-side validation + EmailJS submission for contact form
const form = document.querySelector('.contact-form');
if (form) {
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const nameInput = /** @type {HTMLInputElement} */ (form.querySelector('#name'));
		const emailInput = /** @type {HTMLInputElement} */ (form.querySelector('#email'));
		const messageInput = /** @type {HTMLTextAreaElement} */ (form.querySelector('#message'));

		if (emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
			alert('Please enter a valid email address.');
			emailInput.focus();
			return;
		}

		try {
			// Initialize EmailJS if available
			// eslint-disable-next-line no-undef
			if (window.emailjs && typeof emailjs.init === 'function') {
				// Read config from data attributes
				const serviceId = form.getAttribute('data-emailjs-service') || '';
				const templateId = form.getAttribute('data-emailjs-template') || '';
				const publicKey = form.getAttribute('data-emailjs-public') || '';
				if (!serviceId || !templateId || !publicKey) {
					throw new Error('Email service is not configured.');
				}
				// eslint-disable-next-line no-undef
				emailjs.init(publicKey);
				const templateParams = {
					from_name: nameInput?.value || 'Website Visitor',
					from_email: emailInput?.value || 'no-reply@innovaitionedge.com',
					message: messageInput?.value || '',
					recipient: 'contact@innovaitionedge.com'
				};
				// eslint-disable-next-line no-undef
				await emailjs.send(serviceId, templateId, templateParams);
				alert('Thanks! Your message has been sent.');
				form.reset();
				return;
			}
			throw new Error('EmailJS not available');
		} catch (err) {
			console.error(err);
			alert('Sorry, there was a problem sending your message. Please try again later.');
		}
	});
}


