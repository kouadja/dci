import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const  creerProjet = async (data) => await API.post("/api/save_projet",data)
export const  countProjectsByStatus = async() => await API.get("/api/statut")
export const  getAllProjects = async() => await API.get("/api/projets")
export const  getOneProject = async(id) => await API.get(`/api/projet/${id}`,id)
export const  validateProjet = async(id,values) => await API.put(`api/valider/${id}`, values);
export const searchProjects = async (params) => await API.get(`/api/search_projet`, { params });
  

