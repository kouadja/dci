import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import viteLogo from '/vite.svg'

import Dashboard from './layout/Dashbord'
import Login from './layout/Login'
import Navbar from './Components/Navbar'
import 'flowbite';
import DetailProject  from './layout/DetailProject';
import ProjectAll from './layout/ProjectAll';
import ProjetValideRecap from './Components/ProjetValideRecap';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   
 <Router>
    {/*   <Navbar /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projet_detail/:id" element={<DetailProject />} />
        <Route path="/projet_all" element={<ProjectAll />} />
        <Route path="/generate/:id" element={<ProjetValideRecap />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
