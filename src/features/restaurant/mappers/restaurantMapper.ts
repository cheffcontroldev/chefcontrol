import type { ResponseRestaurant, Restaurant } from '../types';

export const responseToRestaurant = (response: ResponseRestaurant): Restaurant => {
  return {
    id: response.id,
    name: response.name,
    address: response.address,
    phone: response.phone,
    email: response.email,
    createdAt: response.created_at,
    isActive: response.is_active,
  };
};
