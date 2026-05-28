function initializeTailwind() {
  return { config() { return { theme: { extend: { colors: { navy: '#0a2540', gold: '#c5a05b' } } } }; } };
}

async function loadComponents() {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  const contactPlaceholder = document.getElementById('contact-placeholder');

  try {
    navPlaceholder.innerHTML = await (await fetch('components/header.html')).text();
    footerPlaceholder.innerHTML = await (await fetch('components/footer.html')).text();

    if (contactPlaceholder) {
      contactPlaceholder.innerHTML = await (await fetch('components/contact-form.html')).text();
    }

    // Local development fix
    const isLocalDev = window.location.protocol === 'file:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (isLocalDev) {
      document.querySelectorAll('nav a').forEach(link => {
        let href = link.getAttribute('href');
        if (href && !href.startsWith('http') && !href.startsWith('#') && !href.endsWith('.html') && href !== 'index.html') {
          link.setAttribute('href', href + '.html');
        }
      });
    }

    // Active link highlighting
    let current = window.location.pathname.split('/').pop() || '';
    current = current.replace('.html', '');
    if (current === '' || current === 'index') current = 'index.html';

    document.querySelectorAll('nav a').forEach(link => {
      let href = link.getAttribute('href').replace('.html', '');
      if (href === current || (href === 'index' && current === 'index')) {
        link.classList.add('text-[#c5a05b]', 'font-semibold');
      }
    });

    // Attach smooth scrolling to anchor links (e.g. #contact)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const hash = link.getAttribute('href');
        const targetId = hash.substring(1);

        // Only handle internal anchors that exist on the page
        if (document.getElementById(targetId)) {
          e.preventDefault();
          smoothScrollTo(targetId);
        }
      });
    });

  } catch (e) {

    console.error('Error loading components:', e);
  } finally {
    // Always make the page visible, even if something fails
    document.body.classList.add('loaded');
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  alert("Thank you!\n\nThe contact form is not implemented yet.\n\nIn a real website this would send your message to Anthony Burton.");
  e.target.reset();
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) menu.classList.toggle('open');
}

/**
 * Smoothly scroll to an element, accounting for the sticky navigation height.
 */
function smoothScrollTo(targetId) {
  const target = document.getElementById(targetId);
  if (!target) return;

  const nav = document.querySelector('nav');
  const navHeight = nav ? nav.offsetHeight : 80;

  const targetPosition = target.getBoundingClientRect().top + window.scrollY;
  const offsetPosition = targetPosition - navHeight - 16; // small extra padding

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });

  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu && mobileMenu.classList.contains('open')) {
    mobileMenu.classList.remove('open');
  }
}

window.onload = function () {
  initializeTailwind();
  loadComponents();
};

// Also attach smooth scroll handlers to any existing # anchors on the page
// (useful for hero buttons on index.html before components finish loading)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href').substring(1);
      if (document.getElementById(targetId)) {
        e.preventDefault();
        setTimeout(() => smoothScrollTo(targetId), 10);
      }
    });
  });
});
