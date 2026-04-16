import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, MessageCircle, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { ProductCard } from '../components/ProductCard';
import { db } from '../lib/db';
import { WHATSAPP_NUMBER } from '../constants';

export const Home = () => {
  const products = db.getProducts();
  const featuredProducts = products.slice(0, 4);
  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/modest-hero/1920/1080?blur=2"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-beige/30 via-transparent to-background"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-8xl font-serif font-light tracking-tighter mb-6 text-foreground">
              Elegance in <span className="italic text-brand-gold-dark">Modesty</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Discover our curated collection of premium khimars, abayas, and jilbabs designed for the modern woman who values style and grace.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="bg-brand-gold hover:bg-brand-gold-dark text-white rounded-full px-10 h-14 text-base tracking-widest uppercase">
                <Link to="/shop">Shop Collection</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-brand-gold text-brand-gold-dark hover:bg-brand-gold/10 rounded-full px-10 h-14 text-base tracking-widest uppercase">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" /> Order via WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <div className="w-[1px] h-16 bg-brand-gold"></div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif mb-4">Featured Collections</h2>
            <div className="w-20 h-1 bg-brand-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {['Khimar', 'Abaya', 'Jilbab', 'Native Wear'].map((category, idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl luxury-shadow"
              >
                <img
                  src={`https://picsum.photos/seed/cat-${category}/800/1000`}
                  alt={category}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-2xl font-serif mb-4">{category}</h3>
                  <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-full">
                    <Link to={`/shop?category=${category}`}>View All</Link>
                  </Button>
                </div>
                <div className="absolute bottom-6 left-6 text-white group-hover:opacity-0 transition-opacity">
                  <h3 className="text-xl font-serif font-medium tracking-wide">{category}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24 bg-brand-beige/10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif mb-2">New Arrivals</h2>
              <p className="text-muted-foreground font-light">The latest additions to our modest collection.</p>
            </div>
            <Link to="/shop" className="text-brand-gold-dark font-medium flex items-center gap-2 hover:gap-4 transition-all">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial / Brand Promise */}
      <section className="py-24 bg-brand-gold text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <Star className="w-10 h-10 mx-auto mb-8 fill-white" />
          <h2 className="text-3xl md:text-4xl font-serif italic mb-8 leading-tight">
            "Modesty is the highest form of elegance. At Modestbyhabby, we believe every woman deserves to feel beautiful and confident while staying true to her values."
          </h2>
          <div className="w-12 h-[1px] bg-white/50 mx-auto mb-4"></div>
          <p className="uppercase tracking-[0.3em] text-sm font-light">Our Philosophy</p>
        </div>
      </section>

      {/* Instagram Preview */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif mb-2">Follow Us on Instagram</h2>
            <a href="https://instagram.com/modestbyhabby" target="_blank" rel="noopener noreferrer" className="text-brand-gold-dark hover:underline">@modestbyhabby</a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={`https://picsum.photos/seed/insta-${i}/600/600`}
                  alt="Instagram post"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
