export type UserRole = 'admin' | 'member';
export type OrganizationPlan = 'free' | 'pro';

export interface Organization {
  id: string;
  name: string;
  email: string;
  plan: OrganizationPlan;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId: string;
  organization?: Organization;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  organizationName: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}