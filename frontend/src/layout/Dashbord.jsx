import React, { useEffect, useState } from 'react';
import { Menu, ChevronDown, ChevronUp, Home, BarChart3, Users, Settings, HelpCircle, Target, Star, Calendar, Sidebar } from 'lucide-react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
/* import BarCharts from '../Components/BarChart'; */
import SideBar from "../Components/SideBar"
import { Link } from 'react-router-dom';
import { countProjectsByStatus, getAllProjects } from '../../api/projet';


const Dashboard = () => {
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(true);
  const [dataProjet, setDataProjet] = useState([])

  console.log(dataProjet)


  const [openSubmenu, setOpenSubmenu] = useState('');
  useEffect(() => {
    // Lancement des appels API au chargement
    const loadData = async () => {
      try {
        await Promise.all([
          getCountStatus(),
          fetchAllProjects()
        ]);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        // Mettez loading à false après que toutes les requêtes sont terminées
        setLoading(false);
      }
    };

    loadData();
  }, []);


  const getCountStatus = async () => {
    try {
      const { data } = await countProjectsByStatus();
      setStatus(data);
    } catch (error) {
      console.error('Erreur lors du chargement des statuts de projets :', error);
    } finally {
      setLoading(false);
    }

  };

  const fetchAllProjects = async () => {
    try {
      const data = await getAllProjects()
      setDataProjet([data])

    } catch (error) {
      console.error(error)

    } finally {
      // Assurez-vous que loading est mis à false même si une erreur se produit
      setLoading(false);
    }

  }

  let totalEnCours = 0;

  status?.forEach(item => {
    
  
  });
  
  <p className="text-3xl font-bold text-gray-900">
    {totalEnCours}
  </p>





  if (loading) return <p>Chargement...</p>;

  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      <SideBar />
      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="lg:hidden">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
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
              Déconnexion
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center justify-between mb-8">
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

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#e8f5f1] p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-600">Projet en cours</h3>
              <button className="p-1 hover:bg-white/20 rounded">
                <Menu className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            {
              status?.map((data, index) => {
                if (data.statut == "En cours d’examen") {
                  return (
                    <p key={index} className="text-3xl font-bold text-gray-900">
                      {data.total}
                    </p>
                  );
                }
                return null;
              })
            }


          </div>

          <div className="bg-[#f0fd50] p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-600">Projet </h3>
              <button className="p-1 hover:bg-white/20 rounded">
                <Menu className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            {
           <p className="text-3xl font-bold text-gray-900">
           {totalEnCours}
         </p>
            }
            {/* <p className="text-3xl font-bold text-gray-900">4</p> */}
          </div>

          <div className="bg-[#e9e5ff] p-6 rounded-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-medium text-gray-600">Projet terminés</h3>
              <div className="flex items-center space-x-1 text-green-600 text-sm">
                <span>3%</span>
                <ChevronUp className="w-4 h-4" />
              </div>
            </div>
            {
              status?.map((data, index) => {
                if (data.statut == "Validé") {
                  return (
                    <p key={index} className="text-3xl font-bold text-gray-900">
                      {data.total }
                    </p>
                  );
                }
                return null;
              })
            }
          </div>
        </div>

        {/* Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 projetFromUser " >
          {/* Patient History */}
          <div className="lg:col-span-3 bg-white rounded-xl p-6 shadow-sm " >
            <div className="patient-history-section ">
              <div className='histo'>

                <h3>Projet à examinés</h3>
                <div className="flex items-center space-x-2">
                  {/* <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-lg border shadow-sm hover:bg-gray-50">
                    <span>{selectedTeam}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button> */}

                  {/* moteur de recherche */}



                  {/* moteur de recherche */}

                  <form class="max-w-lg mx-auto">
                    <div class="flex">
                      <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                      <button id="dropdown-button" data-dropdown-toggle="dropdown" class="shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                      </svg></button>
                      <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
                          <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
                          </li>
                          <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
                          </li>
                          <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
                          </li>
                          <li>
                            <button type="button" class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
                          </li>
                        </ul>
                      </div>
                      <div class="relative w-full">
                        <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required />
                        <button type="submit" class="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                          </svg>
                          <span class="sr-only">Search</span>
                        </button>
                      </div>
                    </div>
                  </form>

                </div>
              </div>
              {/*  {
              dataProjet.map((data,index)=>{
                console.log(data.data)
                data.data.map((data,index)=>{
                  if(data.statut == 'En cours d’examen'){
                    return(

                    )
                  }               
                })
              })           
              } */}
              {/*  {console.log(dataProjet)} */}


              {/*  <div className="patient-table">
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom(s)</th>
                      <th>Type de Projet</th>
                      <th>Forme Juridique</th>
                      <th>Statut</th>
                      <th>Action</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="patient-info">
                          <div>
                            <h4>Michel Dupont</h4>
                            <p>Développement • 10:00 AM</p>
                          </div>
                        </div>
                      </td>
                      <td>Michel</td>
                      <td>En Développement</td>
                      <td>SARL</td>
                      <td>

                        <span class="inline-flex items-center bg-yellow-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-red-300">
                          <span class="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                          Unavailable
                        </span>
                      </td>
                      <td >
                        <div className="actions">
                          <a href="project-detail.html?id=P-2025-002" class="btn-icon view" title="Voir"><span>👁️</span></a>
                          <a href="project-pdf.html?id=P-2025-002" class="btn-icon pdf" title="PDF"><span>📄</span></a>
                          <a href="project-email.html?id=P-2025-002" class="btn-icon email" title="Email"><span>📧</span></a>

                        </div>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="patient-info">
                          <div>
                            <h4>Marie Curie</h4>
                            <p>Création • 11:30 AM</p>
                          </div>
                        </div>
                      </td>
                      <td>Marie</td>
                      <td>En Création</td>
                      <td>SAS</td>
                      <td>
                        <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                          Available
                        </span>
                      </td>
                      <td >
                        <div className="actions">
                          <a href="project-detail.html?id=P-2025-002" class="btn-icon view" title="Voir"><span>👁️</span></a>
                          <a href="project-pdf.html?id=P-2025-002" class="btn-icon pdf" title="PDF"><span>📄</span></a>
                          <a href="project-email.html?id=P-2025-002" class="btn-icon email" title="Email"><span>📧</span></a>

                        </div>

                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="patient-info">
                          <div>
                            <h4>Paul Durand</h4>
                            <p>Création • 1:30 PM</p>
                          </div>
                        </div>
                      </td>
                      <td>Paul</td>
                      <td>En Création</td>
                      <td>SA</td>
                      <td>

                        <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                          <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                          Unavailable
                        </span>
                      </td>
                      <td >
                        <div className="actions">
                          <a href="project-detail.html?id=P-2025-002" class="btn-icon view" title="Voir"><span>👁️</span></a>
                          <a href="project-pdf.html?id=P-2025-002" class="btn-icon pdf" title="PDF"><span>📄</span></a>
                          <a href="project-email.html?id=P-2025-002" class="btn-icon email" title="Email"><span>📧</span></a>

                        </div>

                      </td>
                    </tr>
                  </tbody>
                </table>
              </div> */}

              <div className="patient-table">
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prénom(s)</th>
                      <th>Type de Projet</th>
                      <th>Forme Juridique</th>
                      <th>Statut</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataProjet.map((data, index) =>
                      data.data.map((projet, i) => (
                        projet.statut === "En cours d’examen" && (
                          <tr key={i}>
                            {console.log(projet.fichiers[0])}
                            <td>
                              <div className="patient-info">
                                <div>
                                  <h4>{projet.promoteur.nom} {projet.promoteur.prenoms}</h4>
                                  <p>{projet.type_projet} • {new Date(projet.createdAt).toLocaleTimeString()}</p>
                                </div>
                              </div>
                            </td>
                            <td>{projet.promoteur.prenoms}</td>
                            <td>{projet.type_projet}</td>
                            <td>{projet.forme_juridique}</td>
                            <td>
                              <span className="inline-flex items-center bg-yellow-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-red-300">
                                <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                                {projet.statut}
                              </span>
                            </td>
                            <td>
                              <div className="actions">
                                {projet.fichiers.length > 0 && (
                                  <a
                                    href={`http://localhost:3000/api/pdf/${projet.fichiers[2].chemin_fichier}`}
                                    className="btn-icon view"
                                    title="Voir"
                                  >
                                    👁️
                                  </a>
                                )}
                                <a href={`projet_detail/${projet.id}`} className="btn-icon pdf" title="PDF">
                                  📄
                                </a>

                              </div>
                            </td>

                          </tr>
                        )
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          {/* Budget Usage */}
          {/*    <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Utilisation du Budget</h2>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Menu className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="mb-4">
              <span className="text-3xl font-bold text-gray-900">$50,734</span>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Non utilisé</span>
                <span className="text-sm font-medium text-gray-900">50%</span>
              </div>
              <div className="h-2 bg-[#e9e5ff] rounded-full" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Utilisé</span>
                <span className="text-sm font-medium text-gray-900">30%</span>
              </div>
              <div className="h-2 bg-[#e8f5f1] rounded-full" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Réservé</span>
                <span className="text-sm font-medium text-gray-900">20%</span>
              </div>
              <div className="h-2 bg-gray-900 rounded-full" />
            </div>
          </div> */}

          {/* Work Efficiency */}
        {/*   <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Efficacité au Travail</h2>
              <button className="p-1 hover:bg-gray-100 rounded">
                <Menu className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="relative h-48">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full h-px bg-gray-200" />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="px-2 py-1 bg-gray-900 text-white text-xs rounded">87%</div>
              </div>
            </div>
          </div> */}

          {/* Activity */}
          {/*   <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-semibold text-gray-900">Activité</h2>
        <span className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">+5%</span>
      </div>
      <button className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white rounded-lg border shadow-sm hover:bg-gray-50">
        <span>{selectedTeam}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
    <div className="flex items-end justify-between h-48">
      {weekDays.map((day, index) => (
        <div key={day} className="flex flex-col items-center space-y-2">
          <div 
            className="w-8 bg-[#e9e5ff] rounded-md transition-all duration-500"
            style={{ height: `${activityData[index] * 2}px` }}
          >
            {activityData[index] === 18 && (
              <div className="relative -top-6 left-1/2 transform -translate-x-1/2">
                <span className="px-1.5 py-0.5 bg-gray-900 text-white text-xs rounded">18</span>
              </div>
            )}
          </div>
          <span className="text-sm text-gray-600">{day}</span>
        </div>
      ))}
    </div>
  </div> */}
          {/*   <BarCharts/> */}



        </div>

      </main>
    </div>
  )
}

export default Dashboard