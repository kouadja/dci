import React, { useEffect, useState } from 'react'

import SideBar from "../Components/SideBar"
import { Menu, ChevronDown, ChevronUp, Home, BarChart3, Users, Settings, HelpCircle, Target, Star, Calendar, Sidebar } from 'lucide-react';
import { useParams } from "react-router-dom";
import { getOneProject, validateProjet } from '../../api/projet';
import { Formik, Form, Field } from 'formik';
import ProjetValideRecap from '../Components/ProjetValideRecap';
import { useNavigate } from 'react-router-dom';




const DetailProject = () => {
  const navigate = useNavigate();
  const [validate,setValidate]= useState(null)
  const initialValues = {
    decision: 'validate',
    comment: '',


  };
  const handleSubmit = (values) => {
    console.log("Valeurs du formulaire :", values);
 

  /*   setValidate(values) */
    fetchValidate(values)

    // Ici tu peux appeler une API avec axios par exemple
    // axios.post('/api/validation', values)
  };
  const handleGenerate = (id)=>{
console.log(id)
navigate(`/generate/${id}`); 
  }

  const {id }= useParams()
  const [data,setData]= useState(null)
  const [file,setFile]= useState()
    const [loading, setLoading] = useState(true);
  

  const fetchOneprojet = async ()=>{
    try {
      
      const {data} = await getOneProject(id)
      console.log(data)
      setData(data)
      setFile(data.fichiers)
      setLoading(false)
     
    } catch (error) {
      console.error(error)
      
      
    }


  }
  useEffect(()=>{
    fetchOneprojet()
  
  },[])

  const fetchValidate =  async(value)=>{
    const data = await validateProjet(id,value)
    setValidate(data)
    console.log(data)
  
  }

  const generatePdf = () =>{
  /*   return <ProjetValideRecap data ={data}/> */

  }


 

  if (loading) return <p>Chargement...</p>;

  return (
    <>

      <div className="admin-container">
        <SideBar />
        <main className="flex-1 ">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 ">
            <div className="flex items-center space-x-4">
              <div className="lg:hidden">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
              </div>
              <h1 className="text-2xl font-semibold text-gray-900">PROJET</h1>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Users className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <HelpCircle className="w-5 h-5 text-gray-600" />
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                Option
              </button>
            </div>
          </div>
           <div className="flex items-center justify-between mb-8 ml-8">
                    <div className="flex space-x-4">
                      <button className="px-4 py-2 text-sm font-medium text-gray-900 border-b-2 border-gray-900">Aperçu</button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Employés</button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Tâches</button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-900">Temps de travail</button>
          
                    </div>
                    <button className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border shadow-sm hover:bg-gray-50">
                      <Calendar className="w-4 h-4" />
                      <span>Aug 12 → 24</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                  </div>
          



          <main className="admin-content">


            <section className="project-actions">
              <div className="status-badge">
                <span className="status pending"> {data.statut} </span>
              </div>

              <div className="action-buttons">
                    <button onClick={()=>handleGenerate(id)}  className="btn bg-indigo-600 white  bt" id="export-pdf">Générer PDF</button>
                    <button className="btn secondary bt" id="send-email">Envoyer Email</button>
                    
                </div>
            </section>

            <div className="project-details-container">
              <section className="project-info">
                <h3>Informations du Promoteur</h3>

                <div className="info-grid">
                  <div className="info-item">
                    <label> Nom</label>
                    <p> {data.promoteur.nom} </p>
                  </div>
                  <div className="info-item">
                    <label>Prénom(s):</label>
                    <p> {data.promoteur.prenoms}  </p>
                  </div>
                  <div className="info-item">
                    <label>Date de Naissance:</label>
                    <p>15/06/1985</p>
                  </div>
                  <div className="info-item">
                    <label>Lieu de Naissance:</label>
                    <p> {data.promoteur.lieu_naissance} </p>
                  </div>
                  <div className="info-item">
                    <label>Numéro CNI:</label>
                    <p>  {data.promoteur.numero_cni}</p>
                  </div>
                </div>
                <hr />
                <br />

                <h3>Informations du Projet</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Type de Projet:</label>
                    <p>  {data.type_projet} </p>
                  </div>
                  <div className="info-item">
                    <label>Forme Juridique:</label>
                    <p> {data.forme_juridique} </p>
                  </div>
                  <div className="info-item">
                    <label>Date de Soumission:</label>
                    <p> {data.createdAt} </p>
                  </div>
                  <div className="info-item">
                    <label>Statut:</label>
                    <p> {data.statut} </p>
                  </div>
                </div>
              </section>

              <section className="project-documents">
  <h3>Documents Joints</h3>
  <div className="document-list">
    {file.map((document, index) => (
     /*  console.log(document.chemin_fichier) */
      <div
        key={index}
        className={`document-item ${index % 2 === 0 ? 'bg-[#e9e5ff]' : 'bg-[#f0fd50]'}`}
      >
        <div className="doc-icon">📄</div>
        <div className="doc-info">
          <h4>Nom</h4>
          <p>Type</p>
          <div className="doc-actions">
            <a
              href={`http://localhost:3000/api/pdf/${document.chemin_fichier}`}
              className="btn-icon view-doc"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>👁️</span> Voir
            </a>
            <a
              href={`http://localhost:3000/api/pdf/${document.chemin_fichier}`}
              className="btn-icon download-doc"
              download
            >
              <span>⬇️</span> Télécharger
            </a>
          </div>
        </div>
      </div>
    ))}
  </div>
</section>

            </div>

            <section className="validation-section">
              <div className="content-validations">

                <h3 className=''>Validation du Projet</h3>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {() => (
        <Form id="validation-form">
          <div className="form-group">
            <label htmlFor="decision">Décision:</label>
            <Field as="select" id="decision" name="decision">
              <option value="validate">Valider le projet</option>
              <option value="reject">Rejeter le projet</option>
            </Field>
          </div>

          <div className="form-group">
            <label htmlFor="comment">Commentaire:</label>
            <Field
              as="textarea"
              id="comment"
              name="comment"
              rows="4"
              placeholder="Entrez un commentaire concernant votre décision..."
            />
          </div>

          <div className="form-group checkbox">
            <label>
              <Field type="checkbox" name="sendNotification" />
              Envoyer une notification par email
            </label>
          </div>

          <div className="form-group checkbox">
            <label>
              <Field type="checkbox" name="generatePdf" />
              Générer un document PDF
            </label>
          </div>

          <div className="form-actions">
            <button type="reset" className="btn secondary">Annuler</button>
            <button type="submit" className="btn primary">Soumettre</button>
          </div>
        </Form>
      )}
    </Formik>
              </div>
            </section>
          </main>
          <div className="modal" id="pdf-preview-modal">
            <div className="modal-content">
              <span className="close-modal">&times;</span>
              <h3>Aperçu du Document PDF</h3>
              <div className="pdf-container">
                <iframe src="" id="pdf-preview-frame"></iframe>
              </div>
              {/* <div className="modal-actions">
                <button className="btn secondary" id="download-pdf">Télécharger</button>
                <button className="btn primary" id="send-pdf">Envoyer par Email</button>
              </div> */}
            </div>
          </div>
        </main>





      </div>


    </>
  )
}
export default DetailProject
