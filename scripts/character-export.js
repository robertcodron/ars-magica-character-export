/**
 * Ars Magica Character Export Module
 * Permet d'exporter les informations complètes d'un personnage en PDF
 */

class ArsMagicaCharacterExport {
  constructor() {
    this.name = 'Ars Magica Character Export';
    this.version = '1.0.0';
  }

  /**
   * Initialise le module
   */
  static init() {
    console.log('Ars Magica Character Export | Initialisation du module');

    // Enregistrer les hooks pour ajouter le bouton d'export
    Hooks.on('renderActorSheet', ArsMagicaCharacterExport.addExportButton);

    // Enregistrer les hooks pour les clics sur les boutons
    Hooks.on('renderActorSheet', ArsMagicaCharacterExport.registerButtonHandlers);
  }

  /**
   * Ajoute le bouton d'export à la fiche de personnage
   */
  static addExportButton(sheet, html, data) {
    // Vérifier que c'est une fiche de personnage Ars Magica
    if (!sheet.actor || sheet.actor.type !== 'character') return;

    // Vérifier que l'utilisateur est propriétaire du personnage
    if (!sheet.actor.isOwner) return;

    // Vérifier que le bouton n'existe pas déjà
    if (html.find('.export-character-btn').length > 0) return;

    // Chercher un endroit approprié pour ajouter le bouton sans modifier la structure existante
    let targetContainer = null;

    // Essayer de trouver une section existante où ajouter le bouton
    const possibleContainers = [
      html.find('.tab[data-tab="description"] .form-group').last(),
      html.find('.tab[data-tab="details"] .form-group').last(),
      html.find('.tab[data-tab="main"] .form-group').last(),
      html.find('.sheet-body .form-group').last(),
      html.find('.sheet-content .form-group').last()
    ];

    for (const container of possibleContainers) {
      if (container.length > 0) {
        targetContainer = container;
        break;
      }
    }

    // Si on trouve un conteneur, ajouter le bouton après
    if (targetContainer && targetContainer.length > 0) {
      targetContainer.after(`
        <div class="form-group ars-magica-export-section">
          <label>Export de Personnage</label>
          <button type="button" class="export-character-btn" data-actor-id="${sheet.actor.id}">
            <i class="fas fa-download"></i> Exporter en PDF
          </button>
          <p class="notes">Cliquez pour télécharger un PDF complet de votre personnage</p>
        </div>
      `);
    } else {
      // Si aucun conteneur trouvé, ajouter le bouton dans le header ou footer
      const header = html.find('.sheet-header');
      const footer = html.find('.sheet-footer');
      
      if (header.length > 0) {
        header.append(`
          <div class="ars-magica-export-header">
            <button type="button" class="export-character-btn" data-actor-id="${sheet.actor.id}">
              <i class="fas fa-download"></i> Exporter en PDF
            </button>
          </div>
        `);
      } else if (footer.length > 0) {
        footer.prepend(`
          <div class="ars-magica-export-footer">
            <button type="button" class="export-character-btn" data-actor-id="${sheet.actor.id}">
              <i class="fas fa-download"></i> Exporter en PDF
            </button>
          </div>
        `);
      } else {
        // Dernier recours : ajouter au début du body
        const body = html.find('.sheet-body, .sheet-content');
        if (body.length > 0) {
          body.prepend(`
            <div class="ars-magica-export-floating">
              <button type="button" class="export-character-btn" data-actor-id="${sheet.actor.id}">
                <i class="fas fa-download"></i> Exporter en PDF
              </button>
            </div>
          `);
        }
      }
    }
  }

  /**
   * Enregistre les gestionnaires d'événements pour les boutons
   */
  static registerButtonHandlers(sheet, html, data) {
    html.find('.export-character-btn').click(ArsMagicaCharacterExport.handleExportClick);
  }

  /**
   * Gère le clic sur le bouton d'export
   */
  static async handleExportClick(event) {
    event.preventDefault();
    const actorId = event.currentTarget.dataset.actorId;
    const actor = game.actors.get(actorId);

    if (!actor) {
      ui.notifications.error('Personnage introuvable !');
      return;
    }

    try {
      ui.notifications.info('Génération du PDF en cours...');
      await ArsMagicaCharacterExport.exportCharacterToPDF(actor);
      ui.notifications.info('PDF généré avec succès !');
    } catch (error) {
      console.error("Erreur lors de l'export :", error);
      ui.notifications.error('Erreur lors de la génération du PDF : ' + error.message);
    }
  }

  /**
   * Exporte les données du personnage en PDF
   */
  static async exportCharacterToPDF(actor) {
    // Récupérer toutes les données du personnage
    const characterData = ArsMagicaCharacterExport.extractCharacterData(actor);

    // Générer le HTML pour le PDF
    const htmlContent = ArsMagicaCharacterExport.generateHTML(characterData);

    // Créer et télécharger le PDF
    await ArsMagicaCharacterExport.generatePDF(htmlContent, characterData.name);
  }

  /**
   * Extrait toutes les données du personnage
   */
  static extractCharacterData(actor) {
    const system = actor.system || {};
    const user = game.users.get(
      actor.ownership[game.user.id] ? game.user.id : Object.keys(actor.ownership)[0]
    );

    return {
      // Informations de base
      name: actor.name,
      type: actor.type,
      img: actor.img,

      // Informations utilisateur
      user: user
        ? {
            name: user.name,
            role: user.role,
            active: user.active,
          }
        : null,

      // Données système Ars Magica
      system: {
        // Caractéristiques
        characteristics: system.characteristics || {},

        // Compétences
        abilities: system.abilities || {},

        // Sorts
        spells: system.spells || {},

        // Arts
        arts: system.arts || {},

        // Virtus et Flaws
        virtues: system.virtues || {},
        flaws: system.flaws || {},

        // Informations personnelles
        personal: system.personal || {},

        // Covenants
        covenant: system.covenant || {},

        // Inventaire
        inventory: system.inventory || {},

        // Notes
        notes: system.notes || '',

        // Toutes les autres données
        ...system,
      },

      // Items du personnage
      items: actor.items.map(item => ({
        name: item.name,
        type: item.type,
        system: item.system,
        img: item.img,
      })),

      // Effets actifs
      effects: actor.effects.map(effect => ({
        name: effect.name,
        icon: effect.icon,
        system: effect.system,
      })),

      // Métadonnées
      metadata: {
        id: actor.id,
        folder: actor.folder?.name || 'Aucun dossier',
        created: actor.created,
        modified: actor.modified,
        ownership: actor.ownership,
      },
    };
  }

  /**
   * Génère le HTML pour le PDF
   */
  static generateHTML(data) {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Fiche de Personnage - ${data.name}</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            font-size: 12px;
            line-height: 1.4;
            margin: 20px;
            color: #333;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
            margin-bottom: 20px;
        }
        .character-name {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 5px;
        }
        .section {
            margin-bottom: 20px;
            page-break-inside: avoid;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            background-color: #f0f0f0;
            padding: 5px;
            border-left: 4px solid #000;
            margin-bottom: 10px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
        }
        .info-item {
            border-bottom: 1px solid #ccc;
            padding: 5px 0;
        }
        .info-label {
            font-weight: bold;
            display: inline-block;
            width: 120px;
        }
        .characteristics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin-bottom: 15px;
        }
        .characteristic {
            text-align: center;
            border: 1px solid #000;
            padding: 10px;
        }
        .characteristic-name {
            font-weight: bold;
            margin-bottom: 5px;
        }
        .characteristic-value {
            font-size: 18px;
            font-weight: bold;
        }
        .abilities-list {
            columns: 2;
            column-gap: 20px;
        }
        .ability-item {
            break-inside: avoid;
            margin-bottom: 8px;
            padding: 3px 0;
            border-bottom: 1px dotted #ccc;
        }
        .spells-list {
            columns: 2;
            column-gap: 20px;
        }
        .spell-item {
            break-inside: avoid;
            margin-bottom: 10px;
            padding: 5px;
            border: 1px solid #ddd;
            border-radius: 3px;
        }
        .spell-name {
            font-weight: bold;
            margin-bottom: 3px;
        }
        .spell-details {
            font-size: 10px;
            color: #666;
        }
        .items-list {
            columns: 2;
            column-gap: 20px;
        }
        .item-item {
            break-inside: avoid;
            margin-bottom: 8px;
            padding: 3px 0;
            border-bottom: 1px dotted #ccc;
        }
        .notes {
            background-color: #f9f9f9;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            white-space: pre-wrap;
        }
        .metadata {
            font-size: 10px;
            color: #666;
            border-top: 1px solid #ccc;
            padding-top: 10px;
            margin-top: 20px;
        }
        @media print {
            body { margin: 10px; }
            .section { page-break-inside: avoid; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="character-name">${data.name}</div>
        <div>Personnage Ars Magica</div>
        <div>Exporté le ${new Date().toLocaleDateString('fr-FR')}</div>
    </div>

    <div class="section">
        <div class="section-title">Informations Générales</div>
        <div class="info-grid">
            <div class="info-item">
                <span class="info-label">Nom:</span>
                <span>${data.name}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Type:</span>
                <span>${data.type}</span>
            </div>
            ${
              data.user
                ? `
            <div class="info-item">
                <span class="info-label">Joueur:</span>
                <span>${data.user.name}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Rôle:</span>
                <span>${data.user.role}</span>
            </div>
            `
                : ''
            }
            <div class="info-item">
                <span class="info-label">Dossier:</span>
                <span>${data.metadata.folder}</span>
            </div>
            <div class="info-item">
                <span class="info-label">Créé le:</span>
                <span>${new Date(data.metadata.created).toLocaleDateString('fr-FR')}</span>
            </div>
        </div>
    </div>

    ${
      data.system.characteristics
        ? `
    <div class="section">
        <div class="section-title">Caractéristiques</div>
        <div class="characteristics-grid">
            ${Object.entries(data.system.characteristics)
              .map(
                ([key, value]) => `
                <div class="characteristic">
                    <div class="characteristic-name">${key}</div>
                    <div class="characteristic-value">${value.value || value || 0}</div>
                </div>
            `
              )
              .join('')}
        </div>
    </div>
    `
        : ''
    }

    ${
      data.system.abilities
        ? `
    <div class="section">
        <div class="section-title">Compétences</div>
        <div class="abilities-list">
            ${Object.entries(data.system.abilities)
              .map(
                ([key, ability]) => `
                <div class="ability-item">
                    <strong>${key}:</strong> ${ability.value || ability || 0}
                    ${ability.specialization ? ` (${ability.specialization})` : ''}
                </div>
            `
              )
              .join('')}
        </div>
    </div>
    `
        : ''
    }

    ${
      data.system.spells
        ? `
    <div class="section">
        <div class="section-title">Sorts</div>
        <div class="spells-list">
            ${Object.entries(data.system.spells)
              .map(
                ([key, spell]) => `
                <div class="spell-item">
                    <div class="spell-name">${spell.name || key}</div>
                    <div class="spell-details">
                        ${spell.level ? `Niveau: ${spell.level}` : ''}
                        ${spell.technique ? ` | Technique: ${spell.technique}` : ''}
                        ${spell.form ? ` | Forme: ${spell.form}` : ''}
                        ${spell.description ? `<br>${spell.description}` : ''}
                    </div>
                </div>
            `
              )
              .join('')}
        </div>
    </div>
    `
        : ''
    }

    ${
      data.items.length > 0
        ? `
    <div class="section">
        <div class="section-title">Équipement et Objets</div>
        <div class="items-list">
            ${data.items
              .map(
                item => `
                <div class="item-item">
                    <strong>${item.name}</strong> (${item.type})
                    ${item.system.description ? `<br><em>${item.system.description}</em>` : ''}
                </div>
            `
              )
              .join('')}
        </div>
    </div>
    `
        : ''
    }

    ${
      data.system.notes
        ? `
    <div class="section">
        <div class="section-title">Notes</div>
        <div class="notes">${data.system.notes}</div>
    </div>
    `
        : ''
    }

    <div class="metadata">
        <div><strong>Métadonnées:</strong></div>
        <div>ID: ${data.metadata.id}</div>
        <div>Dernière modification: ${new Date(data.metadata.modified).toLocaleString(
          'fr-FR'
        )}</div>
        <div>Propriétaires: ${Object.keys(data.metadata.ownership).join(', ')}</div>
    </div>
</body>
</html>`;
  }

  /**
   * Génère et télécharge le PDF
   */
  static async generatePDF(htmlContent, filename) {
    // Créer un blob avec le contenu HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });

    // Créer un lien de téléchargement
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ArsMagica_${filename.replace(/[^a-zA-Z0-9]/g, '_')}_${
      new Date().toISOString().split('T')[0]
    }.html`;

    // Déclencher le téléchargement
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Nettoyer l'URL
    URL.revokeObjectURL(url);

    // Afficher un message d'information
    ui.notifications.info(
      "Fichier HTML téléchargé ! Vous pouvez l'ouvrir dans votre navigateur et l'imprimer en PDF."
    );
  }
}

// Initialiser le module quand Foundry est prêt
Hooks.once('ready', () => {
  ArsMagicaCharacterExport.init();
});

// Exporter la classe pour utilisation externe
window.ArsMagicaCharacterExport = ArsMagicaCharacterExport;
