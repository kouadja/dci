import React, { useState } from 'react';
import { Menu, ChevronDown, ChevronUp, Home, BarChart3, Users, Settings, HelpCircle, Target, Star, Calendar, Sidebar } from 'lucide-react';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { Link } from 'react-router-dom';
/* import BarCharts from '../Components/BarChart'; */

const Sidebars = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);


  const menuItems = [
    {
      title: 'Accueil',
      icon: <Home className="w-5 h-5" />,
      link:"/dashboard"
      
    },
    {
      title: 'Projets',
      icon: <Users className="w-5 h-5" />,
      link:"/projet_all"
    },
    {
      title: 'Objectifs',
      icon: <Target className="w-5 h-5" />,
      link:"/"
    },
    {
      title: 'Tâches privées',
      icon: <Star className="w-5 h-5" />,
      link:"/"
    },
    {
      title: 'Analytique',
      icon: <BarChart3 className="w-5 h-5" />,
      submenu: [
        { title: 'Aperçu', path: '/analytics/overview' },
        { title: 'Employés', path: '/analytics/employees' },
        { title: 'Tâches', path: '/analytics/tasks' },
        { title: 'Temps de travail', path: '/analytics/worktime' },
      ],
    },
  ];


  const toggleSubmenu = (title) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };


  return (
    <div className="min-h-screen flex bg-[#f8fafc]">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } shadow-sm z-20`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
            </div>
            <span className="text-xl font-semibold text-gray-900">GesProjet</span>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="p-4">
          {menuItems.map((item) => (
            <div key={item.title} className="mb-2">
              <button
                onClick={() => item.submenu && toggleSubmenu(item.title)}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm rounded-lg transition-colors ${openSubmenu === item.title
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  {item.icon}
                
                  <Link to ={item.link}>
                  
                  <span className="font-medium">{item.title}</span>
                  </Link>
                </div>
                {item.submenu && (
                  openSubmenu === item.title ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )
                )}
              </button>

              {/* Submenu with animation */}
              {item.submenu && openSubmenu === item.title && (
                <div className="mt-1 ml-12 space-y-1 animate-fadeIn">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.title}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-colors
                        ${subItem.title === 'Overview'
                          ? 'text-indigo-600 bg-indigo-50 font-medium'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                    >
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
        

       

   

     
    </div>
  )
}

export default Sidebars