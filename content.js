// Extension GeoGuessr AZERTY Fix
// Convertit les touches AZERTY françaises en touches numériques pour les emotes

// Tableau de correspondance entre les touches AZERTY et les chiffres
const azertyToNumber = {
  'è': '1',  // Touche è devient 1
  'é': '2',  // Touche é devient 2
  '"': '3',  // Touche " devient 3
  '&': '4',  // Touche & devient 4
  '(': '5',  // Touche ( devient 5
  "'": '6',  // Touche ' devient 6
  '-': '7'   // Touche - devient 7
};

// Écoute tous les événements de touche sur la page
document.addEventListener('keydown', function(event) {
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
    
    // Affiche un message dans la console pour déboguer (optionnel)
    console.log(`AZERTY Fix: ${event.key} → ${numberKey}`);
  }
}, true);

console.log('GeoGuessr AZERTY Fix activé ! Vous pouvez maintenant utiliser è é " & ( \' - pour les emotes.');