import { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { BottomSheet } from './BottomSheet';
import { BottomNavigation } from './BottomNavigation';
import { SearchScreen } from './SearchScreen';
import { ProviderProfile } from './ProviderProfile';
import { ServiceRequest } from './ServiceRequest';
import { OrdersScreen } from './OrdersScreen';
import { OrderDetails } from './OrderDetails';
import { ChatScreen } from './ChatScreen';
import { ProfileScreen } from './ProfileScreen';
import logoWeHave from 'figma:asset/3da59d2ca70d00b763c0f31c433b1074a1ef33a9.png';

interface Provider {
  id: number;
  name: string;
  service: string;
  rating: number;
  distance: string;
  price: string;
  avatar: string;
  lat: number;
  lng: number;
  available: boolean;
}

interface Order {
  id: number;
  provider: {
    id: number;
    name: string;
    avatar: string;
    service: string;
    rating?: number;
  };
  service: string;
  address: string;
  date: string;
  time: string;
  price: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
  duration?: string;
}

interface ClientHomeProps {
  userName: string;
  onLogout: () => void;
}

const mockProviders: Provider[] = [
  {
    id: 1,
    name: "João Silva",
    service: "Eletricista",
    rating: 4.8,
    distance: "0.5 km",
    price: "€30/hora",
    avatar: "https://i.pravatar.cc/150?img=12",
    lat: 38.7223,
    lng: -9.1393,
    available: true
  },
  {
    id: 2,
    name: "Maria Santos",
    service: "Canalizador",
    rating: 4.9,
    distance: "1.2 km",
    price: "€35/hora",
    avatar: "https://i.pravatar.cc/150?img=45",
    lat: 38.7243,
    lng: -9.1413,
    available: true
  },
  {
    id: 3,
    name: "Pedro Costa",
    service: "Pintor",
    rating: 4.7,
    distance: "0.8 km",
    price: "€25/hora",
    avatar: "https://i.pravatar.cc/150?img=33",
    lat: 38.7203,
    lng: -9.1373,
    available: true
  },
  {
    id: 4,
    name: "Ana Oliveira",
    service: "Limpeza",
    rating: 5.0,
    distance: "1.5 km",
    price: "€20/hora",
    avatar: "https://i.pravatar.cc/150?img=48",
    lat: 38.7263,
    lng: -9.1433,
    available: true
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    service: "Jardinagem",
    rating: 4.6,
    distance: "2.0 km",
    price: "€28/hora",
    avatar: "https://i.pravatar.cc/150?img=15",
    lat: 38.7183,
    lng: -9.1353,
    available: true
  }
];

const categories = [
  { id: 'all', name: 'Todos', icon: '🔍' },
  { id: 'eletricista', name: 'Eletricista', icon: '⚡' },
  { id: 'canalizador', name: 'Canalizador', icon: '🔧' },
  { id: 'pintor', name: 'Pintor', icon: '🎨' },
  { id: 'limpeza', name: 'Limpeza', icon: '🧹' },
  { id: 'jardinagem', name: 'Jardinagem', icon: '🌱' },
];

export function ClientHome({ userName, onLogout }: ClientHomeProps) {
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notificationCount] = useState(3);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showServiceRequest, setShowServiceRequest] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  // Mock completed services for profile
  const completedServices = orders.filter(o => o.status === 'completed').map(o => ({
    id: o.id,
    provider: {
      name: o.provider.name,
      avatar: o.provider.avatar,
      service: o.provider.service,
    },
    service: o.service,
    date: o.date,
    price: o.price,
    rating: 4.5,
    review: 'Excelente serviço!',
  }));

  const handleProviderClick = (provider: Provider) => {
    setSelectedProvider(provider);
  };

  const handleViewProfile = (provider: Provider) => {
    setSelectedProvider(provider);
    setShowProfile(true);
  };

  const handleNavigate = (page: 'home' | 'search' | 'orders' | 'profile') => {
    if (page === 'search') {
      setShowSearch(true);
    } else if (page === 'orders') {
      setShowOrders(true);
    } else if (page === 'profile') {
      setShowUserProfile(true);
    } else if (page === 'home') {
      // Reset all states to go back to home
      setShowSearch(false);
      setShowProfile(false);
      setShowServiceRequest(false);
      setShowOrders(false);
      setShowOrderDetails(false);
      setShowChat(false);
      setShowUserProfile(false);
      setSelectedProvider(null);
      setSelectedOrder(null);
    }
  };

  const handleRequestService = (provider: Provider) => {
    setShowProfile(false);
    setShowServiceRequest(true);
  };

  const handleConfirmRequest = (requestData: any) => {
    const newOrder: Order = {
      id: requestData.id,
      provider: {
        id: requestData.provider.id,
        name: requestData.provider.name,
        avatar: requestData.provider.avatar,
        service: requestData.provider.service,
        rating: requestData.provider.rating,
      },
      service: requestData.service,
      address: requestData.address,
      date: requestData.date,
      time: requestData.time,
      price: requestData.price,
      status: 'pending',
      createdAt: requestData.createdAt,
      notes: requestData.notes,
      duration: requestData.duration,
    };

    setOrders([newOrder, ...orders]);
    setShowServiceRequest(false);
    setSelectedProvider(null);
    alert('Serviço solicitado com sucesso! Verifique seus pedidos.');
  };

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const handleContactProvider = (order: Order) => {
    alert(`Ligando para ${order.provider.name}...`);
  };

  const handleOpenChat = (order: Order) => {
    setShowChat(true);
    setSelectedOrder(order);
  };

  const handleCancelOrder = (order: Order) => {
    if (confirm(`Tem certeza que deseja cancelar este pedido?`)) {
      const updatedOrders = orders.map(o => 
        o.id === order.id ? { ...o, status: 'cancelled' as const } : o
      );
      setOrders(updatedOrders);
      setShowOrderDetails(false);
      setSelectedOrder(null);
      alert('Pedido cancelado com sucesso.');
    }
  };

  // Get similar providers (same service category)
  const getSimilarProviders = (currentProvider: Provider) => {
    return mockProviders.filter(
      p => p.service === currentProvider.service && p.id !== currentProvider.id
    );
  };

  if (showUserProfile) {
    return (
      <ProfileScreen
        userName={userName}
        userEmail="cliente@wehave.com"
        userPhone="+351 912 345 678"
        userAddress="Rua Example, 123 - Lisboa, Portugal"
        userAvatar="https://i.pravatar.cc/150?img=68"
        completedServices={completedServices}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  if (showProfile && selectedProvider) {
    return (
      <ProviderProfile
        provider={selectedProvider}
        onBack={() => {
          setShowProfile(false);
          setSelectedProvider(null);
        }}
        onRequestService={handleRequestService}
        similarProviders={getSimilarProviders(selectedProvider)}
      />
    );
  }

  if (showSearch) {
    return (
      <SearchScreen 
        onBack={() => setShowSearch(false)}
        onCategorySelect={(categoryId) => {
          setShowSearch(false);
          setSelectedCategory(categoryId);
        }}
        onProviderSelect={(providerId) => {
          setShowSearch(false);
          const provider = mockProviders.find(p => p.id === providerId);
          if (provider) {
            setSelectedProvider(provider);
            setShowProfile(true);
          }
        }}
      />
    );
  }

  if (showServiceRequest) {
    return (
      <ServiceRequest
        onBack={() => setShowServiceRequest(false)}
        provider={selectedProvider}
        onConfirm={handleConfirmRequest}
      />
    );
  }

  if (showOrders) {
    return (
      <OrdersScreen
        onBack={() => setShowOrders(false)}
        onOrderSelect={handleOrderClick}
        orders={orders}
      />
    );
  }

  if (showOrderDetails && selectedOrder) {
    return (
      <OrderDetails
        order={selectedOrder}
        onBack={() => {
          setShowOrderDetails(false);
          setSelectedOrder(null);
        }}
        onContactProvider={handleContactProvider}
        onChat={handleOpenChat}
        onCancel={handleCancelOrder}
      />
    );
  }

  if (showChat && selectedOrder) {
    return (
      <ChatScreen
        onBack={() => setShowChat(false)}
        provider={{
          id: selectedOrder.provider.id,
          name: selectedOrder.provider.name,
          avatar: selectedOrder.provider.avatar,
          service: selectedOrder.provider.service,
        }}
      />
    );
  }

  return (
    <div className="relative h-screen max-w-md mx-auto overflow-hidden bg-white">
      {/* Symbolic Map Representation */}
      <div className="relative h-full w-full bg-gradient-to-br from-gray-100 via-gray-50 to-blue-50 overflow-hidden">
        {/* Map Grid Pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Symbolic Streets */}
        <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="30%" x2="100%" y2="35%" stroke="#CBD5E0" strokeWidth="3"/>
          <line x1="0" y1="60%" x2="100%" y2="58%" stroke="#CBD5E0" strokeWidth="4"/>
          <line x1="25%" y1="0" x2="30%" y2="100%" stroke="#CBD5E0" strokeWidth="3"/>
          <line x1="70%" y1="0" x2="68%" y2="100%" stroke="#CBD5E0" strokeWidth="3"/>
        </svg>

        {/* User Location (Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="relative">
            <div className="w-6 h-6 bg-blue-500 rounded-full border-3 border-white shadow-lg animate-pulse"></div>
            <div className="absolute inset-0 w-6 h-6 bg-blue-400 rounded-full opacity-30 animate-ping"></div>
          </div>
        </div>

        {/* Provider Markers - Positioned around the map */}
        {mockProviders.map((provider, index) => {
          const positions = [
            { top: '35%', left: '60%' },  // João Silva
            { top: '48%', left: '72%' },  // Maria Santos
            { top: '42%', left: '38%' },  // Pedro Costa
            { top: '58%', left: '65%' },  // Ana Oliveira
            { top: '32%', left: '25%' },  // Carlos Ferreira
          ];
          
          return (
            <button
              key={provider.id}
              onClick={() => handleProviderClick(provider)}
              className="absolute z-20 active:scale-95 transition-transform"
              style={positions[index]}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-[var(--color-primary)] rounded-full border-3 border-white shadow-lg flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
            </button>
          );
        })}

        {/* Map Legend/Info */}
        <div className="absolute bottom-24 right-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg z-10">
          <div className="flex items-center gap-2 text-sm mb-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Você</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full"></div>
            <span className="text-gray-600">Prestadores</span>
          </div>
        </div>
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-gradient-to-b from-black/20 to-transparent pt-6 pb-4 px-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={logoWeHave} 
              alt="WeHave" 
              className="h-8 w-auto"
            />
            <div>
              <p className="text-white text-sm">Olá,</p>
              <p className="text-white font-semibold">{userName}</p>
            </div>
          </div>
          <button className="relative w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
            <Bell className="w-5 h-5 text-[var(--color-text)]" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-alert)] text-white text-xs rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <button 
          onClick={() => setShowSearch(true)}
          className="w-full bg-white rounded-full px-4 py-3 flex items-center gap-3 shadow-lg active:scale-98 transition-transform"
        >
          <Search className="w-5 h-5 text-gray-400" />
          <span className="text-gray-500">O que você precisa hoje?</span>
        </button>
      </div>

      {/* Bottom Sheet */}
      <BottomSheet
        selectedProvider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        providers={mockProviders}
        onProviderClick={handleProviderClick}
        onViewProfile={handleViewProfile}
      />

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="home" onNavigate={handleNavigate} />
    </div>
  );
}