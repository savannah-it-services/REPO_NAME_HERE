function initializeTailwind() {
  return { config() { return { theme: { extend: { colors: { navy: '#0a2540', gold: '#c5a05b' } } } }; } };
}

async function loadComponents() {
  const navPlaceholder = document.getElementById('nav-placeholder');
  const footerPlaceholder = document.getElementById('footer-placeholder');
  const contactPlaceholder = document.getElementById('contact-placeholder');

  try {
    navPlaceholder.innerHTML = await (await fetch('nav.html')).text();
    footerPlaceholder.innerHTML = await (await fetch('footer.html')).text();

    if (contactPlaceholder) {
      contactPlaceholder.innerHTML = await (await fetch('contact-form.html')).text();
    }

    // Active link highlighting
    let current = window.location.pathname.split('/').pop() || 'index';
    current = current.replace('.html', '');
    if (current === '') current = 'index';

    document.querySelectorAll('nav a').forEach(link => {
      const href = link.getAttribute('href').replace('.html', '');
      if (href === current) {
        link.classList.add('text-[#c5a05b]', 'font-semibold');
      }
    });
  } catch (e) {
    console.error('Error loading components:', e);
  }
}

// Updated smooth toggle
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('open');
  }
}

function handleContactSubmit(e) {
  e.preventDefault();
  alert("Thank you!\n\nThe contact form is not implemented yet.\n\nIn a real website this would send your message to Anthony Burton.");
  e.target.reset();
}

window.onload = function () {
  initializeTailwind();
  loadComponents();
  console.log('%c✅ Burton Law Offices – Smooth mobile menu active', 'color:#c5a05b; font-size:14px');
};