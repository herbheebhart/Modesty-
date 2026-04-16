import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { db } from '../lib/db';
import { CATEGORIES } from '../constants';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Category } from '../types';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(db.getProducts());
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>(
    (searchParams.get('category') as Category) || 'All'
  );
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const category = searchParams.get('category') as Category;
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  const handleCategoryChange = (category: Category | 'All') => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif mb-4">Our Collection</h1>
          <p className="text-muted-foreground font-light max-w-xl mx-auto">
            Browse through our elegant collection of modest wear, crafted with the finest fabrics and attention to detail.
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 rounded-full border-brand-beige focus:border-brand-gold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'outline'}
              onClick={() => handleCategoryChange('All')}
              className={`rounded-full px-6 whitespace-nowrap ${selectedCategory === 'All' ? 'bg-brand-gold hover:bg-brand-gold-dark' : 'border-brand-beige text-muted-foreground'}`}
            >
              All
            </Button>
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? 'default' : 'outline'}
                onClick={() => handleCategoryChange(cat)}
                className={`rounded-full px-6 whitespace-nowrap ${selectedCategory === cat ? 'bg-brand-gold hover:bg-brand-gold-dark' : 'border-brand-beige text-muted-foreground'}`}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-xl text-muted-foreground font-serif italic">No products found matching your criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {setSearchQuery(''); handleCategoryChange('All');}}
              className="text-brand-gold-dark mt-4"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
