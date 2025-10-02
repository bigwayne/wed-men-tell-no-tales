// Language translations
const translations = {
  en: {
    // Index page
    summons: "Ye be summoned to make merry",
    address1: "The Doyle",
    address2: "418 W Mesquite Ave",
    address3: "Las Vegas, NV 89106",

    // Navigation
    navHome: "Home",
    navRsvp: "Rsvp",
    navDressCode: "Dress Code",
    navDonations: "Donations",

    // RSVP page
    rsvpTitle: "RSVP",
    eventNotice: "This is a 21+ Event",
    unableToAttend: "If you are unable to attend, please send us a message by clicking the ? button on the bottom right of the screen",
    namePlaceholder: "Your Name",
    streetPlaceholder: "Street Address",
    cityPlaceholder: "City",
    statePlaceholder: "State",
    zipPlaceholder: "Zip Code",
    countryPlaceholder: "Country",
    emailPlaceholder: "Email Address",
    messagePlaceholder: "Message",
    submitBtn: "Submit RSVP",
    thankYou: "Thank you for your RSVP!",

    // Dress Code page
    wearTitle: "Wear",
    dontWearTitle: "Don't Wear",

    // Donations page
    donationsTitle: "Donations",
    donationsText: "There is no wedding registry, but if you would like to contribute your precious booty to Saul & Itzi, please use the options below. Any contributions are immensely appreciated.",

    // Ship image
    shipImage: "assets/ship.png"
  },
  es: {
    // Index page
    summons: "Estás invitado a celebrar con nosotros",
    address1: "The Doyle",
    address2: "418 W Mesquite Ave",
    address3: "Las Vegas, NV 89106",

    // Navigation
    navHome: "Inicio",
    navRsvp: "Invitación",
    navDressCode: "Vestimenta",
    navDonations: "Donaciones",

    // RSVP page
    rsvpTitle: "Invitación",
    eventNotice: "Este es un evento para mayores de 21 años",
    unableToAttend: "Si no puedes asistir, envíanos un mensaje haciendo clic en el botón ? en la parte inferior derecha de la pantalla",
    namePlaceholder: "Tu Nombre",
    streetPlaceholder: "Dirección",
    cityPlaceholder: "Ciudad",
    statePlaceholder: "Estado",
    zipPlaceholder: "Código Postal",
    countryPlaceholder: "País",
    emailPlaceholder: "Correo Electrónico",
    messagePlaceholder: "Mensaje",
    submitBtn: "Enviar Confirmación",
    thankYou: "¡Gracias por tu confirmación!",

    // Dress Code page
    wearTitle: "Usar",
    dontWearTitle: "No Usar",

    // Donations page
    donationsTitle: "Donaciones",
    donationsText: "No hay registro de bodas, pero si deseas contribuir tu precioso botín a Saul e Itzi, por favor usa las opciones a continuación. Cualquier contribución es inmensamente apreciada.",

    // Ship image
    shipImage: "assets/spanish_ship.png"
  }
};

// Get current language from localStorage or default to null (show popup)
function getCurrentLanguage() {
  return localStorage.getItem('wedding-language');
}

// Set language and store in localStorage
function setLanguage(lang) {
  localStorage.setItem('wedding-language', lang);
  applyTranslations(lang);
}

// Apply translations to the page
function applyTranslations(lang) {
  const t = translations[lang];

  // Update all elements with data-translate attribute
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (t[key]) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = t[key];
      } else if (element.tagName === 'IMG') {
        element.src = t[key];
      } else {
        element.textContent = t[key];
      }
    }
  });
}

// Show language selector popup
function showLanguagePopup() {
  const overlay = document.getElementById('language-overlay');
  if (overlay) {
    overlay.style.display = 'flex';
    // Small delay to trigger CSS transition
    setTimeout(() => {
      overlay.classList.remove('hidden');
    }, 10);
  }
}

// Hide language selector popup
function hideLanguagePopup() {
  const overlay = document.getElementById('language-overlay');
  if (overlay) {
    overlay.classList.add('hidden');
    // Remove from DOM after animation
    setTimeout(() => {
      if (overlay) {
        overlay.style.display = 'none';
      }
    }, 500);
  }
}

// Music persistence across pages
function initMusicPersistence() {
  const audio = document.getElementById('background-audio');
  const btn = document.getElementById('music-control-btn');

  if (!audio || !btn) return;

  // Save state before page unload (critical for persistence)
  window.addEventListener('beforeunload', () => {
    if (!audio.paused) {
      localStorage.setItem('music-time', audio.currentTime.toString());
      localStorage.setItem('music-playing', 'true');
    } else {
      localStorage.setItem('music-playing', 'false');
    }
  });

  // Save time periodically while playing
  setInterval(() => {
    if (!audio.paused) {
      localStorage.setItem('music-time', audio.currentTime.toString());
    }
  }, 250);

  // Check if music should be playing from localStorage
  const shouldPlay = localStorage.getItem('music-playing');
  const savedTime = parseFloat(localStorage.getItem('music-time')) || 0;
  let hasUserInteracted = localStorage.getItem('user-interacted') === 'true';

  // Function to restore audio playback
  const restoreAudio = () => {
    // Wait for audio to be loaded enough
    const tryPlay = () => {
      // Set current time when ready
      if (savedTime > 0 && audio.readyState >= 2) {
        audio.currentTime = savedTime;
      }

      // Try to play if it should be playing
      if (shouldPlay === 'true' || shouldPlay === null) {
        const playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise.then(() => {
            localStorage.setItem('music-playing', 'true');
            hasUserInteracted = true;
            localStorage.setItem('user-interacted', 'true');
            console.log('Music resumed successfully at', audio.currentTime);
          }).catch((error) => {
            // Autoplay blocked - wait for user interaction
            console.log('Autoplay blocked, waiting for user interaction');
          });
        }
      }
    };

    if (audio.readyState >= 2) {
      tryPlay();
    } else {
      audio.addEventListener('loadeddata', tryPlay, { once: true });
      audio.load(); // Force load
    }
  };

  // Listen for any user interaction to enable autoplay
  const enableAutoplay = () => {
    if (shouldPlay === 'true' && audio.paused) {
      restoreAudio();
    }
  };

  // Listen for various user interactions
  const interactionEvents = ['click', 'touchstart', 'keydown', 'mousemove'];
  interactionEvents.forEach(eventType => {
    document.addEventListener(eventType, enableAutoplay, { once: true, passive: true });
  });

  // Try to restore immediately
  restoreAudio();

  // Button click handler
  btn.addEventListener('click', () => {
    hasUserInteracted = true;
    localStorage.setItem('user-interacted', 'true');

    if (audio.paused) {
      audio.play().then(() => {
        localStorage.setItem('music-playing', 'true');
      });
    } else {
      audio.pause();
      localStorage.setItem('music-playing', 'false');
    }
  });
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
  const currentLang = getCurrentLanguage();

  if (!currentLang) {
    // No language selected, show popup
    showLanguagePopup();
  } else {
    // Language already selected, apply it
    applyTranslations(currentLang);
  }

  // Add click handlers for language buttons
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.target.getAttribute('data-lang');
      setLanguage(lang);
      hideLanguagePopup();
    });
  });

  // Initialize music persistence
  initMusicPersistence();
});
