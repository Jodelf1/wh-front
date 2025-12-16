import { ArrowLeft, User, Mail, Phone, MapPin, Star, Calendar, Award } from 'lucide-react';

interface ServiceHistory {
  id: number;
  service: string;
  date: string;
  price: string;
  rating?: number;
  review?: string;
  status: 'completed' | 'cancelled';
}

interface ClientProfileViewProps {
  client: {
    name: string;
    avatar: string;
    email?: string;
    phone?: string;
    address?: string;
    rating?: number;
  };
  onBack: () => void;
}

const mockServiceHistory: ServiceHistory[] = [
  {
    id: 1,
    service: 'Instalação elétrica',
    date: '2024-12-15',
    price: '€45',
    rating: 5,
    review: 'Excelente trabalho! Muito profissional e pontual.',
    status: 'completed',
  },
  {
    id: 2,
    service: 'Reparo de tomada',
    date: '2024-11-20',
    price: '€30',
    rating: 5,
    review: 'Perfeito!',
    status: 'completed',
  },
  {
    id: 3,
    service: 'Manutenção elétrica',
    date: '2024-10-10',
    price: '€40',
    rating: 4,
    review: 'Bom serviço.',
    status: 'completed',
  },
];

export function ClientProfileView({ client, onBack }: ClientProfileViewProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const totalServices = mockServiceHistory.filter(s => s.status === 'completed').length;
  const averageRating = mockServiceHistory.reduce((acc, s) => acc + (s.rating || 0), 0) / 
                       (mockServiceHistory.filter(s => s.rating).length || 1);
  const totalSpent = mockServiceHistory
    .filter(s => s.status === 'completed')
    .reduce((acc, s) => acc + parseFloat(s.price.replace('€', '')), 0);

  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
      {/* Header with Cover */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-[var(--color-primary)] to-orange-600">
          <button
            onClick={onBack}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <img
            src={client.avatar}
            alt={client.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-20 pb-6 overflow-y-auto h-[calc(100vh-128px)]">
        {/* Client Info */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold mb-1">{client.name}</h1>
          <p className="text-sm text-gray-600">Cliente WeHave</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-2xl font-semibold text-[var(--color-primary)] mb-1">{totalServices}</p>
            <p className="text-xs text-gray-600">Serviços</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-5 h-5 fill-[var(--color-primary)] text-[var(--color-primary)]" />
              <p className="text-2xl font-semibold text-[var(--color-primary)]">
                {averageRating.toFixed(1)}
              </p>
            </div>
            <p className="text-xs text-gray-600">Avaliação</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-2xl font-semibold text-green-600 mb-1">€{totalSpent}</p>
            <p className="text-xs text-gray-600">Total</p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-[var(--color-primary)]" />
            Informações de Contato
          </h3>
          
          <div className="space-y-4">
            {client.email && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-gray-800">{client.email}</p>
                </div>
              </div>
            )}

            {client.phone && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Telefone</p>
                  <p className="text-gray-800">{client.phone}</p>
                </div>
              </div>
            )}

            {client.address && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Endereço</p>
                  <p className="text-gray-800">{client.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Service History */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[var(--color-primary)]" />
            Histórico de Serviços
          </h3>
          
          {mockServiceHistory.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm">Nenhum serviço realizado ainda</p>
            </div>
          ) : (
            <div className="space-y-4">
              {mockServiceHistory.map((service) => (
                <div key={service.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{service.service}</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {formatDate(service.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[var(--color-primary)] font-semibold mb-1">
                        {service.price}
                      </p>
                      {service.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                          <span className="text-sm font-semibold">{service.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {service.review && (
                    <div className="bg-orange-50 rounded-2xl px-3 py-2 mt-2">
                      <p className="text-xs text-gray-700 italic">"{service.review}"</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Client Badges */}
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow-sm p-5">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            Distintivos
          </h3>
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="text-lg">⭐</span>
              <span className="text-sm font-semibold text-gray-700">Cliente Fiel</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="text-lg">💎</span>
              <span className="text-sm font-semibold text-gray-700">Avaliador</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm">
              <span className="text-lg">✅</span>
              <span className="text-sm font-semibold text-gray-700">Verificado</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
