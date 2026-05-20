import type { Role } from '../auth/types';

export interface User {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateMyUserInput {
  name: string;
  email: string;
}

export interface UpdateMyPasswordInput {
  password: string;
  confirmPassword: string;
}
