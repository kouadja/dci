import React, { useEffect, useState } from 'react'
import SideBar  from "../Components/SideBar"
import { Link } from 'react-router-dom';
import { Menu, ChevronDown, ChevronUp, Home, BarChart3, Users, Settings, HelpCircle, Target, Star, Calendar, Sidebar } from 'lucide-react';
import { getAllProjects, searchProjects } from '../../api/projet';


const ProjectAll = () => {
    const [data,setData]= useState([])
  
    const [filters, setFilters] = useState({
      status: 'all',
      type: 'all',
      date: 'all',
    });

    const handleFilterChange = (event) => {
      const { id, value } = event.target;
      setFilters((prevFilters) => ({
        ...prevFilters,  // Garde les autres filtres inchangés
        [id]: value,     // Met à jour uniquement le filtre concerné
      }));
      console.log(filters)
      fetchSearch(filters)
    };
  

const fetchAllProjet = async ()=>{
  const {data} = await getAllProjects()
  setData(data)
}

useEffect(()=>{
  fetchAllProjet()
},[])


const fetchSearch  = async(filters) =>{
  const data = await searchProjects(filters)
  console.log(data)
}


  return (
    <div className="admin-container">
   
   <SideBar/>
    <main className="admin-content">
    <main className="flex-1 ">
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
          </main>
      

        <section className="filter-tools">
            <div className="search-box">
                <input type="text" placeholder="Rechercher un projet..." id="search-projects"/>
{/*                 <button className="btn-search"><span>🔍</span></button>
 */}            </div>

            {/* <div className="filter-options">
                <div className="filter-group">
                    <label for="filter-status">Statut:</label>
                    <select id="filter-status">
                        <option value="all">Tous</option>
                        <option value="pending">En Attente</option>
                        <option value="validated">Validé</option>
                        <option value="rejected">Rejeté</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label for="filter-type">Type:</label>
                    <select id="filter-type">
                        <option value="all">Tous</option>
                        <option value="en-developpement">En Développement</option>
                        <option value="en-creation">En Création</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label for="filter-date">Période:</label>
                    <select id="filter-date">
                        <option value="all">Toutes les dates</option>
                        <option value="today">Aujourd'hui</option>
                        <option value="week">Cette semaine</option>
                        <option value="month">Ce mois</option>
                    </select>
                </div>
            </div> */}

<div>
      <form >
        <div className="filter-options">
          <div className="filter-group">
            <label htmlFor="status">Statut:</label>
            <select id="status" value={filters.status} onChange={handleFilterChange}>
              <option value="all">Tous</option>
              <option value="pending">En Attente</option>
              <option value="validated">Validé</option>
              <option value="rejected">Rejeté</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="type">Type:</label>
            <select id="type" value={filters.type} onChange={handleFilterChange}>
              <option value="all">Tous</option>
              <option value="en-developpement">En Développement</option>
              <option value="en-creation">En Création</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="date">Période:</label>
            <select id="date" value={filters.date} onChange={handleFilterChange}>
              <option value="all">Toutes les dates</option>
              <option value="today">Aujourd'hui</option>
              <option value="week">Cette semaine</option>
              <option value="month">Ce mois</option>
            </select>
          </div>
        </div>
        
        <button type="submit">Filtrer</button>
      </form>
    </div>

            {/* <div className="action-buttons">
                <button className="btn secondary" id="export-xlsx">Exporter XLSX</button>
                <button className="btn secondary" id="generate-all-pdf">Générer PDF</button>
            </div> */}
        </section>

        <section className="projects-list">
            <div className="table-container">

             
                <table className="data-table">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="select-all"/></th>
                            <th>ID <span className="sort-icon">⇅</span></th>
                            <th>Nom <span className="sort-icon">⇅</span></th>
                            <th>Type <span className="sort-icon">⇅</span></th>
                            <th>Forme Juridique <span className="sort-icon">⇅</span></th>
                            <th>Date de Soumission <span className="sort-icon">⇅</span></th>
                            <th>Statut <span className="sort-icon">⇅</span></th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    {data.map((data,index)=>{
                        const isEven = index % 2 === 1;
                        let statusClass = '';
                        let statusDotColor = '';

switch (data.statut) {
  case 'Validé':
    statusClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
    statusDotColor = 'bg-green-500';
    break;
  case 'Refusé':
    statusClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    statusDotColor = 'bg-red-500';
    break;
  case 'En attente':
  default:
    statusClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    statusDotColor = 'bg-yellow-500';
    break;
}
                      
                      return(
                        <tr key={index} className={isEven ? 'bg-[#e9e5ff]' : ''}>
                        <td><input type="checkbox" className="select-project"/></td>
                        <td> {data.id} </td>
                        <td>  {data.promoteur.nom}  </td>
                        <td>{data.type_projet}</td>
                        <td>{data.forme_juridique}</td>
                        <td>2025-03-28</td>
                        <td>  <span className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${statusClass}`}>
                      <span class={`w-2 h-2 me-1 rounded-full ${statusDotColor}`}></span>
                      {data.statut}
                    </span></td>
                        <td className="actions">
                            <a href={`projet_detail/${data.id}`} className="btn-icon view" title="Voir"><span>👁️</span></a>

                        </td>
                    </tr>
                      )
                      
                
              })}
                       {/*  <tr>
                            <td><input type="checkbox" className="select-project"/></td>
                            <td>P-2025-001</td>
                            <td>Konan Jean</td>
                            <td>En Développement</td>
                            <td>SARL</td>
                            <td>2025-03-28</td>
                            <td>  <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                          Available
                        </span></td>
                            <td className="actions">
                                <a href="project-detail.html?id=P-2025-001" className="btn-icon view" title="Voir"><span>👁️</span></a>
                                <a href="project-validate.html?id=P-2025-001" className="btn-icon validate" title="Valider"><span>✅</span></a>
                                <a href="project-reject.html?id=P-2025-001" className="btn-icon reject" title="Rejeter"><span>❌</span></a>
                            </td>
                        </tr>
                        <tr className='bg-[#e9e5ff]'>
                            <td><input type="checkbox" className="select-project"/></td>
                            <td>P-2025-002</td>
                            <td>Bamba Aminata</td>
                            <td>En Création</td>
                            <td>Entreprise Individuelle</td>
                            <td>2025-03-27</td>
                            <td>   <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                          <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                          Unavailable
                        </span></td>
                            <td className="actions">
                                <a href="project-detail.html?id=P-2025-002" className="btn-icon view" title="Voir"><span>👁️</span></a>
                                <a href="project-pdf.html?id=P-2025-002" className="btn-icon pdf" title="PDF"><span>📄</span></a>
                                <a href="project-email.html?id=P-2025-002" className="btn-icon email" title="Email"><span>📧</span></a>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" className="select-project"/></td>
                            <td>P-2025-003</td>
                            <td>Kouassi Paul</td>
                            <td>En Développement</td>
                            <td>SAS</td>
                            <td>2025-03-26</td>
                            <td><span class="inline-flex items-center bg-yellow-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-red-300">
                          <span class="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                          Unavailable
                        </span></td>
                            <td className="actions">
                                <a href="project-detail.html?id=P-2025-003" className="btn-icon view" title="Voir"><span>👁️</span></a>
                                <a href="project-email.html?id=P-2025-003" className="btn-icon email" title="Email"><span>📧</span></a>
                            </td>
                        </tr>
                        <tr className='bg-[#e9e5ff]'>
                            <td><input type="checkbox" className="select-project"/></td>
                            <td>P-2025-004</td>
                            <td>Diallo Fatou</td>
                            <td>En Création</td>
                            <td>SA</td>
                            <td>2025-03-25</td>
                            <td><span class="inline-flex items-center bg-yellow-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-red-300">
                          <span class="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                          Unavailable
                        </span></td>
                            <td className="actions">
                                <a href="project-detail.html?id=P-2025-004" className="btn-icon view" title="Voir"><span>👁️</span></a>
                                <a href="project-pdf.html?id=P-2025-004" className="btn-icon pdf" title="PDF"><span>📄</span></a>
                                <a href="project-email.html?id=P-2025-004" className="btn-icon email" title="Email"><span>📧</span></a>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" className="select-project"/></td>
                            <td>P-2025-005</td>
                            <td>Yao Marie</td>
                            <td>En Développement</td>
                            <td>EURL</td>
                            <td>2025-03-24</td>
                            <td><span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                          <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                          Available
                        </span></td>
                            <td className="actions">
                                <Link to="/projet_detail/1">
                                <span>👁️</span>
                                </Link>
                                <a href="project-validate.html?id=P-2025-005" className="btn-icon validate" title="Valider"><span>✅</span></a>
                                <a href="project-reject.html?id=P-2025-005" className="btn-icon reject" title="Rejeter"><span>❌</span></a>
                            </td>
                        </tr> */}
                    </tbody>
                </table>

                
            </div>

            <div className="pagination">
                <button className="btn-page" disabled>«</button>
                <button className="btn-page active">1</button>
                <button className="btn-page">2</button>
                <button className="btn-page">3</button>
                <button className="btn-page">»</button>
            </div>
        </section>
    </main>
</div>
  )
}

export default ProjectAll