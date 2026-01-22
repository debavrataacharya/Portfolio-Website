// ===== Prevent browser restoring scroll on refresh =====
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('load', () => window.scrollTo(0, 0));

/* ===== Fade-Up Animation (repeatable) ===== */
const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
      else entry.target.classList.remove('show');
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

/* ===== Scroll Spy ===== */
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('header nav a');
const sections = document.querySelectorAll('section[id]');

function setActive(id) {
  navLinks.forEach(link => link.classList.toggle('active', link.hash === '#' + id));
}

const sectionObserver = new IntersectionObserver(
  entries => { entries.forEach(entry => { if(entry.isIntersecting) setActive(entry.target.id); }); },
  { rootMargin: `-${header.offsetHeight}px 0px -40% 0px`, threshold: 0.25 }
);

sections.forEach(section => sectionObserver.observe(section));

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

/* ===== Mobile Menu Toggle ===== */
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('header nav');
menuToggle.addEventListener('click', () => nav.classList.toggle('show'));

// ==============================
// EmailJS Contact Form Script
// ==============================

// Initialize EmailJS with your public key
emailjs.init("GBuToWQHfBa9ECi1B"); // <-- replace with your EmailJS public key

// Get the form and status element
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");


contactForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const submitBtn = contactForm.querySelector("button[type='submit']");

  // Disable the button and show spinner
  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Sending <span class="spinner"></span>';
  formStatus.textContent = ''; // clear previous status

  emailjs.sendForm("service_7ho437r", "template_ggbqv3t", this)
    .then(() => {
      // Success
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      formStatus.style.color = 'green';
      formStatus.textContent = 'Message sent successfully!';
      contactForm.reset();
    })
    .catch((error) => {
      // Failure
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
      formStatus.style.color = 'red';
      formStatus.textContent = 'Failed to send message. Please try again.';
      console.error("EmailJS error:", error);
    });
});



