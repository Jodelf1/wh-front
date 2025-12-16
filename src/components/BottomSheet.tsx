import { useState } from 'react';
import { ChevronDown, ChevronUp, Star, MapPin, Phone, MessageCircle, X } from 'lucide-react';

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

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface BottomSheetProps {
  selectedProvider: Provider | null;
  onClose: () => void;
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (id: string) => void;
  providers: Provider[];
  onProviderClick?: (provider: Provider) => void;
  onViewProfile?: (provider: Provider) => void;
}

export function BottomSheet({
  selectedProvider,
  onClose,
  categories,
  selectedCategory,
  onCategorySelect,
  providers,
  onProviderClick,
  onViewProfile
}: BottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDragStart = (e: React.TouchEvent) => {
    const startY = e.touches[0].clientY;
    
    const handleDragMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY;
      
      if (diff > 50) {
        setIsExpanded(false);
      } else if (diff < -50) {
        setIsExpanded(true);
      }
    };

    const handleDragEnd = () => {
      document.removeEventListener('touchmove', handleDragMove as any);
      document.removeEventListener('touchend', handleDragEnd);
    };

    document.addEventListener('touchmove', handleDragMove as any);
    document.addEventListener('touchend', handleDragEnd);
  };

  if (selectedProvider) {
    return (
      <div className={`absolute bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-3xl shadow-2xl transition-all duration-300 ${
        isExpanded ? 'h-[85vh]' : 'h-[45vh]'
      }`}>
        {/* Handle */}
        <div
          className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
          onTouchStart={handleDragStart}
        >
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Provider Details */}
        <div className="px-6 overflow-y-auto h-[calc(100%-40px)] pb-6">
          <div className="flex items-start gap-4 mb-6">
            <img
              src={selectedProvider.avatar}
              alt={selectedProvider.name}
              className="w-20 h-20 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl mb-1">{selectedProvider.name}</h2>
              <p className="text-gray-600 mb-2">{selectedProvider.service}</p>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                  <span>{selectedProvider.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{selectedProvider.distance}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Price and Availability */}
          <div className="bg-[var(--color-background)] rounded-2xl p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Preço</span>
              <span className="text-xl text-[var(--color-primary)]">{selectedProvider.price}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Disponibilidade</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-green-600">Disponível agora</span>
              </span>
            </div>
          </div>

          {/* About */}
          <div className="mb-4">
            <h3 className="text-lg mb-2">Sobre</h3>
            <p className="text-gray-600 leading-relaxed">
              Profissional com mais de 5 anos de experiência. Atendimento rápido e qualidade garantida. 
              Trabalho com seriedade e comprometimento.
            </p>
          </div>

          {/* Services */}
          <div className="mb-6">
            <h3 className="text-lg mb-3">Serviços oferecidos</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                <span className="text-gray-600">Instalação e manutenção</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                <span className="text-gray-600">Reparos em geral</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full"></div>
                <span className="text-gray-600">Orçamento gratuito</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] active:scale-95 transition-transform">
              <Phone className="w-5 h-5" />
              <span>Ligar</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-full border-2 border-[var(--color-primary)] text-[var(--color-primary)] active:scale-95 transition-transform">
              <MessageCircle className="w-5 h-5" />
              <span>Mensagem</span>
            </button>
          </div>

          <button 
            onClick={() => {
              if (onViewProfile) {
                onViewProfile(selectedProvider);
              }
            }}
            className="w-full bg-[var(--color-primary)] text-white py-4 rounded-full mt-3 active:scale-95 transition-transform"
          >
            Ver Perfil Completo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-3xl shadow-2xl transition-all duration-300 ${
      isExpanded ? 'h-[70vh]' : 'h-[35vh]'
    }`}>
      {/* Handle */}
      <div
        className="flex justify-center pt-3 pb-2 cursor-grab active:cursor-grabbing"
        onTouchStart={handleDragStart}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <h3 className="text-lg mb-3 px-2">Categorias</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-[var(--color-primary)] text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Providers List */}
      <div className="px-4 overflow-y-auto h-[calc(100%-120px)] pb-20">
        <div className="flex items-center justify-between mb-3 px-2">
          <h3 className="text-lg">Prestadores próximos</h3>
          <button onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        <div className="space-y-3">
          {providers.slice(0, isExpanded ? providers.length : 3).map((provider) => (
            <button
              key={provider.id}
              onClick={() => {
                if (onProviderClick) {
                  onProviderClick(provider);
                }
              }}
              className="w-full bg-white border border-gray-200 rounded-2xl p-4 flex items-center gap-3 active:scale-98 transition-transform"
            >
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-14 h-14 rounded-xl object-cover"
              />
              <div className="flex-1 text-left">
                <h4 className="font-semibold mb-1">{provider.name}</h4>
                <p className="text-sm text-gray-600 mb-1">{provider.service}</p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                    <span>{provider.rating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{provider.distance}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[var(--color-primary)]">{provider.price}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}