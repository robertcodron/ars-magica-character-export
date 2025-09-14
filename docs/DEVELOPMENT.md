# Documentation Technique - Ars Magica Character Export

## Architecture du Module

### Structure des Fichiers

```
ars-magica-character-export/
├── manifest.json              # Manifeste du module Foundry VTT
├── module.json               # Configuration alternative
├── scripts/
│   └── character-export.js   # Script principal du module
├── styles/
│   └── character-export.css  # Styles CSS pour l'interface
├── lang/
│   └── fr.json              # Traductions françaises
├── test/
│   ├── test-module.js       # Tests unitaires
│   └── integration-test.js  # Tests d'intégration
├── demo/
│   └── example-character.json # Données d'exemple
├── docs/
│   └── DEVELOPMENT.md       # Cette documentation
├── install.sh               # Script d'installation
└── README.md               # Documentation utilisateur
```

### Classes et Fonctions Principales

#### `ArsMagicaCharacterExport`

Classe principale du module qui gère :

- **Initialisation** : Enregistrement des hooks Foundry VTT
- **Interface utilisateur** : Ajout du bouton d'export aux fiches
- **Extraction de données** : Récupération des informations du personnage
- **Génération HTML** : Création du contenu formaté
- **Export** : Téléchargement du fichier

#### Méthodes Principales

```javascript
// Initialisation du module
static init()

// Ajout du bouton d'export à la fiche
static addExportButton(sheet, html, data)

// Gestion des clics sur le bouton
static handleExportClick(event)

// Extraction des données du personnage
static extractCharacterData(actor)

// Génération du HTML pour le PDF
static generateHTML(characterData)

// Génération et téléchargement du PDF
static generatePDF(htmlContent, filename)
```

## Hooks Foundry VTT Utilisés

### `renderActorSheet`

```javascript
Hooks.on('renderActorSheet', ArsMagicaCharacterExport.addExportButton);
```

Ce hook est déclenché chaque fois qu'une fiche de personnage est rendue. Il permet d'ajouter le bouton d'export à l'interface.

### `ready`

```javascript
Hooks.once('ready', () => {
  ArsMagicaCharacterExport.init();
});
```

Ce hook est déclenché une seule fois quand Foundry VTT est complètement chargé. Il initialise le module.

## Structure des Données

### Données Extraites

Le module extrait les informations suivantes d'un personnage :

```javascript
{
  // Informations de base
  name: string,
  type: string,
  img: string,

  // Informations utilisateur
  user: {
    name: string,
    role: number,
    active: boolean
  },

  // Données système Ars Magica
  system: {
    characteristics: object,  // Caractéristiques
    abilities: object,        // Compétences
    spells: object,          // Sorts
    arts: object,            // Arts magiques
    virtues: object,         // Vertus
    flaws: object,           // Défauts
    personal: object,        // Informations personnelles
    covenant: object,        // Covenant
    inventory: object,       // Inventaire
    notes: string,           // Notes
    ...                      // Autres données système
  },

  // Items du personnage
  items: Array<{
    name: string,
    type: string,
    system: object,
    img: string
  }>,

  // Effets actifs
  effects: Array<{
    name: string,
    icon: string,
    system: object
  }>,

  // Métadonnées
  metadata: {
    id: string,
    folder: string,
    created: number,
    modified: number,
    ownership: object
  }
}
```

### Format HTML Généré

Le HTML généré suit une structure spécifique :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Fiche de Personnage - [Nom]</title>
    <style>
      /* Styles CSS intégrés */
    </style>
  </head>
  <body>
    <div class="header">...</div>
    <div class="section">Informations Générales</div>
    <div class="section">Caractéristiques</div>
    <div class="section">Compétences</div>
    <div class="section">Sorts</div>
    <div class="section">Équipement</div>
    <div class="section">Notes</div>
    <div class="metadata">...</div>
  </body>
</html>
```

## Sécurité et Permissions

### Vérifications de Sécurité

1. **Propriétaire uniquement** : Seul le propriétaire du personnage peut l'exporter
2. **Validation des données** : Vérification de l'existence du personnage
3. **Gestion d'erreurs** : Try-catch pour toutes les opérations critiques

### Code de Sécurité

```javascript
// Vérifier que l'utilisateur est propriétaire
if (!sheet.actor.isOwner) return;

// Vérifier l'existence du personnage
if (!actor) {
  ui.notifications.error('Personnage introuvable !');
  return;
}
```

## Personnalisation

### Ajouter de Nouvelles Sections

Pour ajouter une nouvelle section d'export :

1. **Modifier `extractCharacterData`** :

```javascript
// Dans extractCharacterData()
newSection: system.newSection || {},
```

2. **Modifier `generateHTML`** :

```javascript
// Dans generateHTML()
${data.system.newSection ? `
<div class="section">
    <div class="section-title">Nouvelle Section</div>
    <!-- Contenu de la section -->
</div>
` : ''}
```

3. **Ajouter les styles CSS** :

```css
.new-section {
  /* Styles pour la nouvelle section */
}
```

### Modifier le Formatage

Le formatage est contrôlé par les styles CSS intégrés dans le HTML. Pour modifier l'apparence :

1. Éditer la fonction `generateHTML()`
2. Modifier les classes CSS dans la section `<style>`
3. Ajuster la structure HTML si nécessaire

### Changer le Nom du Fichier

```javascript
// Dans generatePDF()
link.download = `Nouveau_Nom_${filename}_${date}.html`;
```

## Tests

### Tests Unitaires

Le fichier `test/test-module.js` contient des tests pour :

- Vérification du chargement du module
- Test d'extraction des données
- Test de génération HTML
- Vérification des permissions

### Tests d'Intégration

Le fichier `test/integration-test.js` contient des tests complets :

- Création d'un personnage de test
- Test d'export complet
- Vérification de l'interface utilisateur
- Nettoyage automatique

### Exécution des Tests

```javascript
// Dans la console de Foundry VTT
runIntegrationTest(); // Test complet
testWithExistingCharacter(); // Test avec personnage existant
```

## Débogage

### Logs de Débogage

Le module utilise `console.log` pour le débogage :

```javascript
console.log('Ars Magica Character Export | Initialisation du module');
```

### Erreurs Communes

1. **Module non chargé** : Vérifier le manifest.json
2. **Bouton non visible** : Vérifier les hooks et les permissions
3. **Erreur d'export** : Vérifier les données du personnage
4. **Fichier corrompu** : Vérifier la génération HTML

### Outils de Débogage

```javascript
// Vérifier le chargement du module
console.log(window.ArsMagicaCharacterExport);

// Vérifier les hooks
console.log(Hooks._hooks);

// Tester l'extraction de données
const actor = game.actors.get('actor-id');
const data = ArsMagicaCharacterExport.extractCharacterData(actor);
console.log(data);
```

## Performance

### Optimisations

1. **Lazy loading** : Le module ne se charge que quand nécessaire
2. **Cache des données** : Les données sont extraites à la demande
3. **Gestion mémoire** : Nettoyage automatique des objets temporaires

### Limitations

1. **Taille des fichiers** : Les personnages avec beaucoup d'items peuvent générer de gros fichiers
2. **Navigateur** : La génération PDF dépend des capacités du navigateur
3. **Données système** : Le module dépend de la structure des données Ars Magica

## Maintenance

### Mise à Jour

Pour mettre à jour le module :

1. Modifier le numéro de version dans `manifest.json`
2. Tester les nouvelles fonctionnalités
3. Mettre à jour la documentation
4. Créer une nouvelle release

### Compatibilité

Le module est compatible avec :

- Foundry VTT version 13+
- Système Ars Magica
- Navigateurs modernes (Chrome, Firefox, Safari, Edge)

### Support

Pour le support technique :

1. Vérifier les logs de la console
2. Exécuter les tests d'intégration
3. Consulter la documentation
4. Créer une issue sur GitHub
