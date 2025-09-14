#!/bin/bash

# Script d'installation pour le module Ars Magica Character Export
# Ce script copie le module dans le dossier des modules de Foundry VTT

echo "=== Installation du module Ars Magica Character Export ==="

# Vérifier si Foundry VTT est installé
FOUNDRY_PATH=""
if [ -d "$HOME/FoundryVTT" ]; then
    FOUNDRY_PATH="$HOME/FoundryVTT"
elif [ -d "$HOME/.local/share/FoundryVTT" ]; then
    FOUNDRY_PATH="$HOME/.local/share/FoundryVTT"
elif [ -d "/Applications/FoundryVTT.app" ]; then
    FOUNDRY_PATH="/Applications/FoundryVTT.app"
else
    echo "❌ Dossier Foundry VTT non trouvé. Veuillez spécifier le chemin manuellement."
    read -p "Chemin vers Foundry VTT: " FOUNDRY_PATH
fi

if [ ! -d "$FOUNDRY_PATH" ]; then
    echo "❌ Dossier Foundry VTT invalide: $FOUNDRY_PATH"
    exit 1
fi

echo "✅ Foundry VTT trouvé: $FOUNDRY_PATH"

# Chemin vers les modules
MODULES_PATH="$FOUNDRY_PATH/Data/modules"

# Créer le dossier des modules s'il n'existe pas
if [ ! -d "$MODULES_PATH" ]; then
    echo "📁 Création du dossier des modules..."
    mkdir -p "$MODULES_PATH"
fi

# Chemin de destination
DEST_PATH="$MODULES_PATH/ars-magica-character-export"

# Supprimer l'ancienne version si elle existe
if [ -d "$DEST_PATH" ]; then
    echo "🗑️ Suppression de l'ancienne version..."
    rm -rf "$DEST_PATH"
fi

# Copier le module
echo "📦 Copie du module..."
cp -r . "$DEST_PATH"

# Vérifier l'installation
if [ -f "$DEST_PATH/manifest.json" ] && [ -f "$DEST_PATH/scripts/character-export.js" ]; then
    echo "✅ Module installé avec succès!"
    echo "📁 Emplacement: $DEST_PATH"
    echo ""
    echo "Prochaines étapes:"
    echo "1. Redémarrez Foundry VTT"
    echo "2. Activez le module dans les paramètres de votre monde"
    echo "3. Ouvrez une fiche de personnage pour voir le bouton d'export"
else
    echo "❌ Erreur lors de l'installation"
    exit 1
fi

echo ""
echo "=== Installation terminée ==="
