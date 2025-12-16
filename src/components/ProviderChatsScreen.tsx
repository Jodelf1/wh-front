import { ArrowLeft, MessageCircle } from 'lucide-react';
import { ProviderBottomNavigation } from './ProviderBottomNavigation';

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

interface ProviderChatsScreenProps {
  onNavigate: (page: 'home' | 'requests' | 'chats' | 'profile') => void;
  onBack: () => void;
  onChatSelect: (chat: Chat) => void;
}

const mockChats: Chat[] = [
  {
    id: 1,
    client: {
      name: 'Ana Costa',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
    service: 'Instalação elétrica',
    lastMessage: 'Obrigada! Já chegou?',
    time: '10:30',
    unread: 2,
    isActive: true,
  },
  {
    id: 2,
    client: {
      name: 'Pedro Silva',
      avatar: 'https://i.pravatar.cc/150?img=13',
    },
    service: 'Reparo elétrico',
    lastMessage: 'Perfeito, obrigado!',
    time: '09:15',
    unread: 0,
    isActive: true,
  },
  {
    id: 3,
    client: {
      name: 'Maria Santos',
      avatar: 'https://i.pravatar.cc/150?img=32',
    },
    service: 'Manutenção preventiva',
    lastMessage: 'Excelente trabalho!',
    time: 'Ontem',
    unread: 0,
    isActive: false,
  },
  {
    id: 4,
    client: {
      name: 'João Oliveira',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    service: 'Instalação de lustre',
    lastMessage: 'Pode vir amanhã?',
    time: '15/12',
    unread: 1,
    isActive: false,
  },
];

export function ProviderChatsScreen({ onNavigate, onBack, onChatSelect }: ProviderChatsScreenProps) {
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
            <h1 className="text-xl font-semibold">Conversas</h1>
            <p className="text-xs text-gray-600">{mockChats.length} conversas</p>
          </div>
        </div>
      </div>

      {/* Chats List */}
      <div className="overflow-y-auto h-[calc(100vh-96px)] pb-20">
        {mockChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <MessageCircle className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhuma conversa</h3>
            <p className="text-gray-600 text-sm px-8">
              Suas conversas com clientes aparecerão aqui.
            </p>
          </div>
        ) : (
          <div>
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onChatSelect(chat)}
                className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.client.avatar}
                    alt={chat.client.name}
                    className="w-14 h-14 rounded-xl object-cover"
                  />
                  {chat.isActive && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* Chat Info */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold truncate">{chat.client.name}</h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">{chat.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1 truncate">{chat.service}</p>
                  {chat.isActive && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 mb-1">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs font-semibold text-green-700">Chat Ativo</span>
                    </div>
                  )}
                  <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                </div>

                {/* Unread Badge */}
                {chat.unread > 0 && (
                  <div className="flex-shrink-0 w-6 h-6 bg-[var(--color-primary)] rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-semibold">{chat.unread}</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <ProviderBottomNavigation currentPage="chats" onNavigate={onNavigate} />
    </div>
  );
}
