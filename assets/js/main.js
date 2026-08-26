/**
 * TARUN KUMAR BAGADI — PORTFOLIO
 * Active nav + Scroll animations + Form + Projects toggle
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollAnimations();
  initFormHandling();
  initViewMoreProjects();
});

/* ── NAVIGATION ── */
function initNavigation() {
  const navbar  = document.querySelector('.navbar');
  const toggle  = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Scrolled state + active section highlight
  function onScroll() {
    const scrolled = window.scrollY > 60;
    navbar.classList.toggle('scrolled', scrolled);

    // Active nav link
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      toggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}

/* ── SCROLL ANIMATIONS ── */
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    }),
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

/* ── CONTACT FORM ── */
function initFormHandling() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const status = document.getElementById('formStatus');
    const btn    = form.querySelector('button[type="submit"]');
    const name   = form.querySelector('#name').value;
    const email  = form.querySelector('#email').value;
    const msg    = form.querySelector('#message').value;

    btn.textContent = 'Opening email…';
    btn.disabled = true;

    // Reliable mailto fallback — always works, no server needed
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(`${msg}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:tarunkumarmpc@gmail.com?subject=${subject}&body=${body}`;

    status.textContent = 'Opening your email client…';
    status.className = 'form-status success';
    form.reset();

    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
      setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 5000);
    }, 1500);
  });
}

/* ── VIEW MORE PROJECTS ── */
function initViewMoreProjects() {
  const btn     = document.getElementById('viewMoreBtn');
  const section = document.getElementById('moreProjectsSection');
  if (!btn || !section) return;

  btn.addEventListener('click', () => {
    const active = section.classList.toggle('active');
    btn.classList.toggle('active', active);
    btn.querySelector('span').textContent = active
      ? 'Hide Additional Implementations'
      : 'View Additional Implementations';
    btn.setAttribute('aria-expanded', active);
    if (active) setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  });
}
