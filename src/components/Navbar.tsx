import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { BRAND_NAME } from '../constants';
import { Button } from './ui/button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-brand-gold-dark">
          {BRAND_NAME.toUpperCase()}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-widest uppercase transition-colors hover:text-brand-gold ${location.pathname === link.path ? 'text-brand-gold' : 'text-foreground'}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center space-x-2">
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className={`hover:text-brand-gold ${location.pathname === '/wishlist' ? 'text-brand-gold' : ''}`}>
                <Heart className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="ghost" size="icon" className="hover:text-brand-gold">
                <User className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-brand-beige overflow-hidden"
          >
            <div className="container mx-auto px-4 py-8 flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-serif tracking-widest uppercase ${location.pathname === link.path ? 'text-brand-gold' : 'text-foreground'}`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/wishlist" onClick={() => setIsOpen(false)} className={`text-lg font-serif tracking-widest uppercase flex items-center gap-2 ${location.pathname === '/wishlist' ? 'text-brand-gold' : 'text-foreground'}`}>
                <Heart className="w-5 h-5" /> Wishlist
              </Link>
              <Link to="/admin" onClick={() => setIsOpen(false)} className="text-lg font-serif tracking-widest uppercase flex items-center gap-2">
                <User className="w-5 h-5" /> Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
