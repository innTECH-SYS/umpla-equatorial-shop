import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { CartSidebar } from '@/components/CartSidebar';
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
  Filter,
  Store
} from 'lucide-react';

const StoreExample = () => {
  const [selectedStore, setSelectedStore] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const { addToCart, openCart, getTotalItems } = useCart();

  const stores = [
    {
      id: 0,
      name: "Mi Negocio GQ",
      category: "Electrónicos",
      logo: "M",
      color: "bg-primary",
      description: "Tecnología y electrónicos de calidad",
      paymentMethods: ['mobile_money', 'bank_transfer', 'credit_card', 'cash_delivery']
    },
    {
      id: 1,
      name: "Moda Elegante",
      category: "Ropa y Moda",
      logo: "E",
      color: "bg-purple-600",
      description: "Las últimas tendencias en moda",
      paymentMethods: ['mobile_money', 'credit_card', 'cash_delivery']
    },
    {
      id: 2,
      name: "Hogar Perfecto",
      category: "Hogar y Decoración",
      logo: "H",
      color: "bg-green-600",
      description: "Todo para tu hogar ideal",
      paymentMethods: ['bank_transfer', 'credit_card', 'cash_delivery']
    },
    {
      id: 3,
      name: "Deporte Total",
      category: "Deportes",
      logo: "D",
      color: "bg-orange-600",
      description: "Equipamiento deportivo profesional",
      paymentMethods: ['mobile_money', 'credit_card']
    },
    {
      id: 4,
      name: "Salud y Belleza",
      category: "Belleza",
      logo: "S",
      color: "bg-pink-600",
      description: "Productos de belleza y cuidado personal",
      paymentMethods: ['mobile_money', 'bank_transfer', 'credit_card']
    }
  ];

  const allProducts = [
    // Electrónicos
    {
      id: 1,
      name: "Smartphone Galaxy Pro",
      price: "₣ 450,000",
      originalPrice: "₣ 520,000",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      rating: 4.8,
      reviews: 124,
      category: "Electrónicos",
      storeId: 0,
      badge: "Oferta"
    },
    {
      id: 2,
      name: "Auriculares Bluetooth",
      price: "₣ 85,000",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      rating: 4.7,
      reviews: 156,
      category: "Electrónicos",
      storeId: 0
    },
    // Ropa y Moda
    {
      id: 3,
      name: "Camisa Casual Elegante",
      price: "₣ 35,000",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
      rating: 4.6,
      reviews: 89,
      category: "Ropa y Moda",
      storeId: 1
    },
    {
      id: 4,
      name: "Vestido de Gala",
      price: "₣ 125,000",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400",
      rating: 4.9,
      reviews: 67,
      category: "Ropa y Moda",
      storeId: 1,
      badge: "Nuevo"
    },
    // Hogar y Decoración
    {
      id: 5,
      name: "Lámpara de Mesa Moderna",
      price: "₣ 65,000",
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
      rating: 4.4,
      reviews: 78,
      category: "Hogar y Decoración",
      storeId: 2
    },
    {
      id: 6,
      name: "Sofá Minimalista",
      price: "₣ 850,000",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      rating: 4.8,
      reviews: 134,
      category: "Hogar y Decoración",
      storeId: 2
    },
    // Deportes
    {
      id: 7,
      name: "Zapatillas Running Pro",
      price: "₣ 95,000",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
      rating: 4.5,
      reviews: 203,
      category: "Deportes",
      storeId: 3
    },
    {
      id: 8,
      name: "Balón de Fútbol Profesional",
      price: "₣ 45,000",
      image: "https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=400",
      rating: 4.7,
      reviews: 98,
      category: "Deportes",
      storeId: 3
    },
    // Belleza
    {
      id: 9,
      name: "Kit de Maquillaje Profesional",
      price: "₣ 180,000",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400",
      rating: 4.9,
      reviews: 245,
      category: "Belleza",
      storeId: 4,
      badge: "Bestseller"
    },
    {
      id: 10,
      name: "Crema Facial Anti-Edad",
      price: "₣ 120,000",
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400",
      rating: 4.6,
      reviews: 167,
      category: "Belleza",
      storeId: 4
    }
  ];

  const currentStore = stores[selectedStore];
  const categories = ['Todos', ...Array.from(new Set(allProducts.filter(p => p.storeId === selectedStore).map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'Todos' 
    ? allProducts.filter(p => p.storeId === selectedStore)
    : allProducts.filter(p => p.storeId === selectedStore && p.category === selectedCategory);

  const handleAddToCart = (product: any) => {
    addToCart(product, currentStore);
  };

  const switchStore = (storeId: number) => {
    setSelectedStore(storeId);
    setSelectedCategory('Todos');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CartSidebar />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <ArrowLeft className="h-5 w-5" />
              <span>Volver a Umpla</span>
            </Link>
            
            <div className="flex items-center space-x-2">
              <div className={`w-10 h-10 ${currentStore.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{currentStore.logo}</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-secondary">{currentStore.name}</h1>
                <p className="text-xs text-gray-500">{currentStore.description}</p>
              </div>
            </div>
            
            <Button className="relative" onClick={openCart}>
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Store Selector */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-4">
            <Store className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Explorar otras tiendas:</span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {stores.map((store) => (
              <button
                key={store.id}
                onClick={() => switchStore(store.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
                  selectedStore === store.id 
                    ? 'border-primary bg-primary/5 text-primary' 
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <div className={`w-6 h-6 ${store.color} rounded flex items-center justify-center`}>
                  <span className="text-white font-bold text-xs">{store.logo}</span>
                </div>
                <span className="text-sm font-medium">{store.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Banner */}
      <section className={`${currentStore.color} text-white py-16`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Bienvenido a {currentStore.name}
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              {currentStore.description} - Envío a toda Guinea Ecuatorial
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                <span>Envío gratis mayor a ₣50,000</span>
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
                      product.badge === 'Oferta' ? 'bg-red-500 text-white' : 
                      product.badge === 'Nuevo' ? 'bg-success text-black' :
                      'bg-blue-500 text-white'
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
                    className={`w-full ${currentStore.color} hover:opacity-90`}
                    onClick={() => handleAddToCart(product)}
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
              <p className="text-gray-600">info@{currentStore.name.toLowerCase().replace(/\s+/g, '')}.com</p>
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
              <div className={`w-8 h-8 ${currentStore.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white font-bold text-lg">{currentStore.logo}</span>
              </div>
              <span className="text-xl font-bold text-white">{currentStore.name}</span>
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
