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
