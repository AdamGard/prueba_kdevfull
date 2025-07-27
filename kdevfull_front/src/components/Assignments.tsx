'use client';

import { useEffect, useState } from 'react';
import { authService } from '@/services/authService';
import { assignmentService, type Task, type TaskFormData, type User, type Project } from '@/services/assignmentService';

interface AssignmentsProps {
  onBack: () => void;
}

export default function Assignments({ onBack }: AssignmentsProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [projectTasks, setProjectTasks] = useState<Task[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string>('');
  const [currentUserId, setCurrentUserId] = useState<number>(0);
  
  const [taskFormData, setTaskFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'PENDING',
    assignedToId: 0,
    projectId: 0,
    dueDate: ''
  });

  useEffect(() => {
    const userData = authService.getUserFromToken();
    if (userData) {
      setCurrentUser(userData.sub);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      loadProjectTasks(selectedProject);
    }
  }, [selectedProject]);

  const loadData = async () => {
    try {
      const [projectsData, usersData, tasksData] = await Promise.all([
        assignmentService.getProjects(),
        assignmentService.getUsers(),
        assignmentService.getTasks()
      ]);
      
      setProjects(projectsData);
      setUsers(usersData);
      setTasks(tasksData);
      
      // Find current user ID
      const currentUserData = usersData.find(user => user.username === currentUser);
      if (currentUserData) {
        setCurrentUserId(currentUserData.id);
      }
    } catch (error) {
      alert('Error al cargar datos');
    } finally {
      setIsLoading(false);
    }
  };

  const loadProjectTasks = async (projectId: number) => {
    try {
      const data = await assignmentService.getTasksByProject(projectId);
      setProjectTasks(data);
    } catch (error) {
      alert('Error al cargar tareas del proyecto');
    }
  };

  const handleCreateTask = (projectId: number) => {
    setTaskFormData({
      title: '',
      description: '',
      status: 'PENDING',
      assignedToId: 0,
      projectId: projectId,
      dueDate: ''
    });
    setEditingTask(null);
    setShowTaskForm(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      assignedToId: task.assignedToId,
      projectId: task.projectId,
      dueDate: task.dueDate
    });
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await assignmentService.updateTask(editingTask.id, taskFormData);
        alert('Tarea actualizada exitosamente');
      } else {
        await assignmentService.createTask(taskFormData);
        alert('Tarea creada exitosamente');
      }
      setShowTaskForm(false);
      loadData();
      if (selectedProject) {
        loadProjectTasks(selectedProject);
      }
    } catch (error) {
      alert('Error al guardar tarea');
    }
  };

  const handleUpdateTaskStatus = async (taskId: number, newStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED') => {
    try {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        const updatedTask = { ...task, status: newStatus };
        await assignmentService.updateTask(taskId, updatedTask);
        alert('Estado actualizado exitosamente');
        loadData();
        if (selectedProject) {
          loadProjectTasks(selectedProject);
        }
      }
    } catch (error) {
      alert('Error al actualizar estado');
    }
  };

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/login';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUserName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.username : 'Usuario no encontrado';
  };

  const getProjectName = (projectId: number) => {
    const project = projects.find(p => p.id === projectId);
    return project ? project.name : 'Proyecto no encontrado';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Cargando asignaciones...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                ← Volver
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Gestión de Asignaciones
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-gray-700 mr-4">Bienvenido, {currentUser}</span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Section: Projects and Task Assignment */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Proyectos y Asignación de Tareas</h2>
              
              {/* Project List */}
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-md font-medium text-gray-900">{project.name}</h3>
                        <p className="text-sm text-gray-600">{project.description}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Owner: {project.ownerUsername}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedProject(project.id)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Ver Tareas
                        </button>
                        <button
                          onClick={() => handleCreateTask(project.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          Asignar Tarea
                        </button>
                      </div>
                    </div>
                    
                    {/* Show project tasks if selected */}
                    {selectedProject === project.id && (
                      <div className="mt-4 border-t pt-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Tareas del Proyecto:</h4>
                        {projectTasks.length === 0 ? (
                          <p className="text-sm text-gray-500">No hay tareas asignadas</p>
                        ) : (
                          <div className="space-y-2">
                            {projectTasks.map((task) => (
                              <div key={task.id} className="bg-gray-50 p-3 rounded">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="text-sm font-medium">{task.title}</p>
                                    <p className="text-xs text-gray-600">{task.description}</p>
                                    <p className="text-xs text-gray-500">
                                      Asignado a: {getUserName(task.assignedToId)}
                                    </p>
                                  </div>
                                  <button
                                    onClick={() => handleEditTask(task)}
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded text-xs"
                                  >
                                    Editar
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Section: All Tasks with Status Management */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Mis Asignaciones</h2>
              
              <div className="space-y-4">
                {tasks.length === 0 ? (
                  <p className="text-sm text-gray-500">No hay tareas asignadas</p>
                ) : (
                  tasks.map((task) => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex-1">
                          <h3 className="text-md font-medium text-gray-900">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.description}</p>
                          <p className="text-xs text-gray-500">
                            Proyecto: {getProjectName(task.projectId)} | 
                            Asignado a: {getUserName(task.assignedToId)} |
                            Fecha límite: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <select
                          value={task.status}
                          onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as any)}
                          className="text-xs border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="IN_PROGRESS">IN_PROGRESS</option>
                          <option value="COMPLETED">COMPLETED</option>
                        </select>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Task Form Modal */}
          {showTaskForm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingTask ? 'Editar Tarea' : 'Crear Nueva Tarea'}
                </h3>
                <form onSubmit={handleSubmitTask} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Título</label>
                    <input
                      type="text"
                      required
                      value={taskFormData.title}
                      onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                      required
                      value={taskFormData.description}
                      onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Proyecto</label>
                    <select
                      required
                      value={taskFormData.projectId}
                      onChange={(e) => setTaskFormData({ ...taskFormData, projectId: parseInt(e.target.value) })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value={0}>Seleccionar proyecto</option>
                      {projects.map((project) => (
                        <option key={project.id} value={project.id}>{project.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Asignar a</label>
                    <select
                      required
                      value={taskFormData.assignedToId}
                      onChange={(e) => setTaskFormData({ ...taskFormData, assignedToId: parseInt(e.target.value) })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value={0}>Seleccionar usuario</option>
                      {users.filter(user => user.id !== currentUserId).map((user) => (
                        <option key={user.id} value={user.id}>{user.username}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                      value={taskFormData.status}
                      onChange={(e) => setTaskFormData({ ...taskFormData, status: e.target.value as any })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="IN_PROGRESS">IN_PROGRESS</option>
                      <option value="COMPLETED">COMPLETED</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fecha límite</label>
                    <input
                      type="datetime-local"
                      required
                      value={taskFormData.dueDate}
                      onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                      {editingTask ? 'Actualizar' : 'Crear'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowTaskForm(false)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
