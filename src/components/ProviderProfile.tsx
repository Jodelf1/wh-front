import { useState } from 'react';
import { ArrowLeft, Star, MapPin, Clock, Shield, ChevronRight } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
}

interface Provider {
  id: number;
  name: string;
  service: string;
  rating: number;
  distance: string;
  price: string;
  avatar: string;
  totalReviews?: number;
  experience?: string;
  services?: Service[];
  bio?: string;
  verified?: boolean;
}

interface ProviderProfileProps {
  provider: Provider;
  onBack: () => void;
  onRequestService: (provider: Provider) => void;
  similarProviders?: Provider[];
}

const defaultServices: Service[] = [
  { id: 1, name: 'Serviço Básico', price: '€25', duration: '1h' },
  { id: 2, name: 'Serviço Completo', price: '€45', duration: '2h' },
  { id: 3, name: 'Serviço Premium', price: '€70', duration: '3h' },
  { id: 4, name: 'Manutenção', price: '€35', duration: '1.5h' },
];

export function ProviderProfile({ 
  provider, 
  onBack, 
  onRequestService,
  similarProviders = []
}: ProviderProfileProps) {
  const [selectedService, setSelectedService] = useState<number | null>(null);
  
  const services = provider.services || defaultServices;
  const totalReviews = provider.totalReviews || Math.floor(Math.random() * 200) + 50;
  const experience = provider.experience || `${Math.floor(Math.random() * 8) + 2} anos`;
  const bio = provider.bio || `Profissional especializado em ${provider.service.toLowerCase()} com vasta experiência no mercado. Atendimento de qualidade e pontualidade garantida.`;
  const verified = provider.verified !== undefined ? provider.verified : true;

  const handleRequestService = () => {
    onRequestService(provider);
  };

  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-br from-[var(--color-primary)] to-orange-600 pt-6 pb-24 px-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform mb-4"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative -mt-16 px-4 pb-24 overflow-y-auto h-[calc(100vh-120px)]">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-4">
          {/* Avatar */}
          <div className="flex flex-col items-center -mt-16 mb-4">
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
              />
              {verified && (
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full border-3 border-white flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>

          {/* Name and Category */}
          <div className="text-center mb-4">
            <h1 className="text-2xl mb-1">{provider.name}</h1>
            <p className="text-gray-600">{provider.service}</p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 mb-4 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-[var(--color-primary)] text-[var(--color-primary)]" />
              <span className="font-semibold">{provider.rating}</span>
              <span className="text-gray-500 text-sm">({totalReviews})</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{provider.distance}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{experience}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Sobre</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
          </div>
        </div>

        {/* Services List */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-4">
          <h3 className="font-semibold mb-4">Serviços Oferecidos</h3>
          <div className="space-y-3">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full p-4 rounded-2xl border-2 transition-all active:scale-98 ${
                  selectedService === service.id
                    ? 'border-[var(--color-primary)] bg-orange-50'
                    : 'border-gray-100 bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <p className="font-semibold mb-1">{service.name}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{service.duration}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg text-[var(--color-primary)]">{service.price}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Similar Providers */}
        {similarProviders.length > 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Prestadores Similares</h3>
              <button className="text-sm text-[var(--color-primary)] flex items-center gap-1">
                Ver todos
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {similarProviders.slice(0, 3).map((similar) => (
                <button
                  key={similar.id}
                  className="w-full p-3 rounded-2xl bg-gray-50 flex items-center gap-3 active:scale-98 transition-transform"
                >
                  <img
                    src={similar.avatar}
                    alt={similar.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-sm">{similar.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                        <span className="text-xs text-gray-600">{similar.rating}</span>
                      </div>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-600">{similar.distance}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-[var(--color-primary)]">{similar.price}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
        <button
          onClick={handleRequestService}
          className="w-full bg-[var(--color-primary)] text-white py-4 rounded-full font-semibold active:scale-98 transition-transform shadow-lg hover:shadow-xl"
        >
          Solicitar Serviço
        </button>
      </div>
    </div>
  );
}
