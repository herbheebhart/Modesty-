import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { BRAND_NAME, INSTAGRAM_URL, WHATSAPP_NUMBER } from '../constants';

export const Footer = () => {
  return (
    <footer className="bg-brand-beige/20 border-t border-brand-beige pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-serif font-bold text-brand-gold-dark mb-4">{BRAND_NAME.toUpperCase()}</h2>
            <p className="text-muted-foreground max-w-md mb-6 leading-relaxed">
              Modestbyhabby is dedicated to providing elegant and high-quality modest fashion for the modern woman. 
              Our collections are curated with love, focusing on modesty, comfort, and sophistication.
            </p>
            <div className="flex space-x-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-brand-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-brand-gold transition-colors">
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-brand-gold transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-muted-foreground hover:text-brand-gold transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-brand-gold transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-brand-gold transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/shop?category=Khimar" className="text-muted-foreground hover:text-brand-gold transition-colors">Khimar</Link></li>
              <li><Link to="/shop?category=Abaya" className="text-muted-foreground hover:text-brand-gold transition-colors">Abaya</Link></li>
              <li><Link to="/shop?category=Jilbab" className="text-muted-foreground hover:text-brand-gold transition-colors">Jilbab</Link></li>
              <li><Link to="/shop?category=Native Wear" className="text-muted-foreground hover:text-brand-gold transition-colors">Native Wear</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-brand-beige pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
