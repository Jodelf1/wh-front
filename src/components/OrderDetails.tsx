import { ArrowLeft, MapPin, Calendar, Clock, DollarSign, Phone, MessageCircle, XCircle, Star } from 'lucide-react';

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

interface OrderDetailsProps {
  order: Order;
  onBack: () => void;
  onContactProvider: (order: Order) => void;
  onChat: (order: Order) => void;
  onCancel: (order: Order) => void;
}

const statusConfig = {
  pending: {
    label: 'Pendente',
    description: 'Aguardando confirmação do prestador',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  confirmed: {
    label: 'Confirmado',
    description: 'O prestador confirmou o serviço',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  completed: {
    label: 'Concluído',
    description: 'Serviço finalizado com sucesso',
    color: 'text-green-600',
    bg: 'bg-green-50',
  },
  cancelled: {
    label: 'Cancelado',
    description: 'Este pedido foi cancelado',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
};

export function OrderDetails({ 
  order, 
  onBack, 
  onContactProvider, 
  onChat,
  onCancel 
}: OrderDetailsProps) {
  const status = statusConfig[order.status];
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', { 
      weekday: 'long',
      day: '2-digit', 
      month: 'long',
      year: 'numeric'
    });
  };

  const formatCreatedDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('pt-PT', { 
      day: '2-digit', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl">Detalhes do Pedido</h1>
            <p className="text-xs text-gray-500">#{order.id}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-32 overflow-y-auto h-[calc(100vh-80px)]">
        {/* Status Card */}
        <div className={`rounded-3xl p-5 mb-4 ${status.bg}`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-lg font-semibold ${status.color}`}>
              {status.label}
            </h3>
            <span className="text-xs text-gray-500">
              Pedido em {formatCreatedDate(order.createdAt)}
            </span>
          </div>
          <p className={`text-sm ${status.color.replace('600', '700')}`}>
            {status.description}
          </p>
        </div>

        {/* Provider Card */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
          <h3 className="font-semibold mb-4">Prestador</h3>
          <div className="flex items-center gap-3">
            <img
              src={order.provider.avatar}
              alt={order.provider.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold">{order.provider.name}</h4>
              <p className="text-sm text-gray-600 mb-1">{order.provider.service}</p>
              {order.provider.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                  <span className="text-sm font-semibold">{order.provider.rating}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
          <h3 className="font-semibold mb-4">Detalhes do Serviço</h3>
          
          {/* Service */}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Serviço</p>
              <p className="font-semibold">{order.service}</p>
              {order.duration && (
                <p className="text-sm text-gray-600 mt-1">Duração: {order.duration}</p>
              )}
            </div>
            <p className="text-lg text-[var(--color-primary)]">{order.price}</p>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Endereço</p>
              <p className="text-gray-700">{order.address}</p>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Data</p>
              <p className="text-gray-700 capitalize">{formatDate(order.date)}</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Horário</p>
              <p className="text-gray-700">{order.time}</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
            <h3 className="font-semibold mb-2">Observações</h3>
            <p className="text-gray-600 leading-relaxed">{order.notes}</p>
          </div>
        )}

        {/* Payment Summary */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
          <h3 className="font-semibold mb-4">Resumo de Pagamento</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Serviço</span>
              <span>{order.price}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxa de serviço</span>
              <span>€0</span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-[var(--color-primary)]">{order.price}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Actions */}
      {order.status !== 'cancelled' && order.status !== 'completed' && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
          <div className="grid grid-cols-2 gap-3 mb-3">
            <button
              onClick={() => onContactProvider(order)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] active:scale-95 transition-transform"
            >
              <Phone className="w-5 h-5" />
              <span>Ligar</span>
            </button>
            <button
              onClick={() => onChat(order)}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[var(--color-primary)] text-white active:scale-95 transition-transform"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat</span>
            </button>
          </div>
          <button
            onClick={() => onCancel(order)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-red-500 text-red-500 active:scale-95 transition-transform"
          >
            <XCircle className="w-5 h-5" />
            <span>Cancelar Pedido</span>
          </button>
        </div>
      )}
    </div>
  );
}