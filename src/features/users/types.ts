import type { Role } from '../auth/types';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
}

export interface UpdateMyUserInput {
  name: string;
}

export interface UpdateMyPasswordInput {
  password: string;
  confirmPassword: string;
}
