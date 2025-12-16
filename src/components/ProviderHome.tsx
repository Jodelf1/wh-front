import { useState } from 'react';
import { Bell, MapPin, Clock, User, Check, X } from 'lucide-react';
import { ProviderBottomNavigation } from './ProviderBottomNavigation';
import { ProviderOrdersScreen } from './ProviderOrdersScreen';
import { ProviderChatsScreen } from './ProviderChatsScreen';
import { ProviderChatScreen } from './ProviderChatScreen';
import { ClientProfileView } from './ClientProfileView';
import { ProviderProfileScreen } from './ProviderProfileScreen';
import logoWeHave from 'figma:asset/3da59d2ca70d00b763c0f31c433b1074a1ef33a9.png';

interface ServiceRequest {
  id: number;
  client: {
    name: string;
    avatar: string;
    rating: number;
  };
  service: string;
  address: string;
  distance: string;
  date: string;
  time: string;
  price: string;
  notes?: string;
}

interface ProviderHomeProps {
  userName: string;
  onLogout: () => void;
}

interface Chat {
  id: number;
  client: {
    name: string;
    avatar: string;
  };
  service: string;
  lastMessage: string;
  time: string;
  unread: number;
  isActive: boolean;
}

const mockRequests: ServiceRequest[] = [
  {
    id: 1,
    client: {
      name: 'Ana Costa',
      avatar: 'https://i.pravatar.cc/150?img=47',
      rating: 4.8,
    },
    service: 'Instalação elétrica',
    address: 'Rua das Flores, 45 - Lisboa',
    distance: '1.2 km',
    date: '2024-12-17',
    time: '14:00',
    price: '€45',
    notes: 'Preciso instalar 3 tomadas na sala',
  },
  {
    id: 2,
    client: {
      name: 'Pedro Silva',
      avatar: 'https://i.pravatar.cc/150?img=13',
      rating: 4.9,
    },
    service: 'Reparo elétrico',
    address: 'Av. da Liberdade, 123 - Lisboa',
    distance: '2.5 km',
    date: '2024-12-17',
    time: '16:30',
    price: '€35',
    notes: 'Disjuntor caindo constantemente',
  },
  {
    id: 3,
    client: {
      name: 'Maria Santos',
      avatar: 'https://i.pravatar.cc/150?img=32',
      rating: 5.0,
    },
    service: 'Manutenção preventiva',
    address: 'Rua do Ouro, 78 - Lisboa',
    distance: '0.8 km',
    date: '2024-12-18',
    time: '10:00',
    price: '€50',
  },
];

export function ProviderHome({ userName, onLogout }: ProviderHomeProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [requests, setRequests] = useState<ServiceRequest[]>(mockRequests);
  const [notificationCount] = useState(2);
  const [currentPage, setCurrentPage] = useState<'home' | 'requests' | 'chats' | 'profile'>('home');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [selectedClient, setSelectedClient] = useState<{ name: string; avatar: string } | null>(null);

  const handleNavigate = (page: 'home' | 'requests' | 'chats' | 'profile') => {
    setCurrentPage(page);
    setSelectedChat(null);
    setSelectedClient(null);
  };

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  const handleClientProfileClick = (client: { name: string; avatar: string }) => {
    setSelectedClient(client);
  };

  const handleBackFromChat = () => {
    setSelectedChat(null);
  };

  const handleBackFromClientProfile = () => {
    setSelectedClient(null);
  };

  const handleBackFromOrders = () => {
    setCurrentPage('home');
  };

  const handleBackFromChats = () => {
    setCurrentPage('home');
  };

  // Show client profile
  if (selectedClient) {
    return (
      <ClientProfileView
        client={{
          name: selectedClient.name,
          avatar: selectedClient.avatar,
          email: 'cliente@example.com',
          phone: '+351 912 345 678',
          address: 'Rua das Flores, 45 - Lisboa, Portugal',
          rating: 4.8,
        }}
        onBack={handleBackFromClientProfile}
      />
    );
  }

  // Show chat screen
  if (selectedChat) {
    return (
      <ProviderChatScreen
        chat={selectedChat}
        onBack={handleBackFromChat}
        onClientProfileClick={handleClientProfileClick}
      />
    );
  }

  // Show orders screen
  if (currentPage === 'requests') {
    return (
      <ProviderOrdersScreen
        onNavigate={handleNavigate}
        onBack={handleBackFromOrders}
      />
    );
  }

  // Show chats screen
  if (currentPage === 'chats') {
    return (
      <ProviderChatsScreen
        onNavigate={handleNavigate}
        onBack={handleBackFromChats}
        onChatSelect={handleChatSelect}
      />
    );
  }

  // Show profile screen
  if (currentPage === 'profile') {
    return (
      <ProviderProfileScreen
        providerName={userName}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />
    );
  }

  const handleAcceptRequest = (requestId: number) => {
    const request = requests.find(r => r.id === requestId);
    if (request) {
      alert(`Solicitação aceita! Cliente: ${request.client.name}`);
      setRequests(requests.filter(r => r.id !== requestId));
    }
  };

  const handleRejectRequest = (requestId: number) => {
    const request = requests.find(r => r.id === requestId);
    if (request && confirm('Tem certeza que deseja recusar esta solicitação?')) {
      alert(`Solicitação recusada.`);
      setRequests(requests.filter(r => r.id !== requestId));
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Amanhã';
    } else {
      return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
    }
  };

  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 pt-6 pb-4 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={logoWeHave} 
              alt="WeHave" 
              className="h-8 w-auto"
            />
            <div>
              <p className="text-sm text-gray-600">Olá,</p>
              <p className="font-semibold">{userName}</p>
            </div>
          </div>
          <button className="relative w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <Bell className="w-5 h-5 text-gray-700" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--color-alert)] text-white text-xs rounded-full flex items-center justify-center">
                {notificationCount}
              </span>
            )}
          </button>
        </div>

        {/* Online/Offline Toggle */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'} flex items-center justify-center`}>
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {isOnline ? 'Você está online' : 'Você está offline'}
                </p>
                <p className="text-xs text-gray-600">
                  {isOnline ? 'Recebendo solicitações' : 'Não receberá solicitações'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`relative w-16 h-8 rounded-full transition-colors ${
                isOnline ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                  isOnline ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-24 overflow-y-auto h-[calc(100vh-200px)]">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-2xl font-semibold text-[var(--color-primary)] mb-1">
              {requests.length}
            </p>
            <p className="text-xs text-gray-600">Novas</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-2xl font-semibold text-blue-600 mb-1">8</p>
            <p className="text-xs text-gray-600">Aceitas</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-2xl font-semibold text-green-600 mb-1">23</p>
            <p className="text-xs text-gray-600">Concluídas</p>
          </div>
        </div>

        {/* Requests Title */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Novas Solicitações</h2>
          {requests.length > 0 && (
            <span className="bg-[var(--color-primary)] text-white text-xs font-semibold px-3 py-1 rounded-full">
              {requests.length}
            </span>
          )}
        </div>

        {/* Requests List */}
        {!isOnline ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Você está offline</h3>
            <p className="text-gray-600 text-sm px-8">
              Ative o status online para começar a receber solicitações de clientes.
            </p>
          </div>
        ) : requests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-[var(--color-primary)]" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhuma solicitação</h3>
            <p className="text-gray-600 text-sm px-8">
              Aguarde novas solicitações de clientes próximos a você.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-3xl shadow-sm p-5"
              >
                {/* Client Info */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <img
                    src={request.client.avatar}
                    alt={request.client.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{request.client.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm font-semibold">{request.client.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-[var(--color-primary)] font-semibold">
                      {request.price}
                    </p>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{request.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Serviço</p>
                    <p className="font-semibold">{request.service}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500 mb-1">Endereço</p>
                    <p className="text-sm text-gray-700">{request.address}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Data</p>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <p className="text-sm text-gray-700">
                          {formatDate(request.date)} • {request.time}
                        </p>
                      </div>
                    </div>
                  </div>

                  {request.notes && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Observações</p>
                      <p className="text-sm text-gray-700 italic">"{request.notes}"</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleRejectRequest(request.id)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-gray-300 text-gray-700 active:scale-95 transition-transform"
                  >
                    <X className="w-5 h-5" />
                    <span className="font-semibold">Recusar</span>
                  </button>
                  <button
                    onClick={() => handleAcceptRequest(request.id)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[var(--color-primary)] text-white active:scale-95 transition-transform"
                  >
                    <Check className="w-5 h-5" />
                    <span className="font-semibold">Aceitar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <ProviderBottomNavigation currentPage="home" onNavigate={handleNavigate} />
    </div>
  );
}