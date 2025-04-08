 import React, { useEffect, useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { useParams } from "react-router-dom";
import { getOneProject } from '../../api/projet';

const ProjetValideRecap = () => {
    const [datas,setDatas] = useState(null)
  const contentRef = useRef();
    const { id }= useParams()
      const [loading, setLoading] = useState(true);
    


const fetchGenerate = async ()=>{
    try {
        
        const {data} = await getOneProject(id)
        setDatas(data)
        setLoading(false)
    } catch (error) {
        console.error(error)
        
    }

    
}

    useEffect(()=>{
  
        fetchGenerate()
    },[])

  const handleDownloadPDF = () => {
    const element = contentRef.current;
    const options = {
      margin: 0.5,
      filename: 'recapitulatif_projet.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(options).from(element).save();
  };

  const handleDownloadCSV = () => {
    const rows = [
      ['Champ', 'Valeur'],
      ['Nom', datas.promoteur.nom],
      ['Email', datas.promoteur.email],
      ['Numéro CNI', datas.promoteur.numero_cni],
      ['Naissance', datas.promoteur.naissance],
      /* ['Titre du projet', datas.titre], */
      ['Type de projet', datas.type_projet],
      ['Forme juridique', datas.forme_juridique],
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'recapitulatif_projet.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
console.log(datas)

if (loading) return <p>Chargement...</p>;

  return (
    <div>
      <div ref={contentRef} style={{ fontFamily: 'Arial, sans-serif', margin: '40px', color: '#333' }}>
        <div style={{ textAlign: 'center', borderBottom: '2px solid #0066cc', paddingBottom: '10px', marginBottom: '30px' }}>
          <h1 style={{ color: '#0066cc' }}>Projet Validé ✅</h1>
          <p>Récapitulatif de la candidature</p>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <div style={{ fontSize: '18px', marginBottom: '10px', color: '#444', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
            Informations du Promoteur
          </div>
          <div style={{ marginLeft: '15px' }}>
            <p><strong>Nom :</strong> {datas?.promoteur.nom}</p>
            <p><strong>Email :</strong> {datas?.promoteur.email}</p>
            <p><strong>Numéro CNI :</strong> {datas?.promoteur.numero_cni}</p>
            <p><strong>Date & Lieu de naissance :</strong> {datas?.promoteur.naissance}</p>
          </div>
        </div>

        <div style={{ marginBottom: '25px' }}>
          <div style={{ fontSize: '18px', marginBottom: '10px', color: '#444', borderBottom: '1px solid #ccc', paddingBottom: '5px' }}>
            Détails du Projet
          </div>
          <div style={{ marginLeft: '15px' }}>
            <p><strong>Titre :</strong> {datas?.titre}</p>
            <p><strong>Type de projet :</strong> {datas?.type_projet}</p>
            <p><strong>Forme juridique :</strong> {datas?.forme_juridique}</p>
          </div>
        </div>

        <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: '#888' }}>
          Généré automatiquement le {new Date().toLocaleDateString()} — Merci de votre participation !
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleDownloadPDF}>📄 Télécharger PDF</button>
        <button onClick={handleDownloadCSV} style={{ marginLeft: '10px' }}>📊 Télécharger CSV</button>
      </div>
    </div>
  );
};

export default ProjetValideRecap;
