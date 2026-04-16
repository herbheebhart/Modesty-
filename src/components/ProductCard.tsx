import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { Button } from './ui/button';
import { db } from '../lib/db';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Save order to storage
    db.addOrder({
      productName: product.name,
      price: product.price,
      customerNote: `Ordering ${product.name} from card`
    });

    const message = encodeURIComponent(`Hello! I want to order ${product.name}\nPrice: ₦${product.price.toLocaleString()}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative bg-white rounded-xl overflow-hidden luxury-shadow transition-all duration-300"
    >
      <Link to={`/product/${product.id}`}>
        <div className="aspect-[3/4] overflow-hidden relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          {product.isNewArrival && (
            <div className="absolute top-4 left-4 bg-brand-gold text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
              New Arrival
            </div>
          )}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
            <Button 
              onClick={handleWhatsAppOrder}
              className="bg-white text-foreground hover:bg-brand-gold hover:text-white rounded-full p-3 h-auto"
            >
              <MessageCircle className="w-5 h-5" />
            </Button>
            <Button 
              asChild
              className="bg-brand-gold text-white hover:bg-brand-gold-dark rounded-full p-3 h-auto"
            >
              <Link to={`/product/${product.id}`}>
                <ShoppingBag className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="p-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold-dark mb-1">{product.category}</p>
          <h3 className="font-serif text-lg font-medium mb-2 group-hover:text-brand-gold transition-colors">{product.name}</h3>
          <p className="text-foreground font-medium">₦{product.price.toLocaleString()}</p>
        </div>
      </Link>
    </motion.div>
  );
};
