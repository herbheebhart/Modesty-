import { Category, Product } from "./types";

export const BRAND_NAME = "Modestbyhabby";
export const WHATSAPP_NUMBER = "2348162160538";
export const INSTAGRAM_URL = "https://instagram.com/modestbyhabby";

export const CATEGORIES: Category[] = ['Khimar', 'Abaya', 'Jilbab', 'Native Wear'];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Silk Khimar Set',
    price: 15000,
    category: 'Khimar',
    image: 'https://picsum.photos/seed/khimar1/800/1000',
    description: 'Elegant silk khimar set with matching skirt. Perfect for special occasions.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Beige', 'Nude', 'Black'],
    isNewArrival: true,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'Classic Black Abaya',
    price: 25000,
    category: 'Abaya',
    image: 'https://picsum.photos/seed/abaya1/800/1000',
    description: 'A timeless classic black abaya made from premium Nida fabric.',
    sizes: ['52', '54', '56', '58'],
    colors: ['Black'],
    isBestSeller: true
  },
  {
    id: '3',
    name: 'Two-Piece Jilbab',
    price: 18000,
    category: 'Jilbab',
    image: 'https://picsum.photos/seed/jilbab1/800/1000',
    description: 'Comfortable two-piece jilbab for everyday wear.',
    sizes: ['Free Size'],
    colors: ['Olive', 'Maroon', 'Navy'],
    isNewArrival: true
  },
  {
    id: '4',
    name: 'Embroidered Native Set',
    price: 35000,
    category: 'Native Wear',
    image: 'https://picsum.photos/seed/native1/800/1000',
    description: 'Beautifully embroidered native wear for the modern modest woman.',
    sizes: ['M', 'L', 'XL'],
    colors: ['Cream', 'Gold'],
    isNewArrival: true
  }
];
