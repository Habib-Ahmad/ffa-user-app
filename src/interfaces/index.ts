export interface Institution {
  id: number;
  name: string;
  type: string;
  country?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  login: string;
  role?: {
    id: number;
    name: string;
  };
  organizationId?: number;
  organizationType?: string;
}

export interface Location {
  id: number;
  name: string;
  postalCode: number;
  departmentId: number;
  creationDate: string;
  lastModificationDate: string;
  creatorUser: unknown | null;
  lastModificatorUser: unknown | null;
  isDeleted: boolean;
  department: string | null;
  embassies: unknown[] | null;
  institutions: unknown[] | null;
}
