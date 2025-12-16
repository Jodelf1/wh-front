import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Star, Calendar, Edit2, Camera, Settings, LogOut, Briefcase, DollarSign, TrendingUp, Award, ChevronRight } from 'lucide-react';
import { ProviderBottomNavigation } from './ProviderBottomNavigation';

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  category: string;
}

interface Review {
  id: number;
  client: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  service: string;
}

interface WorkHistory {
  id: number;
  client: {
    name: string;
    avatar: string;
  };
  service: string;
  date: string;
  price: string;
  rating?: number;
  status: 'completed' | 'cancelled';
}

interface ProviderProfileScreenProps {
  providerName: string;
  onNavigate: (page: 'home' | 'requests' | 'chats' | 'profile') => void;
  onLogout: () => void;
}

const mockServices: Service[] = [
  { id: 1, name: 'Instalação elétrica', price: '€45', duration: '2h', category: 'Eletricista' },
  { id: 2, name: 'Reparo elétrico', price: '€35', duration: '1h', category: 'Eletricista' },
  { id: 3, name: 'Manutenção preventiva', price: '€50', duration: '2h', category: 'Eletricista' },
  { id: 4, name: 'Instalação de lustre', price: '€40', duration: '1.5h', category: 'Eletricista' },
];

const mockReviews: Review[] = [
  {
    id: 1,
    client: { name: 'Ana Costa', avatar: 'https://i.pravatar.cc/150?img=47' },
    rating: 5,
    comment: 'Excelente trabalho! Muito profissional e pontual.',
    date: '2024-12-15',
    service: 'Instalação elétrica',
  },
  {
    id: 2,
    client: { name: 'Pedro Silva', avatar: 'https://i.pravatar.cc/150?img=13' },
    rating: 5,
    comment: 'Recomendo! Serviço impecável.',
    date: '2024-12-14',
    service: 'Reparo elétrico',
  },
  {
    id: 3,
    client: { name: 'Maria Santos', avatar: 'https://i.pravatar.cc/150?img=32' },
    rating: 5,
    comment: 'Perfeito! Voltarei a contratar.',
    date: '2024-12-13',
    service: 'Manutenção preventiva',
  },
  {
    id: 4,
    client: { name: 'João Oliveira', avatar: 'https://i.pravatar.cc/150?img=12' },
    rating: 4,
    comment: 'Bom serviço, mas atrasou um pouco.',
    date: '2024-12-12',
    service: 'Instalação de lustre',
  },
];

const mockWorkHistory: WorkHistory[] = [
  {
    id: 1,
    client: { name: 'Ana Costa', avatar: 'https://i.pravatar.cc/150?img=47' },
    service: 'Instalação elétrica',
    date: '2024-12-15',
    price: '€45',
    rating: 5,
    status: 'completed',
  },
  {
    id: 2,
    client: { name: 'Pedro Silva', avatar: 'https://i.pravatar.cc/150?img=13' },
    service: 'Reparo elétrico',
    date: '2024-12-14',
    price: '€35',
    rating: 5,
    status: 'completed',
  },
  {
    id: 3,
    client: { name: 'Maria Santos', avatar: 'https://i.pravatar.cc/150?img=32' },
    service: 'Manutenção preventiva',
    date: '2024-12-13',
    price: '€50',
    rating: 5,
    status: 'completed',
  },
  {
    id: 4,
    client: { name: 'João Oliveira', avatar: 'https://i.pravatar.cc/150?img=12' },
    service: 'Instalação de lustre',
    date: '2024-12-12',
    price: '€40',
    rating: 4,
    status: 'completed',
  },
  {
    id: 5,
    client: { name: 'Carla Mendes', avatar: 'https://i.pravatar.cc/150?img=44' },
    service: 'Troca de tomadas',
    date: '2024-12-11',
    price: '€30',
    status: 'cancelled',
  },
];

export function ProviderProfileScreen({ providerName, onNavigate, onLogout }: ProviderProfileScreenProps) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditServices, setShowEditServices] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showWorkHistory, setShowWorkHistory] = useState(false);

  const providerAvatar = 'https://i.pravatar.cc/150?img=33';
  const providerEmail = 'prestador@wehave.com';
  const providerPhone = '+351 923 456 789';
  const providerAddress = 'Lisboa, Portugal';

  // Calculate stats
  const totalJobs = mockWorkHistory.filter(w => w.status === 'completed').length;
  const averageRating = mockReviews.reduce((acc, r) => acc + r.rating, 0) / mockReviews.length;
  const totalEarnings = mockWorkHistory
    .filter(w => w.status === 'completed')
    .reduce((acc, w) => acc + parseFloat(w.price.replace('€', '')), 0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  // Edit Profile Screen
  if (showEditProfile) {
    return (
      <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
        <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEditProfile(false)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl font-semibold">Editar Perfil</h1>
          </div>
        </div>

        <div className="px-4 py-6 pb-24">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img src={providerAvatar} alt={providerName} className="w-32 h-32 rounded-full object-cover" />
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center border-3 border-white shadow-lg">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Nome completo</label>
              <input
                type="text"
                defaultValue={providerName}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Email</label>
              <input
                type="email"
                defaultValue={providerEmail}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Telefone</label>
              <input
                type="tel"
                defaultValue={providerPhone}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Endereço</label>
              <input
                type="text"
                defaultValue={providerAddress}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary)]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Categoria</label>
              <select className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary)]">
                <option>Eletricista</option>
                <option>Encanador</option>
                <option>Pintor</option>
                <option>Carpinteiro</option>
                <option>Limpeza</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600 mb-2 block">Descrição</label>
              <textarea
                rows={4}
                defaultValue="Eletricista profissional com 10 anos de experiência."
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary)] resize-none"
              />
            </div>

            <button className="w-full py-4 bg-[var(--color-primary)] text-white rounded-full font-semibold active:scale-95 transition-transform">
              Salvar Alterações
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Edit Services Screen
  if (showEditServices) {
    return (
      <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
        <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowEditServices(false)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <h1 className="text-xl font-semibold">Meus Serviços</h1>
            </div>
            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-full text-sm font-semibold">
              + Adicionar
            </button>
          </div>
        </div>

        <div className="px-4 py-6 pb-24 overflow-y-auto h-[calc(100vh-96px)]">
          <div className="space-y-3">
            {mockServices.map((service) => (
              <div key={service.id} className="bg-white rounded-3xl shadow-sm p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{service.name}</h3>
                    <p className="text-xs text-gray-600">{service.category}</p>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Edit2 className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="font-semibold text-[var(--color-primary)]">{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{service.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Reviews Screen
  if (showReviews) {
    return (
      <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
        <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowReviews(false)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Avaliações</h1>
              <p className="text-xs text-gray-600">{mockReviews.length} avaliações</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-3xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avaliação Geral</p>
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                  <span className="text-2xl font-semibold">{averageRating.toFixed(1)}</span>
                  <span className="text-sm text-gray-600">de 5</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-[var(--color-primary)]">{mockReviews.length}</p>
                <p className="text-xs text-gray-600">avaliações</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 pb-24 overflow-y-auto h-[calc(100vh-180px)]">
          <div className="space-y-3">
            {mockReviews.map((review) => (
              <div key={review.id} className="bg-white rounded-3xl shadow-sm p-5">
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={review.client.avatar}
                    alt={review.client.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{review.client.name}</h4>
                    <p className="text-xs text-gray-600">{review.service}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-[var(--color-primary)] text-[var(--color-primary)]'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{formatDate(review.date)}</span>
                </div>
                <p className="text-sm text-gray-700 italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Work History Screen
  if (showWorkHistory) {
    return (
      <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
        <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setShowWorkHistory(false)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Histórico de Trabalhos</h1>
              <p className="text-xs text-gray-600">{totalJobs} trabalhos concluídos</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-3 text-center">
              <p className="text-xl font-semibold text-green-700">{totalJobs}</p>
              <p className="text-xs text-green-600">Concluídos</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-3 text-center">
              <p className="text-xl font-semibold text-[var(--color-primary)]">€{totalEarnings}</p>
              <p className="text-xs text-orange-600">Ganhos</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-3 text-center">
              <p className="text-xl font-semibold text-purple-700">{averageRating.toFixed(1)}★</p>
              <p className="text-xs text-purple-600">Média</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 pb-24 overflow-y-auto h-[calc(100vh-200px)]">
          <div className="space-y-3">
            {mockWorkHistory.map((work) => (
              <div key={work.id} className="bg-white rounded-3xl shadow-sm p-5">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3 ${
                  work.status === 'completed' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                  <span className={`text-xs font-semibold ${
                    work.status === 'completed' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {work.status === 'completed' ? 'Concluído' : 'Cancelado'}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={work.client.avatar}
                    alt={work.client.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{work.client.name}</h4>
                    <p className="text-sm text-gray-600">{work.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-[var(--color-primary)]">{work.price}</p>
                    {work.rating && (
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-4 h-4 fill-[var(--color-primary)] text-[var(--color-primary)]" />
                        <span className="text-sm font-semibold">{work.rating}</span>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-xs text-gray-500">{formatDate(work.date)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main Profile Screen
  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
      {/* Header with Cover */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-[var(--color-primary)] to-orange-600"></div>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative">
            <img
              src={providerAvatar}
              alt={providerName}
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <button className="absolute bottom-2 right-2 w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center border-3 border-white shadow-lg active:scale-95 transition-transform">
              <Camera className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-20 pb-24 overflow-y-auto h-[calc(100vh-128px)]">
        {/* User Info */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold mb-1">{providerName}</h1>
          <p className="text-gray-600">Eletricista Profissional</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 text-center">
            <p className="text-2xl font-semibold text-green-600 mb-1">{totalJobs}</p>
            <p className="text-xs text-gray-600">Trabalhos</p>
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
            <p className="text-2xl font-semibold text-[var(--color-primary)] mb-1">€{totalEarnings}</p>
            <p className="text-xs text-gray-600">Ganhos</p>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Dados Pessoais</h3>
            <button 
              onClick={() => setShowEditProfile(true)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
            >
              <Edit2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Nome Completo</p>
                <p className="text-gray-800">{providerName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-gray-800">{providerEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Telefone</p>
                <p className="text-gray-800">{providerPhone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Localização</p>
                <p className="text-gray-800">{providerAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-3xl shadow-sm mb-4 overflow-hidden">
          <button 
            onClick={() => setShowEditServices(true)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Meus Serviços</p>
                <p className="text-xs text-gray-600">{mockServices.length} serviços cadastrados</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => setShowReviews(true)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Avaliações</p>
                <p className="text-xs text-gray-600">{mockReviews.length} avaliações • {averageRating.toFixed(1)} ★</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => setShowWorkHistory(true)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-semibold">Histórico de Trabalhos</p>
                <p className="text-xs text-gray-600">{totalJobs} trabalhos concluídos</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Settings & Logout */}
        <div className="bg-white rounded-3xl shadow-sm mb-4 overflow-hidden">
          <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Settings className="w-5 h-5 text-gray-700" />
              </div>
              <span>Configurações</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={() => {
              if (confirm('Tem certeza que deseja sair?')) {
                onLogout();
              }
            }}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-red-50 active:bg-red-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <LogOut className="w-5 h-5 text-red-600" />
              </div>
              <span className="text-red-600 font-semibold">Sair da Conta</span>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <ProviderBottomNavigation currentPage="profile" onNavigate={onNavigate} />
    </div>
  );
}
