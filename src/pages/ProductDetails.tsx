import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, ChevronRight, Star, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../lib/db';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../constants';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const p = db.getProducts().find(p => p.id === id);
    if (p) {
      setProduct(p);
      setSelectedSize(p.sizes[0]);
      setSelectedColor(p.colors[0]);
    } else {
      navigate('/shop');
    }
  }, [id, navigate]);

  if (!product) return null;

  const handleWhatsAppOrder = () => {
    // Save order to storage
    db.addOrder({
      productName: product.name,
      price: product.price,
      customerNote: `Size: ${selectedSize}, Color: ${selectedColor}`
    });

    const message = encodeURIComponent(
      `Hello! I want to order:\n\n` +
      `Product: ${product.name}\n` +
      `Price: ₦${product.price.toLocaleString()}\n` +
      `Size: ${selectedSize}\n` +
      `Color: ${selectedColor}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-12">
          <button onClick={() => navigate('/')} className="hover:text-brand-gold">Home</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => navigate('/shop')} className="hover:text-brand-gold">Shop</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden luxury-shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <Badge variant="outline" className="border-brand-gold text-brand-gold-dark mb-4 px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">
                {product.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif mb-4">{product.name}</h1>
              <p className="text-2xl font-medium text-foreground">₦{product.price.toLocaleString()}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Description</h3>
              <p className="text-muted-foreground leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Selection */}
            <div className="space-y-8 mb-10">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Select Size</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-full border text-sm transition-all ${selectedSize === size ? 'bg-brand-gold border-brand-gold text-white' : 'border-brand-beige text-muted-foreground hover:border-brand-gold'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Select Color</h3>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-2 rounded-full border text-sm transition-all ${selectedColor === color ? 'bg-brand-gold border-brand-gold text-white' : 'border-brand-beige text-muted-foreground hover:border-brand-gold'}`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button 
              onClick={handleWhatsAppOrder}
              size="lg" 
              className="w-full h-16 bg-brand-gold hover:bg-brand-gold-dark text-white rounded-full text-lg tracking-widest uppercase flex items-center justify-center gap-3"
            >
              <MessageCircle className="w-6 h-6" /> Order via WhatsApp
            </Button>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-brand-beige">
              <div className="flex flex-col items-center text-center">
                <ShieldCheck className="w-6 h-6 text-brand-gold-dark mb-2" />
                <span className="text-[10px] uppercase tracking-wider font-bold">Premium Quality</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck className="w-6 h-6 text-brand-gold-dark mb-2" />
                <span className="text-[10px] uppercase tracking-wider font-bold">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RotateCcw className="w-6 h-6 text-brand-gold-dark mb-2" />
                <span className="text-[10px] uppercase tracking-wider font-bold">Easy Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
