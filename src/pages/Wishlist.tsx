import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../lib/db';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';

export const Wishlist = () => {
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wishlistIds = db.getWishlist();
    const allProducts = db.getProducts();
    const filtered = allProducts.filter(p => wishlistIds.includes(p.id));
    setWishlistProducts(filtered);
    setLoading(false);
  }, []);

  if (loading) return null;

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-brand-gold fill-brand-gold" />
            <h1 className="text-4xl md:text-6xl font-serif">My Wishlist</h1>
          </div>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            Your personal collection of modest elegance. Save your favorites and order whenever you're ready.
          </p>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {wishlistProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-brand-beige/10 rounded-3xl"
          >
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
              <Heart className="w-10 h-10 text-brand-beige" />
            </div>
            <h2 className="text-2xl font-serif mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground font-light mb-8 max-w-xs mx-auto">
              Start adding your favorite pieces to your wishlist and they'll appear right here.
            </p>
            <Button asChild className="bg-brand-gold hover:bg-brand-gold-dark text-white rounded-full px-8">
              <Link to="/shop">Explore Collection</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
