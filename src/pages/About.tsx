import React from 'react';
import { motion } from 'motion/react';
import { BRAND_NAME } from '../constants';

export const About = () => {
  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Our Story</h1>
            <div className="w-20 h-1 bg-brand-gold mx-auto mb-8"></div>
            <p className="text-xl text-brand-gold-dark font-serif italic">"Elegance in Modesty"</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden luxury-shadow"
            >
              <img
                src="https://picsum.photos/seed/about-1/800/1000"
                alt="About Modestbyhabby"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif">The Beginning</h2>
              <p className="text-muted-foreground leading-relaxed font-light">
                {BRAND_NAME} was born out of a passion for modest fashion and a desire to provide women with elegant, high-quality clothing that respects their values without compromising on style.
              </p>
              <p className="text-muted-foreground leading-relaxed font-light">
                We started with a simple vision: to create a brand that celebrates the beauty of modesty. Every piece in our collection is carefully selected or designed to ensure it meets our high standards of quality, comfort, and sophistication.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center flex-row-reverse">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-2 rounded-2xl overflow-hidden luxury-shadow"
            >
              <img
                src="https://picsum.photos/seed/about-2/800/1000"
                alt="Our Values"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-1 space-y-6"
            >
              <h2 className="text-3xl font-serif">Our Values</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-brand-gold-dark font-bold uppercase tracking-widest text-sm mb-2">Quality</h3>
                  <p className="text-muted-foreground font-light">We use only the finest fabrics, from premium Nida to soft silks, ensuring every garment feels as good as it looks.</p>
                </div>
                <div>
                  <h3 className="text-brand-gold-dark font-bold uppercase tracking-widest text-sm mb-2">Elegance</h3>
                  <p className="text-muted-foreground font-light">Our designs are timeless and sophisticated, focusing on clean lines and graceful silhouettes.</p>
                </div>
                <div>
                  <h3 className="text-brand-gold-dark font-bold uppercase tracking-widest text-sm mb-2">Community</h3>
                  <p className="text-muted-foreground font-light">We are more than just a brand; we are a community of women who support and inspire each other in our journey of modesty.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
