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

window.onload = function () {
  initializeTailwind();
  loadComponents();
};