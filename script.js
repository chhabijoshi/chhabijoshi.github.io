/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursorFollower');
 
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
 
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX - 5 + 'px';
  cursor.style.top  = mouseY - 5 + 'px';
});
 
function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX - 18 + 'px';
  follower.style.top  = followerY - 18 + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();
 
// grow cursor on hover
document.querySelectorAll('a, button, .skill-card, .project-card, .info-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2)';
    follower.style.transform = 'scale(1.4)';
    follower.style.opacity = '0.2';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    follower.style.transform = 'scale(1)';
    follower.style.opacity = '0.5';
  });
});
 
/* ── NAV SCROLL ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});
 
/* ── MOBILE MENU ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
 
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
 
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});
 
/* ── SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
 
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
 
/* ── COUNTER ANIMATION ── */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
 
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
 
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));
 
/* ── ACTIVE NAV LINK ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
 
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.style.color = '');
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.style.color = 'var(--accent)';
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });
 
sections.forEach(s => sectionObserver.observe(s));
 
/* ── CONTACT FORM → GMAIL ── */
const sendBtn = document.getElementById('sendGmail');
if (sendBtn) {
  sendBtn.addEventListener('click', () => {
    const name    = document.getElementById('cf-name').value.trim();
    const email   = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();
    const errEl   = document.getElementById('form-error');
 
    if (!name || !email || !message) {
      errEl.textContent = '⚠ Please fill in your name, email, and message.';
      return;
    }
 
    errEl.textContent = '';
 
    const body = `Hi Chhabi Raj,\n\nMy name is ${name} and my email is ${email}.\n\n${message}\n\nLooking forward to hearing from you!`;
 
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=chhabiraj100@gmail.com&su=${encodeURIComponent(subject || 'Project Inquiry')}&body=${encodeURIComponent(body)}`;
 
    window.open(gmailUrl, '_blank');
  });
}
 

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});