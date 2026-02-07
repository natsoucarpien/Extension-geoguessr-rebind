# GeoGuessr AZERTY Fix

Extension Chrome permettant de rebind les emotes de GeoGuessr sur les touches du clavier AZERTY français, avec un overlay in-game affichant les raccourcis visuellement.

## Installation

1. Ouvrez Google Chrome
2. Tapez dans la barre d'adresse : `chrome://extensions/`
3. Activez le **Mode développeur** (bouton en haut à droite)
4. Cliquez sur **Charger l'extension non empaquetée**
5. Sélectionnez ce dossier

## Utilisation

### Raccourcis emotes

| Touche | Emote |
|--------|-------|
| `1` (&) | Hey |
| `2` (é) | Lol |
| `3` (") | GG |
| `4` (') | Mindblown/Boom |
| `5` (() | Cry |
| `6` (-) | Confused/??? |
| `7` (è) | Cool |

### Overlay in-game

- `²` — Afficher / Masquer l'overlay
- L'overlay apparaît **automatiquement en multijoueur** et se **masque en solo**
- La touche `²` permet d'override ce comportement à tout moment

## Fonctionnalités

- Conversion automatique des touches AZERTY vers les emotes GeoGuessr
- Overlay visuel avec icônes des emotes
- Détection automatique solo/multi (affichage intelligent)
- Override manuel avec la touche `²`
- Position optimisée en bas à gauche de l'écran

## Structure du projet

```
├── content.js        # Script principal (conversion touches + overlay)
├── manifest.json     # Configuration de l'extension
├── emote-icons/      # Icônes WebP des emotes GeoGuessr
├── popup.html        # Interface du popup de l'extension
└── README.md
```

## Personnalisation

Pour modifier les binds, éditez le tableau `azertyToNumber` dans `content.js` (lignes 5-13).
Les valeurs correspondent aux numéros d'emotes GeoGuessr (1-7).

## Dépannage

1. Vérifiez que l'extension est bien activée dans `chrome://extensions/`
2. Rechargez la page GeoGuessr (`F5`)
3. Rechargez l'extension après toute modification du code
4. Vérifiez la console (`F12`) pour les messages de debug
5. Assurez-vous d'être en jeu (pas dans un menu ou un champ de texte)
