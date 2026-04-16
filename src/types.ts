export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  sizes: string[];
  colors: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
}

export type Category = 'Khimar' | 'Abaya' | 'Jilbab' | 'Native Wear';

export interface Order {
  id: string;
  productName: string;
  price: number;
  date: string;
  status: 'pending' | 'completed';
  customerNote?: string;
}

export interface AdminUser {
  username: string;
}
