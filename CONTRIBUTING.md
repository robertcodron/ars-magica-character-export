# Guide de Contribution

Merci de votre intérêt à contribuer au module Ars Magica Character Export ! Ce guide vous aidera à comprendre comment contribuer efficacement.

## Comment Contribuer

### Signaler un Bug

1. Vérifiez d'abord que le bug n'a pas déjà été signalé dans les [issues existantes](https://github.com/your-repo/ars-magica-character-export/issues)
2. Créez une nouvelle issue en utilisant le template "Bug report"
3. Fournissez toutes les informations demandées dans le template
4. Incluez les logs de la console si possible

### Proposer une Fonctionnalité

1. Vérifiez d'abord que la fonctionnalité n'a pas déjà été proposée
2. Créez une nouvelle issue en utilisant le template "Feature request"
3. Décrivez clairement le problème que la fonctionnalité résoudrait
4. Expliquez comment vous imaginez la fonctionnalité

### Contribuer au Code

1. Fork le repository
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/amazing-feature`)
3. Committez vos changements (`git commit -m 'Add some amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrez une Pull Request

## Standards de Code

### JavaScript

- Utilisez des indentations de 2 espaces
- Utilisez des guillemets simples pour les chaînes
- Ajoutez des commentaires pour expliquer le code complexe
- Suivez les conventions de nommage camelCase
- Utilisez `const` et `let` au lieu de `var`

### CSS

- Utilisez des indentations de 2 espaces
- Organisez les propriétés par ordre logique
- Utilisez des noms de classes descriptifs
- Ajoutez des commentaires pour les sections importantes

### Documentation

- Mettez à jour la documentation pour toute nouvelle fonctionnalité
- Utilisez un langage clair et concis
- Incluez des exemples de code quand c'est approprié
- Mettez à jour le CHANGELOG.md

## Tests

### Tests Locaux

1. Installez le module dans votre instance Foundry VTT de développement
2. Exécutez les tests disponibles dans le dossier `test/`
3. Testez manuellement les nouvelles fonctionnalités
4. Vérifiez que les fonctionnalités existantes fonctionnent toujours

### Tests d'Intégration

```javascript
// Dans la console de Foundry VTT
runIntegrationTest(); // Test complet
testWithExistingCharacter(); // Test avec personnage existant
```

## Structure du Projet

```
ars-magica-character-export/
├── scripts/           # Code JavaScript principal
├── styles/           # Fichiers CSS
├── lang/             # Fichiers de traduction
├── test/             # Scripts de test
├── docs/             # Documentation technique
├── demo/             # Exemples et données de test
└── .github/          # Configuration GitHub
```

## Processus de Review

1. Toutes les contributions passent par une Pull Request
2. Les PR sont reviewées par au moins un mainteneur
3. Les tests doivent passer avant la fusion
4. La documentation doit être mise à jour

## Questions et Support

- Créez une issue pour les questions générales
- Utilisez les discussions GitHub pour les conversations
- Consultez la documentation dans le dossier `docs/`

## Licence

En contribuant, vous acceptez que vos contributions soient sous la même licence que le projet (MIT).

## Remerciements

Merci à tous les contributeurs qui aident à améliorer ce module !

---

## Checklist pour les Contributions

### Avant de Soumettre

- [ ] J'ai testé mes changements localement
- [ ] J'ai mis à jour la documentation si nécessaire
- [ ] J'ai ajouté des tests pour les nouvelles fonctionnalités
- [ ] Mon code suit les standards du projet
- [ ] J'ai vérifié qu'il n'y a pas de conflits de merge
- [ ] J'ai mis à jour le CHANGELOG.md

### Pour les Bugs

- [ ] J'ai vérifié que le bug n'existe pas déjà
- [ ] J'ai fourni des étapes de reproduction claires
- [ ] J'ai inclus les informations sur l'environnement
- [ ] J'ai ajouté des logs de console si disponibles

### Pour les Fonctionnalités

- [ ] J'ai expliqué le problème que la fonctionnalité résout
- [ ] J'ai fourni des exemples d'utilisation
- [ ] J'ai considéré les alternatives
- [ ] J'ai évalué l'impact sur les fonctionnalités existantes
