
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart,
  Star,
  Truck,
  Shield,
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  Plus,
  Minus,
  Filter
} from 'lucide-react';

const StoreExample = () => {
  const [cartItems, setCartItems] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const categories = ['Todos', 'Electrónicos', 'Ropa', 'Hogar', 'Deportes'];
  
  const products = [
    {
      id: 1,
      name: "Smartphone Galaxy Pro",
      price: "₣ 450,000",
      originalPrice: "₣ 520,000",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      rating: 4.8,
      reviews: 124,
      category: "Electrónicos",
      badge: "Oferta"
    },
    {
      id: 2,
      name: "Camisa Casual Elegante",
      price: "₣ 35,000",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
      rating: 4.6,
      reviews: 89,
      category: "Ropa"
    },
    {
      id: 3,
      name: "Decoración Moderna",
      price: "₣ 125,000",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      rating: 4.9,
      reviews: 67,
      category: "Hogar",
      badge: "Nuevo"
    },
    {
      id: 4,
      name: "Auriculares Bluetooth",
      price: "₣ 85,000",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      rating: 4.7,
      reviews: 156,
      category: "Electrónicos"
    },
    {
      id: 5,
      name: "Zapatillas Deportivas",
      price: "₣ 95,000",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      rating: 4.5,
      reviews: 203,
      category: "Deportes"
    },
    {
      id: 6,
      name: "Lámpara de Mesa",
      price: "₣ 65,000",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
      rating: 4.4,
      reviews: 78,
      category: "Hogar"
    }
  ];

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = () => {
    setCartItems(cartItems + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <ArrowLeft className="h-5 w-5" />
              <span>Volver a Umpla</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-secondary">Mi Negocio GQ</h1>
                <p className="text-xs text-gray-500">Tienda oficial</p>
              </div>
            </div>
            
            <Button className="relative" onClick={addToCart}>
              <ShoppingCart className="h-5 w-5" />
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bienvenido a Mi Negocio GQ
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Los mejores productos con calidad garantizada y envío a toda Guinea Ecuatorial
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span>Envío gratis >₣50,000</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span>Garantía de calidad</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span>Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories & Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-secondary">Nuestros Productos</h3>
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select 
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="bg-white border border-gray-100 hover:shadow-lg transition-all duration-300 group overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.badge && (
                    <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
                      product.badge === 'Oferta' ? 'bg-red-500 text-white' : 'bg-success text-black'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} reseñas)</span>
                  </div>
                  
                  <h4 className="font-semibold text-secondary mb-3 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-secondary">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={addToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Agregar al carrito
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-secondary mb-4">Contáctanos</h3>
            <p className="text-gray-600">Estamos aquí para ayudarte con cualquier pregunta</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center bg-gray-50 border-0">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold text-secondary mb-2">Teléfono</h4>
              <p className="text-gray-600">+240 555 123 456</p>
              <p className="text-sm text-gray-500 mt-1">Lun-Vie 8AM-6PM</p>
            </Card>
            
            <Card className="p-6 text-center bg-gray-50 border-0">
              <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold text-secondary mb-2">Email</h4>
              <p className="text-gray-600">info@minegociogq.com</p>
              <p className="text-sm text-gray-500 mt-1">Respuesta en 24h</p>
            </Card>
            
            <Card className="p-6 text-center bg-gray-50 border-0">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-4" />
              <h4 className="font-semibold text-secondary mb-2">Ubicación</h4>
              <p className="text-gray-600">Malabo, Guinea Ecuatorial</p>
              <p className="text-sm text-gray-500 mt-1">Entregas locales</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-white">Mi Negocio GQ</span>
            </div>
            <p className="text-gray-400 mb-6">
              Tienda online creada con Umpla - La plataforma líder en Guinea Ecuatorial
            </p>
            <Link to="/onboarding">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                Crear mi tienda como esta
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default StoreExample;
