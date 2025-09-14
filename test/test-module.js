/**
 * Script de test pour le module Ars Magica Character Export
 * À exécuter dans la console de Foundry VTT pour tester les fonctionnalités
 */

console.log('=== Test du module Ars Magica Character Export ===');

// Test 1: Vérifier que le module est chargé
console.log('Test 1: Vérification du chargement du module');
if (window.ArsMagicaCharacterExport) {
  console.log('✅ Module chargé avec succès');
} else {
  console.log('❌ Module non chargé');
}

// Test 2: Vérifier qu'il y a des personnages dans le monde
console.log('\nTest 2: Vérification des personnages disponibles');
const characters = game.actors.filter(actor => actor.type === 'character');
console.log(`Nombre de personnages trouvés: ${characters.length}`);

if (characters.length > 0) {
  console.log('✅ Personnages trouvés');
  characters.forEach(char => {
    console.log(`- ${char.name} (ID: ${char.id})`);
  });
} else {
  console.log('❌ Aucun personnage trouvé');
}

// Test 3: Tester l'extraction de données d'un personnage
console.log("\nTest 3: Test d'extraction de données");
if (characters.length > 0) {
  const testCharacter = characters[0];
  console.log(`Test avec le personnage: ${testCharacter.name}`);

  try {
    const characterData = ArsMagicaCharacterExport.extractCharacterData(testCharacter);
    console.log('✅ Extraction de données réussie');
    console.log('Données extraites:', characterData);

    // Vérifier les sections principales
    const sections = ['name', 'type', 'system', 'items', 'effects', 'metadata'];

    sections.forEach(section => {
      if (characterData[section] !== undefined) {
        console.log(`✅ Section '${section}' présente`);
      } else {
        console.log(`❌ Section '${section}' manquante`);
      }
    });
  } catch (error) {
    console.log("❌ Erreur lors de l'extraction:", error);
  }
} else {
  console.log("❌ Impossible de tester l'extraction - aucun personnage");
}

// Test 4: Tester la génération HTML
console.log('\nTest 4: Test de génération HTML');
if (characters.length > 0) {
  const testCharacter = characters[0];
  try {
    const characterData = ArsMagicaCharacterExport.extractCharacterData(testCharacter);
    const htmlContent = ArsMagicaCharacterExport.generateHTML(characterData);

    if (htmlContent && htmlContent.includes('<!DOCTYPE html>')) {
      console.log('✅ Génération HTML réussie');
      console.log(`Taille du HTML: ${htmlContent.length} caractères`);
    } else {
      console.log('❌ Génération HTML échouée');
    }
  } catch (error) {
    console.log('❌ Erreur lors de la génération HTML:', error);
  }
} else {
  console.log('❌ Impossible de tester la génération HTML - aucun personnage');
}

// Test 5: Vérifier les permissions
console.log('\nTest 5: Vérification des permissions');
if (characters.length > 0) {
  const testCharacter = characters[0];
  const isOwner = testCharacter.isOwner;
  console.log(`Propriétaire du personnage '${testCharacter.name}': ${isOwner}`);

  if (isOwner) {
    console.log('✅ Vous êtes propriétaire - export autorisé');
  } else {
    console.log("⚠️ Vous n'êtes pas propriétaire - export non autorisé");
  }
} else {
  console.log('❌ Impossible de tester les permissions - aucun personnage');
}

// Test 6: Vérifier les hooks
console.log('\nTest 6: Vérification des hooks');
const hooks = Hooks._hooks;
const relevantHooks = Object.keys(hooks).filter(
  hook => hook.includes('renderActorSheet') || hook.includes('ready')
);

console.log('Hooks pertinents trouvés:', relevantHooks);

// Test 7: Fonction de test d'export complet
console.log("\nTest 7: Test d'export complet (simulation)");
if (characters.length > 0 && characters[0].isOwner) {
  const testCharacter = characters[0];
  console.log(`Simulation d'export pour: ${testCharacter.name}`);

  try {
    // Simuler l'export sans télécharger
    const characterData = ArsMagicaCharacterExport.extractCharacterData(testCharacter);
    const htmlContent = ArsMagicaCharacterExport.generateHTML(characterData);

    console.log('✅ Export simulé avec succès');
    console.log('Données extraites:', Object.keys(characterData));
    console.log('HTML généré:', htmlContent.substring(0, 200) + '...');
  } catch (error) {
    console.log("❌ Erreur lors de l'export simulé:", error);
  }
} else {
  console.log("⚠️ Impossible de tester l'export - aucun personnage ou pas de permissions");
}

// Résumé des tests
console.log('\n=== Résumé des tests ===');
console.log('Pour tester complètement le module:');
console.log("1. Assurez-vous d'avoir au moins un personnage dans votre monde");
console.log('2. Ouvrez la fiche du personnage');
console.log("3. Vérifiez que le bouton 'Exporter en PDF' apparaît");
console.log("4. Cliquez sur le bouton pour tester l'export");

console.log('\n=== Fin des tests ===');
