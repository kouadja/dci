// src/routes/projet.routes.js
const express = require('express');
const router = express.Router();
const {upload} = require('../middleware/upload'); 
const {getAllProjects,getOneProject,saveProject,searchProjects,countProjectsByStatus,getPdfByFilename,validateProjet} = require('../Controller/PromoteurProjet.controller');

// Route pour récupérer tous les projets avec leurs promoteurs et fichiers
router.get('/projets', getAllProjects);
router.get('/projet/:id', getOneProject);
router.get('/search_projet', searchProjects);
/* router.post('/save_projet',saveProject) */
router.post('/save_projet', upload.fields([
    { name: 'planAffairesFile', maxCount: 1 },
    { name: 'cniFile', maxCount: 1 },
    { name: 'identiteFile', maxCount: 1 }
  ]), saveProject);
  router.get('/statut', countProjectsByStatus);

  router.get("/pdf/uploads/:filename", getPdfByFilename);
  router.put('/valider/:id', validateProjet);






module.exports = router;


