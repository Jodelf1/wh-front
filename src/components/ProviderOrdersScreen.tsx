import { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Star, Clock, DollarSign, CheckCircle, XCircle, Loader } from 'lucide-react';
import { ProviderBottomNavigation } from './ProviderBottomNavigation';

interface ServiceOrder {
  id: number;
  client: {
    name: string;
    avatar: string;
    rating: number;
  };
  service: string;
  address: string;
  date: string;
  time: string;
  price: string;
  status: 'completed' | 'in_progress' | 'cancelled';
  rating?: number;
  review?: string;
  completedDate?: string;
}

interface ProviderOrdersScreenProps {
  onNavigate: (page: 'home' | 'requests' | 'chats' | 'profile') => void;
  onBack: () => void;
}

const mockOrders: ServiceOrder[] = [
  {
    id: 1,
    client: {
      name: 'Ana Costa',
      avatar: 'https://i.pravatar.cc/150?img=47',
      rating: 4.8,
    },
    service: 'Instalação elétrica',
    address: 'Rua das Flores, 45 - Lisboa',
    date: '2024-12-15',
    time: '14:00',
    price: '€45',
    status: 'completed',
    rating: 5,
    review: 'Excelente trabalho! Muito profissional e pontual.',
    completedDate: '2024-12-15',
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
    date: '2024-12-16',
    time: '16:30',
    price: '€35',
    status: 'in_progress',
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
    date: '2024-12-14',
    time: '10:00',
    price: '€50',
    status: 'completed',
    rating: 5,
    review: 'Perfeito! Recomendo.',
    completedDate: '2024-12-14',
  },
  {
    id: 4,
    client: {
      name: 'João Oliveira',
      avatar: 'https://i.pravatar.cc/150?img=12',
      rating: 4.6,
    },
    service: 'Instalação de lustre',
    address: 'Praça do Comércio, 12 - Lisboa',
    date: '2024-12-13',
    time: '09:00',
    price: '€40',
    status: 'completed',
    rating: 4,
    review: 'Bom serviço.',
    completedDate: '2024-12-13',
  },
  {
    id: 5,
    client: {
      name: 'Carla Mendes',
      avatar: 'https://i.pravatar.cc/150?img=44',
      rating: 4.7,
    },
    service: 'Troca de tomadas',
    address: 'Rua Augusta, 234 - Lisboa',
    date: '2024-12-12',
    time: '11:00',
    price: '€30',
    status: 'cancelled',
  },
];

export function ProviderOrdersScreen({ onNavigate, onBack }: ProviderOrdersScreenProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'completed' | 'in_progress' | 'cancelled'>('all');

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const filteredOrders = selectedTab === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedTab);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'completed':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', label: 'Concluído' };
      case 'in_progress':
        return { icon: Loader, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Em Andamento' };
      case 'cancelled':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-50', label: 'Cancelado' };
      default:
        return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-50', label: 'Pendente' };
    }
  };

  const stats = {
    total: mockOrders.length,
    completed: mockOrders.filter(o => o.status === 'completed').length,
    in_progress: mockOrders.filter(o => o.status === 'in_progress').length,
    cancelled: mockOrders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-xl font-semibold">Meus Pedidos</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={() => setSelectedTab('all')}
            className={`p-3 rounded-2xl text-center transition-all ${
              selectedTab === 'all' ? 'bg-[var(--color-primary)] text-white' : 'bg-gray-100'
            }`}
          >
            <p className="text-xl font-semibold">{stats.total}</p>
            <p className="text-xs mt-1">Todos</p>
          </button>
          <button
            onClick={() => setSelectedTab('completed')}
            className={`p-3 rounded-2xl text-center transition-all ${
              selectedTab === 'completed' ? 'bg-green-500 text-white' : 'bg-gray-100'
            }`}
          >
            <p className="text-xl font-semibold">{stats.completed}</p>
            <p className="text-xs mt-1">Concluídos</p>
          </button>
          <button
            onClick={() => setSelectedTab('in_progress')}
            className={`p-3 rounded-2xl text-center transition-all ${
              selectedTab === 'in_progress' ? 'bg-blue-500 text-white' : 'bg-gray-100'
            }`}
          >
            <p className="text-xl font-semibold">{stats.in_progress}</p>
            <p className="text-xs mt-1">Ativos</p>
          </button>
          <button
            onClick={() => setSelectedTab('cancelled')}
            className={`p-3 rounded-2xl text-center transition-all ${
              selectedTab === 'cancelled' ? 'bg-red-500 text-white' : 'bg-gray-100'
            }`}
          >
            <p className="text-xl font-semibold">{stats.cancelled}</p>
            <p className="text-xs mt-1">Cancelados</p>
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-6 pb-24 overflow-y-auto h-[calc(100vh-220px)]">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum pedido</h3>
            <p className="text-gray-600 text-sm px-8">
              Não há pedidos nesta categoria.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              const StatusIcon = statusInfo.icon;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-3xl shadow-sm p-5"
                >
                  {/* Status Badge */}
                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${statusInfo.bg} mb-4`}>
                    <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                    <span className={`text-xs font-semibold ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                    <img
                      src={order.client.avatar}
                      alt={order.client.name}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{order.client.name}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold">{order.client.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg text-[var(--color-primary)] font-semibold">
                        {order.price}
                      </p>
                    </div>
                  </div>

                  {/* Service Details */}
                  <div className="space-y-3 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Serviço</p>
                      <p className="font-semibold">{order.service}</p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500 mb-1">Endereço</p>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-700">{order.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Data do Serviço</p>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <p className="text-sm text-gray-700">
                            {formatDate(order.date)} • {order.time}
                          </p>
                        </div>
                      </div>
                    </div>

                    {order.completedDate && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Concluído em</p>
                        <p className="text-sm text-gray-700">{formatDate(order.completedDate)}</p>
                      </div>
                    )}
                  </div>

                  {/* Rating and Review */}
                  {order.rating && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs text-gray-500">Avaliação do Cliente:</p>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < order.rating!
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      {order.review && (
                        <p className="text-sm text-gray-700 italic">"{order.review}"</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <ProviderBottomNavigation currentPage="requests" onNavigate={onNavigate} />
    </div>
  );
}
