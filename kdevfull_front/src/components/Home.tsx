'use client';

import { useEffect, useState } from 'react';
import { authService } from '@/services/authService';
import Projects from './Projects';
import Assignments from './Assignments';

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'projects' | 'assignments'>('home');

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      window.location.href = '/login';
      return;
    }
    
    const userData = authService.getUserFromToken();
    if (userData) {
      setUser(userData.sub);
      setUserRole(userData.role);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  if (currentView === 'projects') {
    return <Projects onBack={() => setCurrentView('home')} />;
  }

  if (currentView === 'assignments') {
    return <Assignments onBack={() => setCurrentView('home')} />;
  }

  if (!user || !userRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Panel de Control - {userRole}
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Bienvenido, {user}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {userRole === 'ADMIN' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold">P</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Gestión de Proyectos
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Administrar todos los proyectos
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <button 
                      onClick={() => setCurrentView('projects')}
                      className="font-medium text-green-600 hover:text-green-500"
                    >
                      Ver todos los proyectos
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold">A</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Ver Mis Asignaciones
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Mis proyectos y tareas asignadas
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <button 
                      onClick={() => setCurrentView('assignments')}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Ver mis asignaciones
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold">U</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Gestión de Usuarios
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Crear y administrar usuarios
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <button 
                      onClick={() => alert('Funcionalidad de gestión de usuarios aún no implementada')}
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Administrar usuarios
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold">P</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Gestión de Proyectos
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Ver y gestionar mis proyectos
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <button 
                      onClick={() => setCurrentView('projects')}
                      className="font-medium text-green-600 hover:text-green-500"
                    >
                      Ver mis proyectos
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                        <span className="text-white font-bold">A</span>
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Ver Mis Asignaciones
                        </dt>
                        <dd className="text-lg font-medium text-gray-900">
                          Mis tareas asignadas
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <button 
                      onClick={() => setCurrentView('assignments')}
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Ver mis asignaciones
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
