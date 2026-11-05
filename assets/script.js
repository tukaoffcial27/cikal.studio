// Cikal Studio Labs — shared site behavior

// Nav background on scroll
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile menu
function toggleMenu() {
  document.querySelector('.mobile-menu')?.classList.toggle('open');
  document.querySelector('.mobile-overlay')?.classList.toggle('open');
}
document.querySelector('.mobile-overlay')?.addEventListener('click', toggleMenu);

// Language switch (ID/EN span toggle pages)
function setLang(lang) {
  document.body.classList.remove('lang-id', 'lang-en');
  document.body.classList.add('lang-' + lang);
  document.querySelectorAll('.nav-lang button').forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });
  try { localStorage.setItem('cikal-lang', lang); } catch (e) {}
}
try {
  const saved = localStorage.getItem('cikal-lang');
  if (saved) setLang(saved);
} catch (e) {}

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Blog filter (blog/index.html)
function filterArticles(tag) {
  document.querySelectorAll('.filters button').forEach(b => {
    b.classList.toggle('active', b.dataset.tag === tag);
  });
  document.querySelectorAll('.article-card').forEach(card => {
    const tags = card.dataset.tags || '';
    card.style.display = (tag === 'all' || tags.includes(tag)) ? '' : 'none';
  });
}
