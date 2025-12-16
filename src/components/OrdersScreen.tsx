import { useState } from 'react';
import { Clock, CheckCircle, XCircle, ChevronRight, Calendar, MapPin } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';

interface Order {
  id: number;
  provider: {
    id: number;
    name: string;
    avatar: string;
    service: string;
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

interface OrdersScreenProps {
  orders: Order[];
  onBack: () => void;
  onOrderSelect: (order: Order) => void;
}

const statusConfig = {
  pending: {
    label: 'Pendente',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    icon: Clock,
  },
  confirmed: {
    label: 'Confirmado',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    icon: CheckCircle,
  },
  completed: {
    label: 'Concluído',
    color: 'text-green-600',
    bg: 'bg-green-50',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelado',
    color: 'text-red-600',
    bg: 'bg-red-50',
    icon: XCircle,
  },
};

export function OrdersScreen({ orders, onBack, onOrderSelect }: OrdersScreenProps) {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <h1 className="text-2xl">Meus Pedidos</h1>
        <p className="text-sm text-gray-600 mt-1">{orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}</p>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-4 py-3 border-b border-gray-100 overflow-x-auto hide-scrollbar sticky top-[72px] z-10">
        <div className="flex gap-2">
          {[
            { id: 'all', label: 'Todos' },
            { id: 'pending', label: 'Pendentes' },
            { id: 'confirmed', label: 'Confirmados' },
            { id: 'completed', label: 'Concluídos' },
            { id: 'cancelled', label: 'Cancelados' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm transition-all ${
                filter === tab.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="px-4 py-4 pb-24 overflow-y-auto h-[calc(100vh-200px)]">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum pedido encontrado</h3>
            <p className="text-gray-600 text-sm">
              {filter === 'all' 
                ? 'Você ainda não fez nenhum pedido.'
                : `Você não tem pedidos ${statusConfig[filter]?.label.toLowerCase()}.`}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;
              
              return (
                <button
                  key={order.id}
                  onClick={() => onOrderSelect(order)}
                  className="w-full bg-white rounded-3xl shadow-sm p-4 active:scale-98 transition-transform"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${status.bg}`}>
                      <StatusIcon className={`w-4 h-4 ${status.color}`} />
                      <span className={`text-sm font-semibold ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>

                  {/* Provider */}
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                    <img
                      src={order.provider.avatar}
                      alt={order.provider.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1 text-left">
                      <h4 className="font-semibold">{order.provider.name}</h4>
                      <p className="text-sm text-gray-600">{order.service}</p>
                    </div>
                    <p className="text-lg text-[var(--color-primary)]">{order.price}</p>
                  </div>

                  {/* Details */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(order.date)} às {order.time}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{order.address}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation currentPage="orders" onNavigate={(page) => {
        if (page === 'home') {
          onBack();
        }
      }} />
    </div>
  );
}