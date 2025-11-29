import apiClient from "./config";
import { API_URLS } from "./urls";

export interface Application {
  id: number;
  dateApplication: string;
  motivation: string;
  status: string;
  title: string;
  description: string;
  scope: string;
  budget: number;
  startDate: string;
  endDate: string;
  locationId: number;
  currentStep?: number;
  userId: number;
  projectId: number;
  projectName?: string;
}

export interface ApplicationsResponse {
  content: Application[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface CreateApplicationRequest {
  projectId: number;
  title: string;
  description: string;
  motivation: string;
  scope: string;
  budget: number;
  startDate: string;
  endDate: string;
  locationId: number;
}

export const applicationsApi = {
  getApplications: async (): Promise<ApplicationsResponse> => {
    const response = await apiClient.get<{ data: ApplicationsResponse }>(
      API_URLS.APPLICANT.APPLICATIONS
    );
    return response.data.data;
  },

  getApplicationById: async (id: number): Promise<Application> => {
    const response = await apiClient.get<{ data: Application }>(
      API_URLS.APPLICANT.APPLICATION(id)
    );
    return response.data.data;
  },

  createApplication: async (
    data: CreateApplicationRequest
  ): Promise<Application> => {
    const response = await apiClient.post<{ data: Application }>(
      API_URLS.APPLICANT.APPLICATIONS,
      data
    );
    return response.data.data;
  },

  updateApplication: async (
    id: number,
    data: Partial<CreateApplicationRequest>
  ): Promise<Application> => {
    const response = await apiClient.put<{ data: Application }>(
      API_URLS.APPLICANT.APPLICATION(id),
      data
    );
    return response.data.data;
  },

  deleteApplication: async (id: number): Promise<void> => {
    await apiClient.delete(API_URLS.APPLICANT.APPLICATION(id));
  },
};
