import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Sidebars from '../Components/SideBar';
import Navbar from '../Components/Navbar';
import { creerProjet } from '../../api/projet';

const Login = () => {
  const formik = useFormik({
    initialValues: {
      nom: '',
      prenom: '',
      dateNaissance: '',
      lieuNaissance: '',
      typeProjet: '',
      formeJuridique: '',
      numeroCNI: '',
      email:'',
      cniFile: null,
      identiteFile: null,
      planAffairesFile: null,
    },
    validationSchema: Yup.object({
      nom: Yup.string().required('Le nom est requis.'),
      prenom: Yup.string().required('Le prénom est requis.'),
      dateNaissance: Yup.date().required('La date de naissance est requise.'),
      lieuNaissance: Yup.string().required('Le lieu de naissance est requis.'),
      typeProjet: Yup.string().required('Veuillez sélectionner un type de projet.'),
      formeJuridique: Yup.string().required('Veuillez sélectionner une forme juridique.'),
      numeroCNI: Yup.string().required('Le numéro de CNI est requis.'),
      email: Yup.string().email("Adresse e-mail invalide").required("L'e-mail est requis."),
      cniFile: Yup.mixed().required('Veuillez télécharger une copie de la CNI.')
        .test('fileSize', 'La taille du fichier est trop grande.', value => value && value.size <= 5242880) // 5MB max
        .test('fileType', 'Le format du fichier doit être PDF.', value => value && value.type === 'application/pdf'),
      identiteFile: Yup.mixed().required("Veuillez télécharger une photo d'identité.")
        .test('fileSize', 'La taille du fichier est trop grande.', value => value && value.size <= 5242880) // 5MB max
        .test('fileType', 'Le format du fichier doit être PDF.', value => value && value.type === 'application/pdf'),
      planAffairesFile: Yup.mixed().required("Veuillez télécharger un plan d'affaires.")
        .test('fileSize', 'La taille du fichier est trop grande.', value => value && value.size <= 5242880) // 5MB max
        .test('fileType', 'Le format du fichier doit être PDF.', value => value && value.type === 'application/pdf'),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        
        formData.append('nom', values.nom);
        formData.append('prenom', values.prenom);
        formData.append('dateNaissance', values.dateNaissance);
        formData.append('lieuNaissance', values.lieuNaissance);
        formData.append('typeProjet', values.typeProjet);
        formData.append('formeJuridique', values.formeJuridique);
        formData.append('numeroCNI', values.numeroCNI);
        formData.append('email', values.email);
    
        formData.append('cniFile', values.cniFile);
        formData.append('identiteFile', values.identiteFile);
        formData.append('planAffairesFile', values.planAffairesFile);
    
        const data = await creerProjet(formData); // 👈 utiliser formData ici
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Gérer les erreurs pour le débogage
  const handleFileChange = (event, fieldName) => {
    const file = event.currentTarget.files[0];
    console.log(`File selected for ${fieldName}:`, file);
    formik.setFieldValue(fieldName, file);
  };

  return (
    <>
      <Navbar/>
      <div className="bg-gray-50 dark:bg-gray-900">  
        <div className="flex flex-col md:flex-row py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
          <div className="mr-auto place-self-center md:w-1/2 mb-10 md:mb-0">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Identification
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Connectez-vous pour accéder à votre espace personnel et gérer vos projets.
            </p>
          </div>

          <div className="md:w-1/2">
            <div className="w-full p-6 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Inscription</h2>
              <form onSubmit={formik.handleSubmit} className="space-y-3" enctype="multipart/form-data">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="nom" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Nom</label>
                    <input 
                      type="text" 
                      name="nom" 
                      id="nom" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="Votre nom" 
                      onChange={formik.handleChange} 
                      value={formik.values.nom}
                    />
                    {formik.errors.nom && formik.touched.nom && <p className="text-red-500 text-xs">{formik.errors.nom}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="prenom" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Prénom(s)</label>
                    <input 
                      type="text" 
                      name="prenom" 
                      id="prenom" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="Votre prénom" 
                      onChange={formik.handleChange} 
                      value={formik.values.prenom}
                    />
                    {formik.errors.prenom && formik.touched.prenom && <p className="text-red-500 text-xs">{formik.errors.prenom}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="dateNaissance" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Date de naissance</label>
                    <input 
                      type="date" 
                      name="dateNaissance" 
                      id="dateNaissance" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                      onChange={formik.handleChange} 
                      value={formik.values.dateNaissance}
                    />
                    {formik.errors.dateNaissance && formik.touched.dateNaissance && <p className="text-red-500 text-xs">{formik.errors.dateNaissance}</p>}
                  </div>

                  <div>
                    <label htmlFor="lieuNaissance" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Lieu de naissance</label>
                    <input 
                      type="text" 
                      name="lieuNaissance" 
                      id="lieuNaissance" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="Ville de naissance" 
                      onChange={formik.handleChange} 
                      value={formik.values.lieuNaissance}
                    />
                    {formik.errors.lieuNaissance && formik.touched.lieuNaissance && <p className="text-red-500 text-xs">{formik.errors.lieuNaissance}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="typeProjet" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Type de projet</label>
                    <select 
                      name="typeProjet" 
                      id="typeProjet" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                      onChange={formik.handleChange} 
                      value={formik.values.typeProjet}
                    >
                      <option value="">Sélectionnez</option>
                      <option value="En Développement">En Développement</option>
                      <option value="En Création">En Création</option>
                    </select>
                    {formik.errors.typeProjet && formik.touched.typeProjet && <p className="text-red-500 text-xs">{formik.errors.typeProjet}</p>}
                  </div>

                  <div>
                    <label htmlFor="formeJuridique" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Forme juridique</label>
                    <select 
                      name="formeJuridique" 
                      id="formeJuridique" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                      onChange={formik.handleChange} 
                      value={formik.values.formeJuridique}
                    >
                      <option value="">Sélectionnez</option>
                      <option value="SARL">SARL</option>
                      <option value="SAS">SAS</option>
                    </select>
                    {formik.errors.formeJuridique && formik.touched.formeJuridique && <p className="text-red-500 text-xs">{formik.errors.formeJuridique}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="numeroCNI" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Numéro de CNI</label>
                  <input 
                    type="text" 
                    name="numeroCNI" 
                    id="numeroCNI" 
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
                    placeholder="Numéro de carte d'identité" 
                    onChange={formik.handleChange} 
                    value={formik.values.numeroCNI}
                  />
                  {formik.errors.numeroCNI && formik.touched.numeroCNI && <p className="text-red-500 text-xs">{formik.errors.numeroCNI}</p>}
                </div>
                <div>
  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Adresse e-mail</label>
  <input 
    type="email" 
    name="email" 
    id="email" 
    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" 
    placeholder="Votre adresse e-mail" 
    onChange={formik.handleChange} 
    value={formik.values.email}
  />
  {formik.errors.email && formik.touched.email && (
    <p className="text-red-500 text-xs">{formik.errors.email}</p>
  )}
</div>



                </div>

              

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="cniFile" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Copie de la CNI (PDF)</label>
                    <input 
                      type="file" 
                      name="cniFile" 
                      id="cniFile" 
                      accept="application/pdf"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2" 
                      onChange={(event) => handleFileChange(event, "cniFile")}
                    />
                    {formik.errors.cniFile && formik.touched.cniFile && <p className="text-red-500 text-xs">{formik.errors.cniFile}</p>}
                  </div>

                  <div>
                    <label htmlFor="identiteFile" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Photo d'identité (PDF)</label>
                    <input 
                      type="file" 
                      name="identiteFile" 
                      id="identiteFile" 
                      accept="application/pdf"
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2" 
                      onChange={(event) => handleFileChange(event, "identiteFile")}
                    />
                    {formik.errors.identiteFile && formik.touched.identiteFile && <p className="text-red-500 text-xs">{formik.errors.identiteFile}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="planAffairesFile" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">Plan d'affaires (PDF)</label>
                  <input 
                    type="file" 
                    name="planAffairesFile" 
                    id="planAffairesFile" 
                    accept="application/pdf"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-2" 
                    onChange={(event) => handleFileChange(event, "planAffairesFile")}
                  />
                  {formik.errors.planAffairesFile && formik.touched.planAffairesFile && <p className="text-red-500 text-xs">{formik.errors.planAffairesFile}</p>}
                </div>

                <button 
                  type="submit" 
                  className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-2"
                >
                  Soumettre
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;