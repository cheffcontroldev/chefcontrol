export type Role = 'Administrador' | 'Almacén' | 'Cocinero';

export interface AuthSignUpInput {
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface CompleteRegistrationInput {
  authId: string;
  email: string;
  restaurantName: string;
  restaurantAddress?: string;
  restaurantPhone?: string;
  adminName: string;
}

export interface AuthUser {
  id: string;
  authId: string;
  name: string;
  email: string;
  role: Role;
  restaurantId: string;
  restaurantName: string;
  restaurantAddress?: string;
  restaurantPhone?: string;
  isActive: boolean;
}
