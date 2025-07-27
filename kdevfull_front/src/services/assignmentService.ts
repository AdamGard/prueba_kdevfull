const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  assignedToId: number;
  projectId: number;
  dueDate: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  assignedToId: number;
  projectId: number;
  dueDate: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  ownerUsername: string;
  createdAt: string;
  updatedAt: string;
}

class AssignmentService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<Task[]>(response);
  }

  async getTasksByProject(projectId: number): Promise<Task[]> {
    const response = await fetch(`${API_BASE_URL}/tasks/project/${projectId}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<Task[]>(response);
  }

  async getTaskById(id: number): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<Task>(response);
  }

  async createTask(data: TaskFormData): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return this.handleResponse<Task>(response);
  }

  async updateTask(id: number, data: TaskFormData): Promise<Task> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return this.handleResponse<Task>(response);
  }

  async deleteTask(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<User[]>(response);
  }

  async getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<Project[]>(response);
  }
}

export const assignmentService = new AssignmentService();
