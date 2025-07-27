const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Project {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  ownerUsername: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
}

class ProjectService {
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

  async getProjects(): Promise<Project[]> {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<Project[]>(response);
  }

  async getProjectById(id: number): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      headers: this.getHeaders()
    });
    return this.handleResponse<Project>(response);
  }

  async createProject(data: ProjectFormData): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return this.handleResponse<Project>(response);
  }

  async updateProject(id: number, data: ProjectFormData): Promise<Project> {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(),
      body: JSON.stringify(data)
    });
    return this.handleResponse<Project>(response);
  }

  async deleteProject(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders()
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
}

export const projectService = new ProjectService();
