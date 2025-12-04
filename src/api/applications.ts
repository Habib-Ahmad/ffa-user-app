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
  motivation: string;
}

export const applicationsApi = {
  getApplications: async (): Promise<ApplicationsResponse> => {
    const response = await apiClient.get<{ data: ApplicationsResponse }>(
      API_URLS.APPLICATIONS.LIST
    );
    return response.data.data;
  },

  getApplicationById: async (id: number): Promise<Application> => {
    const response = await apiClient.get<{ data: Application }>(
      API_URLS.APPLICATIONS.DETAIL(id)
    );
    return response.data.data;
  },

  createApplication: async (
    projectId: number,
    data: CreateApplicationRequest
  ): Promise<Application> => {
    const response = await apiClient.post<{ data: Application }>(
      API_URLS.PROJECTS.APPLY(projectId),
      {},
      {
        params: {
          motivation: data.motivation,
        },
      }
    );
    return response.data.data;
  },

  saveApplicationStep: async (
    data: Partial<CreateApplicationRequest>
  ): Promise<Application> => {
    const response = await apiClient.post<{ data: Application }>(
      API_URLS.APPLICATIONS.SAVE_STEP,
      data
    );
    return response.data.data;
  },

  updateApplication: async (
    id: number,
    data: Partial<CreateApplicationRequest>
  ): Promise<Application> => {
    const response = await apiClient.put<{ data: Application }>(
      API_URLS.APPLICATIONS.DETAIL(id),
      data
    );
    return response.data.data;
  },

  submitApplication: async (id: number): Promise<Application> => {
    const response = await apiClient.post<{ data: Application }>(
      API_URLS.APPLICATIONS.SUBMIT(id)
    );
    return response.data.data;
  },

  deleteApplication: async (id: number): Promise<void> => {
    await apiClient.delete(API_URLS.APPLICATIONS.DELETE(id));
  },

  checkIfApplied: async (projectId: number): Promise<{ applied: boolean }> => {
    const response = await apiClient.get<{ data: { applied: boolean } }>(
      API_URLS.PROJECTS.CHECK_APPLIED(projectId)
    );
    return response.data.data;
  },

  getDraftApplication: async (
    projectId: number
  ): Promise<Application | null> => {
    try {
      const response = await apiClient.get<{ data: Application }>(
        API_URLS.PROJECTS.DRAFT_APPLICATION(projectId)
      );
      return response.data.data;
    } catch {
      return null;
    }
  },

  uploadDocument: async (
    applicationId: number,
    file: File,
    documentType: string
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentType", documentType);

    await apiClient.post(
      API_URLS.APPLICATIONS.DOCUMENTS(applicationId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  validateDocuments: async (
    applicationId: number
  ): Promise<{ valid: boolean; errors?: string[] }> => {
    const response = await apiClient.get<{
      data: { valid: boolean; errors?: string[] };
    }>(API_URLS.APPLICATIONS.VALIDATE_DOCUMENTS(applicationId));
    return response.data.data;
  },
};
