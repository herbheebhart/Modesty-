import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  LogOut, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Clock,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../lib/db';
import { Order, Product, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Button } from '../components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '../components/ui/dialog';
import { toast } from 'sonner';

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  
  // New Product State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    price: 0,
    category: 'Abaya',
    description: '',
    image: '',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black']
  });

  useEffect(() => {
    const isAdmin = localStorage.getItem('modestbyhabby_admin');
    if (!isAdmin) {
      navigate('/admin');
      return;
    }
    setOrders(db.getOrders());
    setProducts(db.getProducts());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('modestbyhabby_admin');
    navigate('/admin');
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error('Please fill in all required fields');
      return;
    }

    const product: Product = {
      ...newProduct as Product,
      id: Math.random().toString(36).substr(2, 9),
    };

    db.saveProduct(product);
    setProducts(db.getProducts());
    setIsAddProductOpen(false);
    setNewProduct({
      name: '',
      price: 0,
      category: 'Abaya',
      description: '',
      image: '',
      sizes: ['M', 'L', 'XL'],
      colors: ['Black']
    });
    toast.success('Product added successfully');
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      db.deleteProduct(id);
      setProducts(db.getProducts());
      toast.success('Product deleted');
    }
  };

  const handleUpdateOrderStatus = (id: string, status: 'pending' | 'completed') => {
    db.updateOrderStatus(id, status);
    setOrders(db.getOrders());
    toast.success(`Order marked as ${status}`);
  };

  const handleDeleteOrder = (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      db.deleteOrder(id);
      setOrders(db.getOrders());
      toast.success('Order deleted');
    }
  };

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
    totalRevenue: orders.reduce((acc, o) => acc + o.price, 0)
  };

  return (
    <div className="min-h-screen bg-brand-beige/5 pb-24">
      {/* Sidebar/Nav */}
      <div className="bg-white border-b border-brand-beige sticky top-0 z-40">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LayoutDashboard className="w-6 h-6 text-brand-gold-dark" />
            <h1 className="text-xl font-serif font-bold tracking-widest">ADMIN DASHBOARD</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            <LogOut className="w-5 h-5 mr-2" /> Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-12">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="bg-white border border-brand-beige p-1 rounded-full luxury-shadow">
            <TabsTrigger value="overview" className="rounded-full px-8 data-[state=active]:bg-brand-gold data-[state=active]:text-white">Overview</TabsTrigger>
            <TabsTrigger value="orders" className="rounded-full px-8 data-[state=active]:bg-brand-gold data-[state=active]:text-white">Orders</TabsTrigger>
            <TabsTrigger value="products" className="rounded-full px-8 data-[state=active]:bg-brand-gold data-[state=active]:text-white">Products</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-brand-beige luxury-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg"><ShoppingBag className="w-6 h-6 text-blue-500" /></div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-600">+12%</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Total Orders</p>
                  <h3 className="text-3xl font-serif font-bold mt-1">{stats.totalOrders}</h3>
                </CardContent>
              </Card>

              <Card className="border-brand-beige luxury-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-orange-50 rounded-lg"><Clock className="w-6 h-6 text-orange-500" /></div>
                    <Badge variant="secondary" className="bg-orange-50 text-orange-600">Pending</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Pending Orders</p>
                  <h3 className="text-3xl font-serif font-bold mt-1">{stats.pendingOrders}</h3>
                </CardContent>
              </Card>

              <Card className="border-brand-beige luxury-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-green-50 rounded-lg"><CheckCircle className="w-6 h-6 text-green-500" /></div>
                    <Badge variant="secondary" className="bg-green-50 text-green-600">Completed</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Completed Orders</p>
                  <h3 className="text-3xl font-serif font-bold mt-1">{stats.completedOrders}</h3>
                </CardContent>
              </Card>

              <Card className="border-brand-beige luxury-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-brand-gold/10 rounded-lg"><DollarSign className="w-6 h-6 text-brand-gold-dark" /></div>
                    <Badge variant="secondary" className="bg-brand-gold/10 text-brand-gold-dark">Revenue</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Total Revenue</p>
                  <h3 className="text-3xl font-serif font-bold mt-1">₦{stats.totalRevenue.toLocaleString()}</h3>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-brand-beige luxury-shadow">
                <CardHeader><CardTitle className="font-serif">Recent Orders</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.slice(0, 5).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-brand-beige/10 rounded-xl">
                        <div>
                          <p className="font-medium">{order.productName}</p>
                          <p className="text-xs text-muted-foreground">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <Badge className={order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                    {orders.length === 0 && <p className="text-center text-muted-foreground py-8 italic">No orders yet.</p>}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-brand-beige luxury-shadow">
                <CardHeader><CardTitle className="font-serif">Inventory Status</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex items-center gap-4 p-4 bg-brand-beige/10 rounded-xl">
                        <img src={product.image} className="w-12 h-12 rounded object-cover" referrerPolicy="no-referrer" />
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.category}</p>
                        </div>
                        <p className="font-bold">₦{product.price.toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card className="border-brand-beige luxury-shadow">
              <CardHeader>
                <CardTitle className="font-serif">Manage Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-mono text-xs">#{order.id}</TableCell>
                        <TableCell>
                          <p className="font-medium">{order.productName}</p>
                          {order.customerNote && <p className="text-xs text-muted-foreground italic">{order.customerNote}</p>}
                        </TableCell>
                        <TableCell>₦{order.price.toLocaleString()}</TableCell>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Badge className={order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {order.status === 'pending' && (
                            <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50" onClick={() => handleUpdateOrderStatus(order.id, 'completed')}>
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="border-destructive/20 text-destructive hover:bg-destructive/10" onClick={() => handleDeleteOrder(order.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {orders.length === 0 && <div className="text-center py-24 text-muted-foreground italic">No orders found.</div>}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif">Product Inventory</h2>
              <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-brand-gold hover:bg-brand-gold-dark text-white rounded-full">
                    <Plus className="w-4 h-4 mr-2" /> Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Add New Product</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-6 py-4">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest">Product Name</label>
                        <Input 
                          placeholder="Silk Abaya" 
                          value={newProduct.name} 
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest">Price (₦)</label>
                        <Input 
                          type="number" 
                          placeholder="25000" 
                          value={newProduct.price} 
                          onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest">Category</label>
                        <Select 
                          value={newProduct.category} 
                          onValueChange={(val) => setNewProduct({...newProduct, category: val as Category})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {CATEGORIES.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest">Image URL</label>
                        <Input 
                          placeholder="https://..." 
                          value={newProduct.image} 
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest">Description</label>
                        <Textarea 
                          placeholder="Describe the product..." 
                          className="h-32"
                          value={newProduct.description} 
                          onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>Cancel</Button>
                    <Button className="bg-brand-gold hover:bg-brand-gold-dark text-white" onClick={handleAddProduct}>Save Product</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card className="border-brand-beige luxury-shadow">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product.id} className="group relative bg-brand-beige/5 rounded-2xl p-4 border border-brand-beige/50 hover:border-brand-gold transition-all">
                      <div className="aspect-square rounded-xl overflow-hidden mb-4">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-serif font-bold text-lg">{product.name}</h3>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.category}</p>
                        </div>
                        <p className="font-bold text-brand-gold-dark">₦{product.price.toLocaleString()}</p>
                      </div>
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" className="border-destructive/20 text-destructive hover:bg-destructive/10" onClick={() => handleDeleteProduct(product.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
