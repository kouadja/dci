#  AEJ-TEST-RECRUTEMENT — Plateforme de Gestion des Projets de Développement

##  Objectif du Projet
Développer une application full-stack permettant aux promoteurs de projet de soumettre leur candidature à travers un formulaire complet et de suivre le statut de leur projet via un back-office administrateur.

---

## Fonctionnalités Implémentées

### Obligatoires
- [x] Formulaire d'inscription avec téléchargement de 3 pièces (CNI, pièce d'identité, plan d'affaires).
- [x] Validation des projets par l'administration (valider ou rejeter avec justification).
- [x] Génération automatique d'un fichier PDF récapitulatif lors de la validation.
- [x] Envoi de notification par e-mail (simulation avec Nodemailer).
- [x] Export des projets au format CSV.

###  Bonus Implémentés
- [x] Conteneurisation avec Docker & Docker Compose (MySQL, PhpMyAdmin, Frontend, Backend).
- [x] Architecture MVC claire côté backend.
- [x] Recherche dynamique par promoteur, type de projet, et statut avec filtres combinés.

---

##  Architecture du Projet

```
mon-projet/
├── backend/
│   ├── src/
│   │   ├── models/       # Sequelize models
│   │   ├── routes/       # Express routes
│   │   ├── controller/   # Logique métier
│   │   ├── utils/        # Envoi mail, PDF, CSV
│   └── Dockerfile
├── frontend/
│   ├── src/              # Composants React
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

##  Technologies Utilisées

### Back-end
- Node.js / Express.js
- Sequelize (ORM)
- MySQL
- Nodemailer (test emails)
- HTML-PDF & CSV Writer (exports)

### Front-end
- React (avec Vite)
- Formik + Yup pour les formulaires

### DevOps
- Docker / Docker Compose
- PhpMyAdmin pour gestion de la DB

---

##  Installation & Exécution

###  Prérequis
- Docker & Docker Compose installés

###  Étapes
```bash
# 1. Cloner le projet
$ git clone https://github.com/ton-compte/aej-test-recrutement.git
$ cd aej-test-recrutement

# 2. Lancer l'application
$ docker-compose up --build
```

### Accès :
- Frontend : http://localhost:5173
- Backend API : http://localhost:3000
- PhpMyAdmin : http://localhost:8080 (user: root / pass: root)
- dashboard : http://localhost:5173/dashboard

---


>  Ce projet démontre des compétences en développement full-stack, gestion d'API REST, Dockerisation, export de fichiers, validation de formulaire, génération PDF/CSV, etc.



