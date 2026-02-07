// Extension GeoGuessr AZERTY Fix
// Convertit les touches AZERTY françaises en touches numériques pour les emotes

// Tableau de correspondance entre les touches AZERTY et les chiffres
const azertyToNumber = {
  '&': '4',  // Touche & (position 1) → Hey (Emote 1)
  'é': '2',  // Touche é (position 2) → Lol (Emote 2)
  '"': '1',  // Touche " (position 3) → GG (Emote 7)
  "'": '3',  // Touche ' (position 4) → Boom (Emote 3)
  '(': '6',  // Touche ( (position 5) → Cry (Emote 4)
  '-': '5',  // Touche - (position 6) → ??? (Emote 5)
  'è': '7'   // Touche è (position 7) → Cool (Emote 6)
};

// Variable pour tracker l'état de l'overlay
let overlayVisible = false;
let overlayElement = null;
let manualOverride = false; // Pour savoir si l'utilisateur a forcé l'état manuellement
let lastUrl = window.location.href;

// Fonction pour créer l'overlay
function createOverlay() {
  // Récupérer les URLs des icônes avant de construire le HTML
  const iconHey = chrome.runtime.getURL('emote-icons/emote-hey.webp');
  const iconLol = chrome.runtime.getURL('emote-icons/emote-LoL.webp');
  const iconGG = chrome.runtime.getURL('emote-icons/emote-gg.webp');
  const iconBoom = chrome.runtime.getURL('emote-icons/emote-mindblown.webp');
  const iconCry = chrome.runtime.getURL('emote-icons/emote-cry.webp');
  const iconConfused = chrome.runtime.getURL('emote-icons/emote-confused.webp');
  const iconCool = chrome.runtime.getURL('emote-icons/emote-cool.webp');

  const overlay = document.createElement('div');
  overlay.id = 'geoguessr-azerty-overlay';
  overlay.innerHTML = `
    <div style="
      position: fixed;
      bottom: 80px;
      left: 78px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 10px 12px;
      border-radius: 6px;
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 13px;
      z-index: 999999;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.15);
      min-width: 120px;
    ">
      <div style="
        font-weight: bold;
        margin-bottom: 7px;
        font-size: 15px;
        color: #aaa;
        text-align: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        padding-bottom: 5px;
      ">Emotes</div>
      <div style="display: flex; flex-direction: column; gap: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <span style="background: rgba(255, 255, 255, 0.15); padding: 3px 7px; border-radius: 3px; font-weight: bold; font-size: 13px;">1</span>
          <img src="${iconHey}" style="width: 24px; height: 24px; opacity: 0.95;" alt="Hey">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <span style="background: rgba(255, 255, 255, 0.15); padding: 3px 7px; border-radius: 3px; font-weight: bold; font-size: 13px;">2</span>
          <img src="${iconLol}" style="width: 24px; height: 24px; opacity: 0.95;" alt="Lol">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <span style="background: rgba(255, 255, 255, 0.15); padding: 3px 7px; border-radius: 3px; font-weight: bold; font-size: 13px;">3</span>
          <img src="${iconGG}" style="width: 24px; height: 24px; opacity: 0.95;" alt="GG">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <span style="background: rgba(255, 255, 255, 0.15); padding: 3px 7px; border-radius: 3px; font-weight: bold; font-size: 13px;">4</span>
          <img src="${iconBoom}" style="width: 24px; height: 24px; opacity: 0.95;" alt="Boom">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <span style="background: rgba(255, 255, 255, 0.15); padding: 3px 7px; border-radius: 3px; font-weight: bold; font-size: 13px;">5</span>
          <img src="${iconCry}" style="width: 24px; height: 24px; opacity: 0.95;" alt="Cry">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <span style="background: rgba(255, 255, 255, 0.15); padding: 3px 7px; border-radius: 3px; font-weight: bold; font-size: 13px;">6</span>
          <img src="${iconConfused}" style="width: 24px; height: 24px; opacity: 0.95;" alt="???">
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
          <span style="background: rgba(255, 255, 255, 0.15); padding: 3px 7px; border-radius: 3px; font-weight: bold; font-size: 13px;">7</span>
          <img src="${iconCool}" style="width: 24px; height: 24px; opacity: 0.95;" alt="Cool">
        </div>
      </div>
      <div style="
        margin-top: 7px;
        padding-top: 5px;
        border-top: 1px solid rgba(255, 255, 255, 0.15);
        font-size: 12px;
        text-align: center;
        opacity: 0.6;
      "><strong>²</strong> masquer</div>
    </div>
  `;

  overlay.style.display = 'none';
  document.body.appendChild(overlay);
  return overlay;
}

// Fonction pour détecter si on est en partie solo
function isSoloGame() {
  return window.location.pathname.includes('/game/');
}

// Fonction pour mettre à jour l'affichage de l'overlay automatiquement
function updateOverlayAuto() {
  if (manualOverride) return; // Ne pas modifier si l'utilisateur a override manuellement

  if (!overlayElement) {
    overlayElement = createOverlay();
  }

  const shouldShow = !isSoloGame(); // Afficher si on n'est PAS en solo
  overlayVisible = shouldShow;
  overlayElement.style.display = overlayVisible ? 'block' : 'none';
}

// Fonction pour toggle l'overlay manuellement
function toggleOverlay() {
  if (!overlayElement) {
    overlayElement = createOverlay();
  }

  overlayVisible = !overlayVisible;
  overlayElement.style.display = overlayVisible ? 'block' : 'none';
  manualOverride = true; // L'utilisateur a pris le contrôle manuel
}

// Initialiser l'overlay au chargement de la page
function initOverlay() {
  updateOverlayAuto(); // Affichage automatique selon le contexte
}

// Détecter les changements d'URL via les APIs de navigation (pas de MutationObserver)
function observeUrlChanges() {
  function onUrlChange() {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      lastUrl = currentUrl;
      manualOverride = false;
      updateOverlayAuto();
    }
  }

  // Intercepter pushState et replaceState (navigation SPA)
  const originalPushState = history.pushState;
  const originalReplaceState = history.replaceState;
  history.pushState = function(...args) {
    originalPushState.apply(this, args);
    onUrlChange();
  };
  history.replaceState = function(...args) {
    originalReplaceState.apply(this, args);
    onUrlChange();
  };

  // Détecter popstate (boutons précédent/suivant)
  window.addEventListener('popstate', onUrlChange);
}

// Attendre que le DOM soit chargé
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initOverlay();
    observeUrlChanges();
  });
} else {
  initOverlay();
  observeUrlChanges();
}

// Écoute tous les événements de touche sur la page
document.addEventListener('keydown', function(event) {
  // Toggle overlay avec la touche ²
  if (event.key === '²') {
    event.preventDefault();
    toggleOverlay();
    return;
  }

  // Vérifie si la touche pressée est dans notre tableau de correspondance
  if (azertyToNumber[event.key]) {

    // Empêche le comportement par défaut de la touche
    event.preventDefault();
    event.stopPropagation();

    // Récupère le chiffre correspondant
    const numberKey = azertyToNumber[event.key];

    // Crée un nouvel événement avec le chiffre
    const newEvent = new KeyboardEvent('keydown', {
      key: numberKey,
      code: 'Digit' + numberKey,
      keyCode: 48 + parseInt(numberKey),
      which: 48 + parseInt(numberKey),
      bubbles: true,
      cancelable: true
    });

    // Envoie le nouvel événement à l'élément qui avait le focus
    event.target.dispatchEvent(newEvent);
  }
}, true);
