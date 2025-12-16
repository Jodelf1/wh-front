import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Search, Star, MapPin } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface Provider {
  id: number;
  name: string;
  service: string;
  rating: number;
  distance: string;
  price: string;
  avatar: string;
}

interface SearchScreenProps {
  onBack: () => void;
  onCategorySelect?: (categoryId: string) => void;
  onProviderSelect?: (providerId: number) => void;
}

const categories: Category[] = [
  { id: 'eletricista', name: 'Eletricista', icon: '⚡', color: 'bg-yellow-400' },
  { id: 'canalizador', name: 'Canalizador', icon: '🔧', color: 'bg-blue-400' },
  { id: 'pintor', name: 'Pintor', icon: '🎨', color: 'bg-purple-400' },
  { id: 'limpeza', name: 'Limpeza', icon: '🧹', color: 'bg-green-400' },
  { id: 'jardinagem', name: 'Jardinagem', icon: '🌱', color: 'bg-emerald-400' },
  { id: 'pedreiro', name: 'Pedreiro', icon: '🧱', color: 'bg-orange-400' },
  { id: 'carpinteiro', name: 'Carpinteiro', icon: '🪵', color: 'bg-amber-600' },
  { id: 'mecanico', name: 'Mecânico', icon: '🔩', color: 'bg-gray-500' },
  { id: 'marceneiro', name: 'Marceneiro', icon: '🪚', color: 'bg-yellow-600' },
  { id: 'serralheiro', name: 'Serralheiro', icon: '🔨', color: 'bg-slate-600' },
  { id: 'design', name: 'Design', icon: '✏️', color: 'bg-pink-400' },
  { id: 'fotografia', name: 'Fotografia', icon: '📸', color: 'bg-indigo-400' },
];

const mockProviders: Provider[] = [
  {
    id: 1,
    name: "João Silva",
    service: "Eletricista",
    rating: 4.8,
    distance: "0.5 km",
    price: "€30/hora",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 2,
    name: "Maria Santos",
    service: "Canalizador",
    rating: 4.9,
    distance: "1.2 km",
    price: "€35/hora",
    avatar: "https://i.pravatar.cc/150?img=45"
  },
  {
    id: 3,
    name: "Pedro Costa",
    service: "Pintor",
    rating: 4.7,
    distance: "0.8 km",
    price: "€25/hora",
    avatar: "https://i.pravatar.cc/150?img=33"
  },
  {
    id: 4,
    name: "Ana Oliveira",
    service: "Limpeza",
    rating: 5.0,
    distance: "1.5 km",
    price: "€20/hora",
    avatar: "https://i.pravatar.cc/150?img=48"
  },
  {
    id: 5,
    name: "Carlos Ferreira",
    service: "Jardinagem",
    rating: 4.6,
    distance: "2.0 km",
    price: "€28/hora",
    avatar: "https://i.pravatar.cc/150?img=15"
  },
  {
    id: 6,
    name: "Ricardo Almeida",
    service: "Pedreiro",
    rating: 4.7,
    distance: "1.8 km",
    price: "€32/hora",
    avatar: "https://i.pravatar.cc/150?img=68"
  },
  {
    id: 7,
    name: "Sofia Ribeiro",
    service: "Design",
    rating: 4.9,
    distance: "2.5 km",
    price: "€40/hora",
    avatar: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: 8,
    name: "Miguel Sousa",
    service: "Carpinteiro",
    rating: 4.8,
    distance: "1.1 km",
    price: "€30/hora",
    avatar: "https://i.pravatar.cc/150?img=51"
  }
];

export function SearchScreen({ onBack, onCategorySelect, onProviderSelect }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearchFocus = () => {
    setIsSearching(true);
  };

  const handleSearchBlur = () => {
    if (searchQuery === '') {
      setIsSearching(false);
    }
  };

  const handleCategoryClick = (categoryId: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    } else {
      alert(`Categoria selecionada: ${categoryId}`);
    }
  };

  const handleProviderClick = (providerId: number) => {
    if (onProviderSelect) {
      onProviderSelect(providerId);
    } else {
      alert(`Prestador selecionado: ID ${providerId}`);
    }
  };

  // Filter results based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredProviders = mockProviders.filter(provider =>
    provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    provider.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const showSuggestions = isSearching && searchQuery.length > 0;

  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 pt-6 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--color-text)]" />
          </button>
          <h1 className="text-xl flex-1">Pesquisar</h1>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleSearchFocus}
            placeholder="Procurar serviços ou prestadores..."
            className="w-full bg-gray-100 rounded-full pl-12 pr-4 py-3 text-[var(--color-text)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearching(false);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100vh-140px)] pb-20">
        {!isSearching ? (
          /* Categories Grid */
          <div className="p-4">
            <h2 className="text-lg mb-4">Categorias</h2>
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`${category.color} rounded-3xl p-6 flex flex-col items-center justify-center gap-3 active:scale-95 transition-transform shadow-md hover:shadow-lg`}
                >
                  <span className="text-5xl">{category.icon}</span>
                  <span className="text-white font-semibold text-center">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Search Results */
          <div className="p-4">
            {searchQuery === '' ? (
              <div className="text-center py-12 text-gray-400">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-30" />
                <p>Digite para procurar serviços ou prestadores</p>
              </div>
            ) : (
              <>
                {/* Service Suggestions */}
                {filteredCategories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm text-gray-500 mb-3 px-2">Serviços</h3>
                    <div className="space-y-2">
                      {filteredCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryClick(category.id)}
                          className="w-full bg-white rounded-2xl p-4 flex items-center gap-4 active:scale-98 transition-transform shadow-sm"
                        >
                          <div className={`${category.color} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
                            {category.icon}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-semibold">{category.name}</p>
                            <p className="text-sm text-gray-500">Serviço</p>
                          </div>
                          <Search className="w-5 h-5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Provider Suggestions */}
                {filteredProviders.length > 0 && (
                  <div>
                    <h3 className="text-sm text-gray-500 mb-3 px-2">Prestadores</h3>
                    <div className="space-y-2">
                      {filteredProviders.map((provider) => (
                        <button
                          key={provider.id}
                          onClick={() => handleProviderClick(provider.id)}
                          className="w-full bg-white rounded-2xl p-4 flex items-center gap-3 active:scale-98 transition-transform shadow-sm"
                        >
                          <img
                            src={provider.avatar}
                            alt={provider.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="flex-1 text-left">
                            <p className="font-semibold">{provider.name}</p>
                            <p className="text-sm text-gray-600 mb-1">{provider.service}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                                <span>{provider.rating}</span>
                              </div>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                <span>{provider.distance}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-[var(--color-primary)]">{provider.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* No Results */}
                {filteredCategories.length === 0 && filteredProviders.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-600 mb-2">Nenhum resultado encontrado</p>
                    <p className="text-sm text-gray-400">Tente procurar por outro termo</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
