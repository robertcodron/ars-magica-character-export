/**
 * Test d'intégration complet pour le module Ars Magica Character Export
 * Ce script simule un export complet avec des données d'exemple
 */

console.log("=== Test d'intégration - Ars Magica Character Export ===");

// Fonction pour créer un personnage de test
function createTestCharacter() {
  const testData = {
    name: 'Marcus Aurelius - Test',
    type: 'character',
    img: 'icons/svg/mystery-man.svg',
    system: {
      characteristics: {
        intelligence: { value: 2, label: 'Intelligence' },
        perception: { value: 1, label: 'Perception' },
        strength: { value: 0, label: 'Force' },
        stamina: { value: 1, label: 'Endurance' },
        presence: { value: 0, label: 'Présence' },
        communication: { value: 1, label: 'Communication' },
        dexterity: { value: 0, label: 'Dextérité' },
        quickness: { value: 0, label: 'Rapidité' },
      },
      abilities: {
        academic: { value: 2, label: 'Académique' },
        magic: { value: 3, label: 'Magie' },
        concentration: { value: 2, label: 'Concentration' },
        occult: { value: 2, label: 'Occulte' },
        teaching: { value: 1, label: 'Enseignement' },
      },
      arts: {
        creo: { value: 2, label: 'Creo' },
        rego: { value: 1, label: 'Rego' },
        auram: { value: 2, label: 'Auram' },
        ignem: { value: 1, label: 'Ignem' },
      },
      spells: {
        spell1: {
          name: 'Bouclier de Vent',
          level: 15,
          technique: 'Rego',
          form: 'Auram',
          description: 'Crée un bouclier de vent qui protège contre les projectiles',
          range: 'Personnel',
          duration: 'Concentration',
          target: 'Personnel',
        },
        spell2: {
          name: 'Lueur Magique',
          level: 5,
          technique: 'Creo',
          form: 'Ignem',
          description: 'Crée une source de lumière magique',
          range: 'Personnel',
          duration: 'Soleil',
          target: 'Personnel',
        },
      },
      virtues: {
        virtue1: {
          name: 'Gift',
          description: 'Le personnage possède le Don magique',
        },
      },
      flaws: {
        flaw1: {
          name: 'Twilight Prone',
          description: 'Susceptible de tomber dans le Crépuscule',
        },
      },
      personal: {
        age: 25,
        birthYear: 1195,
        covenant: 'Covenant de Tremere',
        house: 'Tremere',
        gender: 'Masculin',
        nationality: 'Français',
      },
      notes: "Personnage de test pour le module d'export",
    },
    items: [
      {
        name: 'Bâton de Magie',
        type: 'weapon',
        system: {
          description: 'Bâton en bois de chêne avec des runes gravées',
        },
      },
    ],
    effects: [],
    ownership: { [game.user.id]: 3 },
  };

  return testData;
}

// Test principal
async function runIntegrationTest() {
  try {
    console.log("1. Création d'un personnage de test...");

    // Créer un personnage de test
    const testData = createTestCharacter();
    const testActor = await Actor.create(testData);

    if (!testActor) {
      throw new Error('Impossible de créer le personnage de test');
    }

    console.log(`✅ Personnage créé: ${testActor.name} (ID: ${testActor.id})`);

    // Test d'extraction des données
    console.log("2. Test d'extraction des données...");
    const characterData = ArsMagicaCharacterExport.extractCharacterData(testActor);

    console.log('✅ Données extraites avec succès');
    console.log('Sections trouvées:', Object.keys(characterData));

    // Test de génération HTML
    console.log('3. Test de génération HTML...');
    const htmlContent = ArsMagicaCharacterExport.generateHTML(characterData);

    if (htmlContent && htmlContent.includes('<!DOCTYPE html>')) {
      console.log('✅ HTML généré avec succès');
      console.log(`Taille: ${htmlContent.length} caractères`);
    } else {
      throw new Error('Génération HTML échouée');
    }

    // Test de création du blob et téléchargement (simulation)
    console.log('4. Test de création du fichier...');
    const blob = new Blob([htmlContent], { type: 'text/html' });

    if (blob.size > 0) {
      console.log('✅ Blob créé avec succès');
      console.log(`Taille du fichier: ${blob.size} octets`);
    } else {
      throw new Error('Création du blob échouée');
    }

    // Test de l'interface utilisateur
    console.log("5. Test de l'interface utilisateur...");

    // Ouvrir la fiche du personnage
    const sheet = testActor.sheet;
    await sheet.render(true);

    // Attendre que la fiche soit rendue
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Vérifier que le bouton d'export est présent
    const exportButton = sheet.element.find('.export-character-btn');
    if (exportButton.length > 0) {
      console.log("✅ Bouton d'export trouvé dans la fiche");
    } else {
      console.log("⚠️ Bouton d'export non trouvé - vérifiez l'intégration");
    }

    // Fermer la fiche
    sheet.close();

    // Nettoyage
    console.log('6. Nettoyage...');
    await testActor.delete();
    console.log('✅ Personnage de test supprimé');

    console.log("\n=== Test d'intégration réussi ===");
    console.log('Le module fonctionne correctement !');

    return true;
  } catch (error) {
    console.error("❌ Erreur lors du test d'intégration:", error);
    return false;
  }
}

// Fonction pour tester avec un personnage existant
async function testWithExistingCharacter() {
  console.log('\n=== Test avec personnage existant ===');

  const characters = game.actors.filter(actor => actor.type === 'character');

  if (characters.length === 0) {
    console.log('❌ Aucun personnage trouvé pour le test');
    return false;
  }

  const testCharacter = characters[0];
  console.log(`Test avec: ${testCharacter.name}`);

  try {
    // Test d'extraction
    const characterData = ArsMagicaCharacterExport.extractCharacterData(testCharacter);
    console.log('✅ Extraction réussie');

    // Test de génération HTML
    const htmlContent = ArsMagicaCharacterExport.generateHTML(characterData);
    console.log('✅ Génération HTML réussie');

    // Afficher un aperçu des données
    console.log('Aperçu des données extraites:');
    console.log('- Nom:', characterData.name);
    console.log('- Type:', characterData.type);
    console.log('- Caractéristiques:', Object.keys(characterData.system.characteristics || {}));
    console.log('- Compétences:', Object.keys(characterData.system.abilities || {}));
    console.log('- Sorts:', Object.keys(characterData.system.spells || {}));
    console.log('- Items:', characterData.items.length);

    return true;
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
    return false;
  }
}

// Exécuter les tests
console.log('Démarrage des tests...');

// Test avec personnage existant d'abord
testWithExistingCharacter().then(success => {
  if (success) {
    console.log('\nTest avec personnage existant: ✅ RÉUSSI');
  } else {
    console.log('\nTest avec personnage existant: ❌ ÉCHOUÉ');
  }

  // Demander si l'utilisateur veut créer un personnage de test
  console.log('\nVoulez-vous créer un personnage de test pour un test complet ?');
  console.log('Exécutez: runIntegrationTest()');
});

// Exporter les fonctions pour utilisation manuelle
window.runIntegrationTest = runIntegrationTest;
window.testWithExistingCharacter = testWithExistingCharacter;

console.log('\n=== Tests disponibles ===');
console.log('- runIntegrationTest(): Test complet avec création de personnage');
console.log('- testWithExistingCharacter(): Test avec personnage existant');
