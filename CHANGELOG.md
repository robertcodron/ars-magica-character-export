# Changelog - Ars Magica Character Export

Toutes les modifications notables de ce module seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/lang/fr/).

## [1.0.0] - 2024-01-XX

### Ajouté

- Export complet des personnages Ars Magica en PDF
- Interface utilisateur intégrée aux fiches de personnage
- Bouton d'export dans l'onglet Description/Détails
- Extraction de toutes les données système (caractéristiques, compétences, sorts, etc.)
- Génération de fichiers HTML formatés pour impression PDF
- Support des traductions françaises
- Tests unitaires et d'intégration
- Documentation complète
- Scripts d'installation et de build

### Fonctionnalités

- **Export de données** : Récupération complète des informations du personnage
- **Interface intuitive** : Bouton d'export directement dans la fiche
- **Format PDF** : Génération de fichiers HTML optimisés pour l'impression
- **Sécurité** : Vérification des permissions (propriétaire uniquement)
- **Compatibilité** : Fonctionne avec Foundry VTT v13+ et le système Ars Magica

### Données exportées

- Informations générales (nom, type, joueur, dates)
- Caractéristiques du personnage
- Compétences avec leurs valeurs
- Sorts avec détails (niveau, technique, forme, description)
- Arts magiques
- Vertus et défauts
- Informations personnelles (âge, année de naissance, covenant)
- Inventaire et équipement
- Notes personnelles
- Métadonnées techniques

### Interface

- Bouton d'export stylisé avec icône
- Messages de notification pour le feedback utilisateur
- Gestion des erreurs avec messages explicites
- Interface responsive pour différents écrans

### Technique

- Utilisation des hooks Foundry VTT (renderActorSheet, ready)
- Extraction de données via l'API Foundry VTT
- Génération HTML avec styles CSS intégrés
- Téléchargement de fichiers via l'API Blob
- Gestion des permissions et de la sécurité

### Tests

- Tests unitaires pour toutes les fonctions principales
- Tests d'intégration avec création de personnages de test
- Scripts de test automatisés
- Validation des données extraites

### Documentation

- README complet avec instructions d'installation
- Documentation technique pour les développeurs
- Exemples de données et de personnages
- Scripts d'installation et de build

## [0.1.0] - 2024-01-XX

### Ajouté

- Version initiale du module
- Structure de base des fichiers
- Manifeste Foundry VTT
- Script principal avec fonctionnalités de base

---

## Types de modifications

- **Ajouté** : Nouvelles fonctionnalités
- **Modifié** : Changements dans les fonctionnalités existantes
- **Déprécié** : Fonctionnalités qui seront supprimées dans une version future
- **Supprimé** : Fonctionnalités supprimées dans cette version
- **Corrigé** : Corrections de bugs
- **Sécurité** : Corrections de vulnérabilités de sécurité
