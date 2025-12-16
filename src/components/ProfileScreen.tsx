import { useState } from 'react';
import { ArrowLeft, User, Mail, Phone, MapPin, Star, Calendar, ChevronRight, Settings, Bell, Lock, CreditCard, HelpCircle, LogOut, Edit2, Camera } from 'lucide-react';
import { BottomNavigation } from './BottomNavigation';

interface Service {
  id: number;
  provider: {
    name: string;
    avatar: string;
    service: string;
  };
  service: string;
  date: string;
  price: string;
  rating?: number;
  review?: string;
}

interface ProfileScreenProps {
  userName: string;
  userEmail: string;
  userPhone: string;
  userAddress: string;
  userAvatar: string;
  completedServices: Service[];
  onNavigate: (page: 'home' | 'search' | 'orders' | 'profile') => void;
  onLogout: () => void;
}

export function ProfileScreen({
  userName,
  userEmail,
  userPhone,
  userAddress,
  userAvatar,
  completedServices,
  onNavigate,
  onLogout
}: ProfileScreenProps) {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Calculate stats
  const totalServices = completedServices.length;
  const averageRating = completedServices.reduce((acc, s) => acc + (s.rating || 0), 0) / (completedServices.filter(s => s.rating).length || 1);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  if (showSettings) {
    return (
      <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(false)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-xl">Configurações</h1>
          </div>
        </div>

        {/* Settings Content */}
        <div className="px-4 py-6 pb-24 overflow-y-auto h-[calc(100vh-140px)]">
          {/* Notifications */}
          <div className="bg-white rounded-3xl shadow-sm mb-4 overflow-hidden">
            <h3 className="font-semibold px-5 pt-5 pb-3">Notificações</h3>
            <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <span>Notificações Push</span>
              </div>
              <div className="w-12 h-6 bg-[var(--color-primary)] rounded-full relative">
                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </button>
          </div>

          {/* Security */}
          <div className="bg-white rounded-3xl shadow-sm mb-4 overflow-hidden">
            <h3 className="font-semibold px-5 pt-5 pb-3">Segurança</h3>
            <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-purple-600" />
                </div>
                <span>Alterar Senha</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <span>Autenticação de Dois Fatores</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-3xl shadow-sm mb-4 overflow-hidden">
            <h3 className="font-semibold px-5 pt-5 pb-3">Pagamento</h3>
            <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-[var(--color-primary)]" />
                </div>
                <span>Métodos de Pagamento</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Support */}
          <div className="bg-white rounded-3xl shadow-sm mb-4 overflow-hidden">
            <h3 className="font-semibold px-5 pt-5 pb-3">Suporte</h3>
            <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                </div>
                <span>Central de Ajuda</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <span>Fale Conosco</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* About */}
          <div className="bg-white rounded-3xl shadow-sm mb-4 overflow-hidden">
            <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors">
              <span className="text-gray-600">Termos de Uso</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-t border-gray-100">
              <span className="text-gray-600">Política de Privacidade</span>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <div className="px-5 py-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">Versão 1.0.0</p>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNavigation currentPage="profile" onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
      {/* Header with Cover */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-br from-[var(--color-primary)] to-orange-600"></div>
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
          <div className="relative">
            <img
              src={userAvatar}
              alt={userName}
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
          <h1 className="text-2xl font-semibold mb-1">{userName}</h1>
          <p className="text-gray-600">{userEmail}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-3xl shadow-sm p-4 text-center">
            <p className="text-3xl font-semibold text-[var(--color-primary)] mb-1">{totalServices}</p>
            <p className="text-sm text-gray-600">Serviços</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="w-6 h-6 fill-[var(--color-primary)] text-[var(--color-primary)]" />
              <p className="text-3xl font-semibold text-[var(--color-primary)]">
                {averageRating.toFixed(1)}
              </p>
            </div>
            <p className="text-sm text-gray-600">Avaliação Média</p>
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
                <p className="text-gray-800">{userName}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-gray-800">{userEmail}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Telefone</p>
                <p className="text-gray-800">{userPhone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[var(--color-primary)]" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 mb-1">Endereço</p>
                <p className="text-gray-800">{userAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Service History */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
          <h3 className="font-semibold mb-4">Histórico de Serviços</h3>
          
          {completedServices.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm">Nenhum serviço concluído ainda</p>
            </div>
          ) : (
            <div className="space-y-4">
              {completedServices.slice(0, 3).map((service) => (
                <div key={service.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-start gap-3 mb-2">
                    <img
                      src={service.provider.avatar}
                      alt={service.provider.name}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{service.provider.name}</h4>
                      <p className="text-xs text-gray-600">{service.service}</p>
                      <p className="text-xs text-gray-500 mt-1">
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
                    <p className="text-xs text-gray-600 italic pl-15">"{service.review}"</p>
                  )}
                </div>
              ))}
              
              {completedServices.length > 3 && (
                <button className="w-full py-3 text-[var(--color-primary)] font-semibold text-sm">
                  Ver todos ({completedServices.length})
                </button>
              )}
            </div>
          )}
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-3xl shadow-sm mb-4 overflow-hidden">
          <button 
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <Settings className="w-5 h-5 text-gray-700" />
              </div>
              <span>Configurações</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <span>Ajuda e Suporte</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>

          <button 
            onClick={onLogout}
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
      <BottomNavigation currentPage="profile" onNavigate={onNavigate} />
    </div>
  );
}
