// SPA Navigation - keeps music playing during page transitions
(function() {
  let currentPage = 'index';
  let pageTemplates = {};

  // Load page templates from the script tag
  function loadTemplates() {
    const templateScript = document.getElementById('page-templates');
    if (templateScript) {
      try {
        const content = templateScript.textContent.trim();
        pageTemplates = JSON.parse(content);
      } catch (e) {
        console.error('Failed to parse page templates:', e);
      }
    }
  }

  // Navigate to a page
  function navigateTo(pageName) {
    if (!pageTemplates[pageName]) {
      console.error('Page not found:', pageName);
      return;
    }

    const pageContent = document.getElementById('page-content');
    if (!pageContent) return;

    // Fade out
    pageContent.style.opacity = '0';

    setTimeout(() => {
      // Update content
      pageContent.innerHTML = pageTemplates[pageName];

      // Reinitialize page scripts
      reinitializeScripts();

      // Reapply language translations
      const currentLang = localStorage.getItem('wedding-language');
      if (currentLang && typeof applyTranslations === 'function') {
        applyTranslations(currentLang);
      }

      // Fade in
      pageContent.style.opacity = '1';

      // Update current page
      currentPage = pageName;

      // Update URL
      history.pushState({ page: pageName }, '', pageName === 'index' ? 'index.html' : `${pageName}.html`);

      // Scroll to top
      window.scrollTo(0, 0);
    }, 200);
  }

  // Reinitialize scripts for the new page
  function reinitializeScripts() {
    // Carousel buttons
    document.querySelectorAll('.carousel-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const track = document.getElementById(btn.dataset.target);
        if (track) {
          const imgWidth = track.querySelector('img')?.offsetWidth + 10;
          if (imgWidth) {
            track.scrollBy({
              left: btn.classList.contains('next') ? imgWidth : -imgWidth,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Image modal
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');

    if (modal && modalImg) {
      document.querySelectorAll('.carousel-track img').forEach(img => {
        img.addEventListener('click', () => {
          modal.classList.add('active');
          modalImg.src = img.src;
        });
      });
    }

    // Modal close button
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });

      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });
    }

    // RSVP form
    const form = document.getElementById('rsvpForm');
    const thankYou = document.getElementById('thankYou');

    if (form && thankYou) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (typeof emailjs !== 'undefined') {
          emailjs.sendForm(
            'service_ua7y4lc',
            'template_gxxt426',
            form,
            'tB83WTwtAL4YZR3ll'
          ).then(
            function () {
              form.style.display = 'none';
              thankYou.style.display = 'block';
            },
            function (error) {
              alert('Failed to send RSVP! Please try again later.');
            }
          );
        }
      });
    }
  }

  // Handle navigation clicks
  function handleClick(e) {
    const link = e.target.closest('a[data-page]');
    if (!link) return;

    e.preventDefault();
    const pageName = link.getAttribute('data-page');
    navigateTo(pageName);
  }

  // Handle browser back/forward
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
      navigateTo(e.state.page);
    }
  });

  // Initialize
  document.addEventListener('DOMContentLoaded', () => {
    loadTemplates();

    // Get initial page from URL
    const path = window.location.pathname;
    const fileName = path.substring(path.lastIndexOf('/') + 1);
    const pageName = fileName.replace('.html', '') || 'index';

    // Load initial page
    if (pageTemplates[pageName] || pageName === 'main') {
      navigateTo(pageName === 'main' ? 'index' : pageName);
    }

    // Set initial history state
    history.replaceState({ page: currentPage }, '', window.location.href);

    // Listen for clicks
    document.addEventListener('click', handleClick);
  });

})();
