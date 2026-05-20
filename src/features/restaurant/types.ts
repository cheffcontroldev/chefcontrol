export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt: string;
  isActive: boolean;
}

export interface ResponseRestaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  created_at: string;
  is_active: boolean;
}

export interface UpdateRestaurant {
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
}
