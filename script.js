function initializeTailwind() {
  return { config() { return { theme: { extend: { colors: { navy: '#0a2540', gold: '#c5a05b' } } } }; } };
}

async function loadComponents() {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  const contactPlaceholder = document.getElementById('contact-placeholder');

  try {
    // Load nav, footer, and contact form
    navPlaceholder.innerHTML = await (await fetch('nav.html')).text();
    footerPlaceholder.innerHTML = await (await fetch('footer.html')).text();

    // Only load contact form on homepage (index.html)
    if (contactPlaceholder) {
      contactPlaceholder.innerHTML = await (await fetch('contact-form.html')).text();
    }

    // Highlight active nav link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('text-[#c5a05b]', 'font-semibold');
      }
    });
  } catch (e) {
    console.error('Error loading components:', e);
  }
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('hidden');
}

window.onload = function () {
  initializeTailwind();
  loadComponents();
  console.log('%c✅ Burton Law Offices – All components loaded', 'color:#c5a05b; font-size:14px');
};