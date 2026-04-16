import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { BRAND_NAME, INSTAGRAM_URL, WHATSAPP_NUMBER } from '../constants';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

export const Contact = () => {
  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-serif mb-6">Contact Us</h1>
            <div className="w-20 h-1 bg-brand-gold mx-auto mb-8"></div>
            <p className="text-muted-foreground font-light max-w-xl mx-auto">
              Have a question or want to place a custom order? We'd love to hear from you. Reach out to us through any of the channels below.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="h-full border-brand-beige luxury-shadow text-center p-8">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-brand-beige/30 flex items-center justify-center mb-6">
                    <MessageCircle className="w-8 h-8 text-brand-gold-dark" />
                  </div>
                  <h3 className="text-xl font-serif mb-4">WhatsApp</h3>
                  <p className="text-muted-foreground font-light mb-6">Quickest way to order and get support.</p>
                  <Button asChild className="bg-brand-gold hover:bg-brand-gold-dark text-white rounded-full w-full">
                    <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                      Chat with Us
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="h-full border-brand-beige luxury-shadow text-center p-8">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-brand-beige/30 flex items-center justify-center mb-6">
                    <Instagram className="w-8 h-8 text-brand-gold-dark" />
                  </div>
                  <h3 className="text-xl font-serif mb-4">Instagram</h3>
                  <p className="text-muted-foreground font-light mb-6">Follow us for new arrivals and inspiration.</p>
                  <Button asChild variant="outline" className="border-brand-gold text-brand-gold-dark hover:bg-brand-gold/10 rounded-full w-full">
                    <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                      Follow @modestbyhabby
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="h-full border-brand-beige luxury-shadow text-center p-8">
                <CardContent className="p-0 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-brand-beige/30 flex items-center justify-center mb-6">
                    <Phone className="w-8 h-8 text-brand-gold-dark" />
                  </div>
                  <h3 className="text-xl font-serif mb-4">Phone</h3>
                  <p className="text-muted-foreground font-light mb-6">Available for calls during business hours.</p>
                  <p className="text-brand-gold-dark font-bold text-lg">+234 816 216 0538</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-24 p-12 rounded-3xl bg-brand-beige/20 text-center"
          >
            <h2 className="text-3xl font-serif mb-6">Visit Our Showroom</h2>
            <div className="flex flex-col items-center space-y-4 text-muted-foreground font-light">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-brand-gold-dark" />
                <span>Lagos, Nigeria (By Appointment Only)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-brand-gold-dark" />
                <span>hello@modestbyhabby.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
