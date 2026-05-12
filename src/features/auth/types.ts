export type Role = 'Administrador' | 'Almacenista' | 'Cheff';

export interface SignUpInput {
  restaurantName: string;
  adminName: string;
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  authId: string;
  name: string;
  email: string;
  role: Role;
  restaurantId: string;
  isActive: boolean;
}
