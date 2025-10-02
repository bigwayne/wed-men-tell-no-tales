/**
 * SPA (Single Page Application) Controller
 * Handles page navigation without reloading, keeping music playing
 */

(function() {
  'use strict';

  // State
  let currentPage = null;
  let isTransitioning = false;

  // Get page name from URL or href
  function getPageName(url) {
    if (!url) {
      url = window.location.pathname;
    }
    const fileName = url.split('/').pop().replace('.html', '');
    return fileName === '' || fileName === 'index' ? 'index' : fileName;
  }

  // Load and display a page
  function navigateToPage(pageName, updateHistory = true) {
    if (isTransitioning) return;
    if (currentPage === pageName) return;

    const templateId = `page-${pageName}`;
    const template = document.getElementById(templateId);

    if (!template) {
      console.error(`Template not found: ${templateId}`);
      return;
    }

    isTransitioning = true;
    const content = document.getElementById('app-content');

    // Fade out
    content.classList.add('page-transitioning');

    setTimeout(() => {
      // Clone template content
      const clone = template.content.cloneNode(true);

      // Clear current content
      content.innerHTML = '';

      // Insert new content
      content.appendChild(clone);

      // Force reflow to ensure styles are applied
      void content.offsetHeight;

      // Reinitialize page-specific functionality
      initPageFeatures();

      // Reapply language translations
      const currentLang = localStorage.getItem('wedding-language');
      if (currentLang && typeof applyTranslations === 'function') {
        applyTranslations(currentLang);
      }

      // Update URL if needed (skip if using file:// protocol for local testing)
      if (updateHistory && window.location.protocol !== 'file:') {
        try {
          const url = pageName === 'index' ? 'index.html' : `${pageName}.html`;
          history.pushState({ page: pageName }, '', url);
        } catch (e) {
          console.log('History API not available (local file testing)');
        }
      }

      // Update current page
      currentPage = pageName;

      // Update page title
      document.title = `Wedding of Saul & Itzi${pageName !== 'index' ? ' - ' + pageName.charAt(0).toUpperCase() + pageName.slice(1) : ''}`;

      // Fade in
      setTimeout(() => {
        content.classList.remove('page-transitioning');
        isTransitioning = false;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);

    }, 250);
  }

  // Initialize all page-specific features
  function initPageFeatures() {
    initCarousels();
    initImageModal();
    initRSVPForm();
  }

  // Initialize carousel functionality
  function initCarousels() {
    const carouselButtons = document.querySelectorAll('.carousel-btn');

    carouselButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        const track = document.getElementById(targetId);

        if (track) {
          const firstImg = track.querySelector('img');
          if (firstImg) {
            const scrollAmount = firstImg.offsetWidth + 10; // image width + gap
            const direction = btn.classList.contains('next') ? 1 : -1;

            track.scrollBy({
              left: direction * scrollAmount,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  // Initialize image modal for dress code page
  function initImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.modal-close');

    if (!modal || !modalImg) return;

    // Add click handlers to carousel images
    const carouselImages = document.querySelectorAll('.carousel-track img');
    carouselImages.forEach(img => {
      img.addEventListener('click', () => {
        modal.classList.add('active');
        modalImg.src = img.src;
      });
    });

    // Close modal on X button
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    // Close modal on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  // Initialize RSVP form
  function initRSVPForm() {
    const form = document.getElementById('rsvpForm');
    const thankYou = document.getElementById('thankYou');

    if (!form || !thankYou) return;

    // Make sure thank you is hidden
    thankYou.style.display = 'none';

    // Remove any existing listeners by cloning
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);

    // Add submit handler
    newForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Check if EmailJS is loaded
      if (typeof emailjs === 'undefined') {
        alert('Email service is not loaded. Please refresh the page and try again.');
        return;
      }

      // Send via EmailJS
      emailjs.sendForm(
        'service_ua7y4lc',
        'template_gxxt426',
        newForm,
        'tB83WTwtAL4YZR3ll'
      ).then(
        function() {
          newForm.style.display = 'none';
          thankYou.style.display = 'block';
        },
        function(error) {
          console.error('RSVP submission error:', error);
          alert('Failed to send RSVP. Please try again later or contact us directly.');
        }
      );
    });
  }

  // Handle link clicks for SPA navigation
  function handleLinkClick(e) {
    const link = e.target.closest('a.spa-link');

    if (!link) return;

    const href = link.getAttribute('href');

    // Ignore external links, mailto, etc.
    if (!href ||
        href.startsWith('mailto:') ||
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('#')) {
      return;
    }

    // Prevent default navigation
    e.preventDefault();

    // Navigate via SPA
    const pageName = getPageName(href);
    navigateToPage(pageName);
  }

  // Handle browser back/forward buttons
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
      navigateToPage(e.state.page, false);
    } else {
      // No state, get from URL
      const pageName = getPageName();
      navigateToPage(pageName, false);
    }
  });

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Get initial page from URL
    const initialPage = getPageName();

    // Load initial page
    navigateToPage(initialPage, false);

    // Set initial history state (skip if using file:// protocol for local testing)
    if (window.location.protocol !== 'file:') {
      try {
        history.replaceState({ page: initialPage }, '', window.location.href);
      } catch (e) {
        console.log('History API not available (local file testing)');
      }
    }

    // Listen for all clicks on the document
    document.addEventListener('click', handleLinkClick);

    console.log('SPA initialized. Music will continue playing during navigation! 🎵');
  });

})();
