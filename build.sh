#!/bin/bash

# Script de build pour le module Ars Magica Character Export
# Crée un package prêt pour l'installation

echo "=== Build du module Ars Magica Character Export ==="

# Variables
MODULE_NAME="ars-magica-character-export"
VERSION=$(grep '"version"' manifest.json | cut -d'"' -f4)
BUILD_DIR="build"
PACKAGE_NAME="${MODULE_NAME}-v${VERSION}"

echo "Version: $VERSION"
echo "Nom du package: $PACKAGE_NAME"

# Nettoyer le dossier de build
if [ -d "$BUILD_DIR" ]; then
    echo "🗑️ Nettoyage du dossier de build..."
    rm -rf "$BUILD_DIR"
fi

# Créer le dossier de build
echo "📁 Création du dossier de build..."
mkdir -p "$BUILD_DIR/$PACKAGE_NAME"

# Copier les fichiers nécessaires
echo "📦 Copie des fichiers..."
cp manifest.json "$BUILD_DIR/$PACKAGE_NAME/"
cp module.json "$BUILD_DIR/$PACKAGE_NAME/"
cp README.md "$BUILD_DIR/$PACKAGE_NAME/"

# Copier les dossiers
cp -r scripts "$BUILD_DIR/$PACKAGE_NAME/"
cp -r styles "$BUILD_DIR/$PACKAGE_NAME/"
cp -r lang "$BUILD_DIR/$PACKAGE_NAME/"

# Créer le package ZIP
echo "📦 Création du package ZIP..."
cd "$BUILD_DIR"
zip -r "${PACKAGE_NAME}.zip" "$PACKAGE_NAME"
cd ..

# Vérifier la création du package
if [ -f "$BUILD_DIR/${PACKAGE_NAME}.zip" ]; then
    echo "✅ Package créé avec succès: $BUILD_DIR/${PACKAGE_NAME}.zip"
    
    # Afficher les informations du package
    echo ""
    echo "=== Informations du package ==="
    echo "Taille: $(du -h "$BUILD_DIR/${PACKAGE_NAME}.zip" | cut -f1)"
    echo "Contenu:"
    unzip -l "$BUILD_DIR/${PACKAGE_NAME}.zip" | head -20
    
    echo ""
    echo "=== Installation ==="
    echo "Pour installer le module:"
    echo "1. Copiez le fichier $BUILD_DIR/${PACKAGE_NAME}.zip"
    echo "2. Dans Foundry VTT, allez dans Configuration > Modules"
    echo "3. Cliquez sur 'Install Module'"
    echo "4. Sélectionnez le fichier ZIP"
    echo "5. Activez le module dans votre monde"
    
else
    echo "❌ Erreur lors de la création du package"
    exit 1
fi

echo ""
echo "=== Build terminé ==="
