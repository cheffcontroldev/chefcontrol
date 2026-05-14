import type { Role } from '@/shared/enums';

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface UpdateMyUserInput {
  name: string;
  email: string;
  role: Role;
}

export interface UpdateMyPasswordInput {
  password: string;
  confirmPassword: string;
}
