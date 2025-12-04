import apiClient from "./config";
import { API_URLS } from "./urls";
import type { Location } from "@/interfaces";

export interface Project {
  id: number;
  name: string;
  description: string;
  submissionDate: string;
  status: string;
  totalBudget: number;
  startDate: string;
  locationId: number;
  intervenerId: number;
  winnerUserId: number | null;
  creationDate: string;
  lastModificationDate: string;
  creatorUser: unknown | null;
  lastModificatorUser: unknown | null;
  isDeleted: boolean;
  intervener: unknown | null;
  winnerUser: unknown | null;
  applications: unknown[] | null;
  location: Location | null;
}

export interface ProjectsResponse {
  content: Project[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
}

export const projectsApi = {
  getProjects: async (
    page: number = 0,
    size: number = 10
  ): Promise<ProjectsResponse> => {
    const response = await apiClient.get<{ data: ProjectsResponse }>(
      `${API_URLS.PROJECTS.LIST}?page=${page}&size=${size}`
    );
    const filteredResponse = response.data.data.content.filter(
      (project) => project.status === "PUBLISHED"
    );
    response.data.data.content = filteredResponse;
    return response.data.data;
  },

  searchProjects: async (
    keyword: string,
    page: number = 0,
    size: number = 10
  ): Promise<ProjectsResponse> => {
    const response = await apiClient.get<{ data: ProjectsResponse }>(
      `${API_URLS.PROJECTS.SEARCH}?keyword=${encodeURIComponent(
        keyword
      )}&page=${page}&size=${size}`
    );
    return response.data.data;
  },

  getProjectById: async (id: number): Promise<Project> => {
    const response = await apiClient.get<{ data: Project }>(
      API_URLS.PROJECTS.DETAIL(id)
    );
    return response.data.data;
  },
};
