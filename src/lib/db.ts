import { Order, Product } from "../types";
import { INITIAL_PRODUCTS } from "../constants";

const PRODUCTS_KEY = 'modestbyhabby_products';
const ORDERS_KEY = 'modestbyhabby_orders';
const WISHLIST_KEY = 'modestbyhabby_wishlist';

export const db = {
  getProducts: (): Product[] => {
    const stored = localStorage.getItem(PRODUCTS_KEY);
    if (!stored) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(stored);
  },

  saveProduct: (product: Product) => {
    const products = db.getProducts();
    const index = products.findIndex(p => p.id === product.id);
    if (index > -1) {
      products[index] = product;
    } else {
      products.push(product);
    }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },

  deleteProduct: (id: string) => {
    const products = db.getProducts();
    const filtered = products.filter(p => p.id !== id);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
  },

  getOrders: (): Order[] => {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => {
    const orders = db.getOrders();
    const newOrder: Order = {
      ...order,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      status: 'pending'
    };
    orders.unshift(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return newOrder;
  },

  updateOrderStatus: (id: string, status: 'pending' | 'completed') => {
    const orders = db.getOrders();
    const index = orders.findIndex(o => o.id === id);
    if (index > -1) {
      orders[index].status = status;
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  },

  deleteOrder: (id: string) => {
    const orders = db.getOrders();
    const filtered = orders.filter(o => o.id !== id);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered));
  },

  getWishlist: (): string[] => {
    const stored = localStorage.getItem(WISHLIST_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  toggleWishlist: (productId: string) => {
    const wishlist = db.getWishlist();
    const index = wishlist.indexOf(productId);
    if (index > -1) {
      wishlist.splice(index, 1);
    } else {
      wishlist.push(productId);
    }
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    return wishlist.includes(productId);
  },

  isInWishlist: (productId: string): boolean => {
    return db.getWishlist().includes(productId);
  }
};
