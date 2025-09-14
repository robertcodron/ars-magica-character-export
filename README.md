# Ars Magica Character Export

Un module Foundry VTT pour Ars Magica qui permet d'exporter les informations complètes d'un personnage en PDF.

## Fonctionnalités

- **Export complet** : Récupère toutes les informations du personnage (caractéristiques, compétences, sorts, équipement, etc.)
- **Interface intuitive** : Bouton d'export directement dans la fiche de personnage
- **Format PDF** : Génère un fichier HTML formaté qui peut être imprimé en PDF
- **Sécurité** : Seul le propriétaire du personnage peut l'exporter
- **Compatible** : Fonctionne avec le système Ars Magica sur Foundry VTT

## Installation

1. Téléchargez le module depuis la page des modules de Foundry VTT
2. Activez le module dans les paramètres de votre monde
3. Le bouton d'export apparaîtra automatiquement dans les fiches de personnage

## Utilisation

1. Ouvrez la fiche de votre personnage
2. Allez dans l'onglet "Description" (ou "Détails")
3. Cliquez sur le bouton "Exporter en PDF"
4. Le fichier HTML sera téléchargé sur votre ordinateur
5. Ouvrez le fichier dans votre navigateur et imprimez-le en PDF

## Données exportées

Le module exporte toutes les informations disponibles du personnage :

- **Informations générales** : Nom, type, joueur, dates de création/modification
- **Caractéristiques** : Toutes les caractéristiques du personnage
- **Compétences** : Liste complète des compétences avec leurs valeurs
- **Sorts** : Tous les sorts avec leurs détails (niveau, technique, forme, description)
- **Arts** : Arts magiques du personnage
- **Vertus et Défauts** : Liste des vertus et défauts
- **Inventaire** : Équipement et objets du personnage
- **Notes** : Notes personnelles du joueur
- **Métadonnées** : Informations techniques (ID, propriétaires, etc.)

## Structure du fichier

```
ars-magica-character-export/
├── manifest.json              # Manifeste du module
├── scripts/
│   └── character-export.js    # Script principal
├── styles/
│   └── character-export.css   # Styles CSS
├── lang/
│   └── fr.json               # Traductions françaises
└── README.md                 # Documentation
```

## Développement

### Prérequis

- Foundry VTT version 13+
- Système Ars Magica

### Structure du code

Le module utilise les hooks de Foundry VTT pour :

- Détecter l'ouverture des fiches de personnage
- Ajouter le bouton d'export
- Gérer les clics sur le bouton
- Extraire les données du personnage
- Générer le HTML formaté
- Télécharger le fichier

### Personnalisation

Vous pouvez modifier le fichier `character-export.js` pour :

- Ajouter de nouvelles sections d'export
- Modifier le formatage HTML
- Changer les données extraites
- Personnaliser le nom du fichier

## Support

Pour signaler des bugs ou demander des fonctionnalités, veuillez créer une issue sur le repository GitHub : https://github.com/robertcodron/ars-magica-character-export/issues

## Licence

Ce module est distribué sous licence MIT.

## Changelog

### Version 1.0.0

- Export initial des personnages Ars Magica
- Interface utilisateur intégrée aux fiches
- Support complet des données système
- Génération de fichiers HTML formatés
