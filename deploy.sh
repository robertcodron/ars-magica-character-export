#!/bin/bash

# Script de déploiement pour le module Ars Magica Character Export
# Ce script crée un package et le déploie

echo "=== Déploiement du module Ars Magica Character Export ==="

# Variables
MODULE_NAME="ars-magica-character-export"
VERSION=$(grep '"version"' manifest.json | cut -d'"' -f4)
BUILD_DIR="build"
PACKAGE_NAME="${MODULE_NAME}-v${VERSION}"

echo "Version: $VERSION"
echo "Nom du package: $PACKAGE_NAME"

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "manifest.json" ]; then
    echo "❌ Erreur: manifest.json non trouvé. Assurez-vous d'être dans le bon répertoire."
    exit 1
fi

# Nettoyer les anciens builds
echo "🗑️ Nettoyage des anciens builds..."
rm -rf "$BUILD_DIR"
rm -f *.zip

# Créer le build
echo "📦 Création du build..."
./build.sh

if [ ! -f "$BUILD_DIR/${PACKAGE_NAME}.zip" ]; then
    echo "❌ Erreur: Le build a échoué"
    exit 1
fi

echo "✅ Build créé avec succès"

# Copier le package vers le répertoire parent pour installation
echo "📁 Copie du package pour installation..."
cp "$BUILD_DIR/${PACKAGE_NAME}.zip" "../${PACKAGE_NAME}.zip"

echo "✅ Package copié vers le répertoire parent"

# Afficher les informations de déploiement
echo ""
echo "=== Informations de déploiement ==="
echo "Package créé: $BUILD_DIR/${PACKAGE_NAME}.zip"
echo "Package copié: ../${PACKAGE_NAME}.zip"
echo "Taille: $(du -h "$BUILD_DIR/${PACKAGE_NAME}.zip" | cut -f1)"

echo ""
echo "=== Instructions d'installation ==="
echo "1. Le package a été copié vers le répertoire parent"
echo "2. Dans Foundry VTT:"
echo "   - Allez dans Configuration > Modules"
echo "   - Cliquez sur 'Install Module'"
echo "   - Sélectionnez le fichier: ../${PACKAGE_NAME}.zip"
echo "   - Activez le module dans votre monde"

echo ""
echo "=== Test du module ==="
echo "Après installation, testez le module:"
echo "1. Ouvrez une fiche de personnage"
echo "2. Vérifiez que le bouton 'Exporter en PDF' apparaît"
echo "3. Cliquez sur le bouton pour tester l'export"
echo "4. Exécutez les tests dans la console:"
echo "   - runIntegrationTest()"
echo "   - testWithExistingCharacter()"

echo ""
echo "=== Déploiement terminé ==="
