

const {Promoteur,Projet,Fichier} = require('../models');
const {sendEmail} = require("../service/emailService")
const { sequelize } = require('../models'); // ou ton chemin vers l'instance Sequelize
const { Op } = require('sequelize');
const path = require("path");
const fs = require("fs"); 


/* console.log('Models disponibles :', Object.keys(models));
 */
const upload = require('../config/multer-config');  // Importer la config multer




/* sendEmail('richmondkouadja03@gmail.com', 'Test Email', 'Ceci est un email de test.');
 */

const countProjectsByStatus = async (req, res) => {
  try {
    const projetsCounts = await Projet.findAll({
      attributes: [
        'statut',
        [sequelize.fn('COUNT', sequelize.col('statut')), 'total']
      ],
      group: ['statut']
    });

    res.status(200).json(projetsCounts);
  } catch (error) {
    console.error('Erreur lors du comptage des projets par statut :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};





const getOneProject = async (req, res) => {
  try {
    const projetId = req.params.id;

    // Rechercher le projet avec le promoteur et les fichiers associés
    const projet = await Projet.findByPk(projetId, {
      include: [
        {
          model: Promoteur,
          as: 'promoteur',
          attributes: ['nom', 'prenoms', 'email', 'numero_cni','date_naissance','lieu_naissance'],

        },
        {
          model: Fichier,
          attributes: ['projetId', 'chemin_fichier', 'type'], // ajoute d'autres champs si besoin
          as: 'fichiers' // alias défini dans Projet.hasMany(Fichier, { as: 'fichiers' })
        }
      ]
    });

    if (!projet) {
      return res.status(404).json({ error: 'Projet non trouvé' });
    }

    res.status(200).json(projet);
  } catch (error) {
    console.error('Erreur lors de la récupération du projet:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};


  const validateProjet = async (req, res) => {
    const { id } = req.params;
    const { decision, comment   } = req.body;
    console.log(req.body)
  
    try {
      // Mise à jour du projet
      const updatedProjet = await Projet.update(
        {
          statut: decision === 'validate' ? 'Validé' : 'Rejeté',
          justification_rejet: comment
        },
        { where: { id } }
      );
  
      // Vérifie si le projet a été trouvé
      if (updatedProjet[0] === 0) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
  
      // Envoi de notification par email
 
      /*   sendEmail({
          to: 'richmondkouadja03@gmail.com', 
          subject: 'Décision sur votre projet',
          text: `Votre projet a été ${decision === 'validate' ? 'validé' : 'rejeté'}.\nCommentaire : ${comment}`
        }); */
      
  
      // Génération de PDF
     /*  if (generatePdf) {
        await generatePDF(id); // fonction à toi qui génère un PDF pour le projet
      } */
  
      return res.status(200).json({ message: 'Projet mis à jour avec succès' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erreur lors de la validation du projet" });
    }
  }







// Récupérer tous les projets avec les informations du promoteur et des fichiers associés
const getAllProjects = async (req, res) => {
  try {
    const projets = await Projet.findAll({
      include: [
        {
          model: Promoteur,
          attributes: ['nom', 'prenoms', 'email', 'numero_cni'],
          as: 'promoteur' // les infos à afficher
        },
        {
          model: Fichier,
          attributes: ['projetId', 'chemin_fichier', 'type'], // ajoute d'autres champs si besoin
          as: 'fichiers' // alias défini dans Projet.hasMany(Fichier, { as: 'fichiers' })
        }
      ]
    });

    res.status(200).json(projets);
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};
// src/controllers/projet.controller.js

// Fonction pour rechercher des projets avec des filtres
/* const searchProjects = async (req, res) => {
  try {
    // Récupérer les paramètres de requête
    const { nomPromoteur, typeProjet, statut } = req.query;

    // Log des paramètres reçus
    console.log('Paramètres de requête:', req.query);  // Log pour inspecter les paramètres de la requête

    // Construire les conditions de recherche dynamiques
    const searchConditions = {};

    // Filtrer par le nom du promoteur (recherche partielle)
    if (nomPromoteur) {
      searchConditions['$promoteur.nom$'] = {
        [Op.like]: `%${nomPromoteur}%`
      };
    }

    // Filtrer par le type de projet
    if (typeProjet) {
      searchConditions.type_projet = {
        [Op.like]: `%${typeProjet}%`
      };
    }

    // Filtrer par le statut du projet
    if (statut) {
      searchConditions.statut = statut;
    }

    console.log('Conditions de recherche:', searchConditions);  // Log pour vérifier les conditions

    // Recherche des projets avec les conditions de filtrage
    const projets = await Projet.findAll({
      where: searchConditions,
      include: [
        {
          model: Promoteur,
          as: 'promoteur',  // Utilisation correcte de l'alias
          attributes: ['nom', 'prenoms', 'email', 'numero_cni']
        }
      ]
    });

    // Vérifier si des projets sont trouvés
    if (projets.length === 0) {
      return res.status(404).json({ message: 'Aucun projet trouvé avec les critères spécifiés' });
    }

    // Retourner les projets trouvés
    res.status(200).json(projets);
  } catch (error) {
    console.error('Erreur lors de la recherche des projets:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
}; */
const searchProjects = async (req, res) => {
  try {
    // Récupérer les paramètres de requête
    const { nomPromoteur, typeProjet, statut } = req.query;
    
    console.log('Paramètres de requête:', req.query);
    
    // Construire les conditions de recherche
    const whereConditions = {};
    const promoteurConditions = {};
    
    // Filtrer par type de projet
    if (typeProjet) {
      whereConditions.type_projet = {
        [Op.like]: `%${typeProjet}%`
      };
    }
    
    // Filtrer par statut - utilisation d'une égalité stricte
    if (statut) {
      // Afficher la valeur exacte pour déboguer
      console.log('Recherche de statut:', statut);
      whereConditions.statut = {
        [Op.eq]: statut
      };
    }
    
    // Filtrer par nom du promoteur
    if (nomPromoteur) {
      promoteurConditions.nom = {
        [Op.like]: `%${nomPromoteur}%`
      };
    }
    
    console.log('Conditions de recherche finales (projet):', JSON.stringify(whereConditions));
    
    // Ajoutez cette requête pour vérifier les données existantes
    const tousLesProjets = await Projet.findAll({
      attributes: ['id', 'statut']
    });
    console.log('Statuts existants dans la base:', tousLesProjets.map(p => p.statut));
    
    // Recherche des projets avec les conditions de filtrage
    const projets = await Projet.findAll({
      where: whereConditions,
      include: [
        {
          model: Promoteur,
          as: 'promoteur',
          attributes: ['nom', 'prenoms', 'email', 'numero_cni'],
          where: Object.keys(promoteurConditions).length > 0 ? promoteurConditions : null
        }
      ],
      logging: console.log // Pour voir la requête SQL générée
    });
    
    console.log(`Nombre de projets trouvés: ${projets.length}`);
    
    // Vérifier si des projets sont trouvés
    if (projets.length === 0) {
      return res.status(404).json({ message: 'Aucun projet trouvé avec les critères spécifiés' });
    }
    
    // Retourner les projets trouvés
    res.status(200).json(projets);
  } catch (error) {
    console.error('Erreur lors de la recherche des projets:', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};








 const saveProject = async (req, res) => {
  const { nom, prenom, dateNaissance, lieuNaissance, numeroCNI, email, typeProjet, formeJuridique } = req.body;

console.log(req.body)
let transaction;
  // Les fichiers envoyés
  const { planAffairesFile, cniFile, identiteFile } = req.files;

  try {
    // Commencer une transaction pour s'assurer que tout est enregistré correctement
     transaction = await sequelize.transaction();

    // Vérifier si l'email existe déjà
    const existingPromoteur = await Promoteur.findOne({ where: { email }, transaction });
    if (existingPromoteur) {
      return res.status(400).json({ message: "Ce promoteur existe déjà avec cet email." });
    }

    // Créer le promoteur
    const promoteur = await Promoteur.create({
      nom:nom,
      prenoms:prenom,
      date_naissance:dateNaissance,
      lieu_naissance:lieuNaissance,
      numero_cni:numeroCNI,
      email
    }, { transaction });

    // Créer le projet en associant le promoteur
    const projet = await Projet.create({
    
      type_projet:typeProjet,
      forme_juridique:formeJuridique,
      promoteurId: promoteur.id  // Associer le promoteur au projet
    }, { transaction });

    // Ajouter les fichiers s'ils existent
    if (planAffairesFile) {
      await Fichier.create({
        type: planAffairesFile[0].mimetype,
        chemin_fichier: planAffairesFile[0].path,
        projetId: projet.id
      }, { transaction });
    }

    if (cniFile) {
      await Fichier.create({
        type: cniFile[0].mimetype,
        chemin_fichier: cniFile[0].path,
        projetId: projet.id
      }, { transaction });
    }

    if (identiteFile) {
      await Fichier.create({
        type: identiteFile[0].mimetype,
        chemin_fichier: identiteFile[0].path,
        projetId: projet.id
      }, { transaction });
    }

    // Envoyer un email de confirmation
/*     sendEmail(email, 'Analyse de projet', `Bonjour M/Mlle ${nom}, 
    Nous avons bien reçu votre candidature. Elle est actuellement en cours d’analyse. Vous serez notifié dès qu’une décision sera prise.
    Merci pour votre confiance.`); */

    // Si tout se passe bien, valider la transaction
    await transaction.commit();

    // Répondre avec les données du promoteur, du projet et des fichiers
    res.status(201).json({
      promoteur,
      projet,
      fichiers: {
        planAffairesFile: planAffairesFile || null,
        cniFile: cniFile || null,
        identiteFile: identiteFile || null
      }
    });
  } catch (error) {
    // En cas d'erreur, annuler la transaction
    if (transaction) await transaction.rollback();
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de l\'enregistrement du projet et du promoteur', error });
  }
};

getPdfByFilename = (req, res) => {
  const { filename } = req.params;

  const filePath = path.join(__dirname, "../../uploads", filename);
  console.log(filePath)

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("Fichier non trouvé :", filePath);
      return res.status(404).json({ error: "Fichier non trouvé" });
    }

    return res.sendFile(filePath);
  });
};






module.exports = { 
  getAllProjects:getAllProjects,
  getOneProject:getOneProject,
  searchProjects:searchProjects,
  saveProject:saveProject,
  countProjectsByStatus:countProjectsByStatus,
  getPdfByFilename:getPdfByFilename,
  validateProjet:validateProjet
 };

 