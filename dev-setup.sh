#!/bin/bash

# Script de configuration pour le développement local
# Ce script configure l'environnement de développement

echo "=== Configuration de l'environnement de développement ==="

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "manifest.json" ]; then
    echo "❌ Erreur: manifest.json non trouvé. Assurez-vous d'être dans le bon répertoire."
    exit 1
fi

# Créer les dossiers nécessaires
echo "📁 Création des dossiers de développement..."
mkdir -p logs
mkdir -p temp
mkdir -p test-output

# Rendre les scripts exécutables
echo "🔧 Configuration des permissions..."
chmod +x *.sh
chmod +x test/*.sh 2>/dev/null || true

# Vérifier les dépendances
echo "🔍 Vérification des dépendances..."

# Vérifier Node.js
if command -v node &> /dev/null; then
    echo "✅ Node.js trouvé: $(node --version)"
else
    echo "⚠️ Node.js non trouvé. Recommandé pour le développement."
fi

# Vérifier Git
if command -v git &> /dev/null; then
    echo "✅ Git trouvé: $(git --version)"
else
    echo "⚠️ Git non trouvé. Recommandé pour le versioning."
fi

# Vérifier Foundry VTT
FOUNDRY_PATHS=(
    "$HOME/FoundryVTT"
    "$HOME/.local/share/FoundryVTT"
    "/Applications/FoundryVTT.app"
)

FOUNDRY_FOUND=false
for path in "${FOUNDRY_PATHS[@]}"; do
    if [ -d "$path" ]; then
        echo "✅ Foundry VTT trouvé: $path"
        FOUNDRY_FOUND=true
        break
    fi
done

if [ "$FOUNDRY_FOUND" = false ]; then
    echo "⚠️ Foundry VTT non trouvé. Vous devrez l'installer pour tester le module."
fi

# Créer un fichier de configuration local
echo "📝 Création de la configuration locale..."
cat > .env.local << EOF
# Configuration locale pour le développement
FOUNDRY_PATH=""
MODULE_NAME="ars-magica-character-export"
VERSION="1.0.0"
DEBUG=true
EOF

echo "✅ Fichier .env.local créé"

# Créer un script de test rapide
echo "🧪 Création du script de test rapide..."
cat > test-quick.sh << 'EOF'
#!/bin/bash
echo "=== Test rapide du module ==="
echo "1. Vérification de la structure..."
if [ -f "manifest.json" ] && [ -f "scripts/character-export.js" ]; then
    echo "✅ Structure du module OK"
else
    echo "❌ Structure du module incomplète"
    exit 1
fi

echo "2. Vérification de la syntaxe JavaScript..."
if command -v node &> /dev/null; then
    node -c scripts/character-export.js
    if [ $? -eq 0 ]; then
        echo "✅ Syntaxe JavaScript OK"
    else
        echo "❌ Erreur de syntaxe JavaScript"
        exit 1
    fi
else
    echo "⚠️ Node.js non disponible pour la vérification de syntaxe"
fi

echo "3. Vérification des fichiers de traduction..."
if [ -f "lang/fr.json" ]; then
    echo "✅ Fichiers de traduction présents"
else
    echo "❌ Fichiers de traduction manquants"
fi

echo "✅ Test rapide terminé"
EOF

chmod +x test-quick.sh

echo "✅ Script de test rapide créé: test-quick.sh"

# Créer un script de développement
echo "🛠️ Création du script de développement..."
cat > dev.sh << 'EOF'
#!/bin/bash
echo "=== Mode développement ==="
echo "Commandes disponibles:"
echo "  ./test-quick.sh     - Test rapide du module"
echo "  ./build.sh          - Construire le module"
echo "  ./install.sh        - Installer dans Foundry VTT"
echo "  ./deploy.sh         - Déployer le module"
echo ""
echo "Pour tester le module:"
echo "1. Exécutez: ./install.sh"
echo "2. Redémarrez Foundry VTT"
echo "3. Activez le module dans votre monde"
echo "4. Ouvrez une fiche de personnage"
echo "5. Testez le bouton d'export"
EOF

chmod +x dev.sh

echo "✅ Script de développement créé: dev.sh"

# Afficher les informations de configuration
echo ""
echo "=== Configuration terminée ==="
echo ""
echo "Fichiers créés:"
echo "  .env.local          - Configuration locale"
echo "  test-quick.sh       - Test rapide"
echo "  dev.sh              - Script de développement"
echo ""
echo "Prochaines étapes:"
echo "1. Configurez le chemin Foundry VTT dans .env.local si nécessaire"
echo "2. Exécutez ./test-quick.sh pour vérifier le module"
echo "3. Exécutez ./dev.sh pour voir les commandes disponibles"
echo "4. Exécutez ./install.sh pour installer le module"
echo ""
echo "=== Configuration terminée ==="
