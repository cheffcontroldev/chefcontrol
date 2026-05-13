import type { Role } from '@/shared/enums';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateUserInput {
  name: string;
  email: string;
  role: Role;
}

export interface UpdatePasswordInput {
  password: string;
  confirmPassword: string;
}
