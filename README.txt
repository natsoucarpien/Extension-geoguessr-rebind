GeoGuessr AZERTY Fix - Guide d'installation
===========================================

Extension Chrome permettant de rebind les emotes de GeoGuessr sur les touches du clavier AZERTY français,
avec overlay in-game affichant les raccourcis visuellement.

INSTALLATION :
--------------
1. Ouvrez Google Chrome
2. Tapez dans la barre d'adresse : chrome://extensions/
3. Activez le "Mode développeur" (bouton en haut à droite)
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez ce dossier (GeoGuessr-AZERTY-Fix)
6. L'extension est installée !

UTILISATION :
-------------
Allez sur geoguessr.com et utilisez les raccourcis suivants :

RACCOURCIS EMOTES :
  Touche 1 (&) → Hey
  Touche 2 (é) → Lol
  Touche 3 (") → GG
  Touche 4 (') → Mindblown/Boom
  Touche 5 (() → Cry
  Touche 6 (-) → Confused/???
  Touche 7 (è) → Cool

OVERLAY IN-GAME :
  Touche ² → Afficher/Masquer l'overlay des raccourcis

  L'overlay affiche visuellement les icônes des emotes et leurs touches correspondantes.
  Il apparaît automatiquement en partie multijoueur et se masque en partie solo.
  Vous pouvez forcer l'affichage/masquage avec la touche ² à tout moment.

FONCTIONNALITÉS :
-----------------
✓ Conversion automatique des touches AZERTY vers les emotes GeoGuessr
✓ Overlay visuel avec icônes des emotes
✓ Détection automatique solo/multi (affichage intelligent)
✓ Override manuel avec la touche ²
✓ Position optimisée en bas à gauche de l'écran
✓ Background discret semi-transparent

STRUCTURE DU PROJET :
---------------------
- content.js : Script principal (conversion touches + overlay)
- manifest.json : Configuration de l'extension
- emote-icons/ : Icônes WebP des emotes GeoGuessr
- popup.html : Interface du popup de l'extension
- README.txt : Ce fichier

PERSONNALISATION :
------------------
Pour modifier les binds, éditez le tableau 'azertyToNumber' dans content.js (lignes 5-13)
Les valeurs correspondent aux numéros d'emotes GeoGuessr (1-7)

DÉPANNAGE :
-----------
Si ça ne fonctionne pas :
1. Vérifiez que l'extension est bien activée dans chrome://extensions/
2. Rechargez la page GeoGuessr (F5)
3. Rechargez l'extension après toute modification du code
4. Vérifiez la console (F12) pour les messages de debug
5. Assurez-vous d'être en jeu (pas dans un menu ou un champ de texte)

Bon jeu ! 🌍