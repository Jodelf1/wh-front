import { Home, ClipboardList, MessageCircle, User } from 'lucide-react';

interface ProviderBottomNavigationProps {
  currentPage: 'home' | 'requests' | 'chats' | 'profile';
  onNavigate: (page: 'home' | 'requests' | 'chats' | 'profile') => void;
}

export function ProviderBottomNavigation({ currentPage, onNavigate }: ProviderBottomNavigationProps) {
  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'requests' as const, label: 'Pedidos', icon: ClipboardList },
    { id: 'chats' as const, label: 'Chats', icon: MessageCircle },
    { id: 'profile' as const, label: 'Perfil', icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-2 pt-2 pb-safe z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-4 rounded-2xl transition-all flex-1 ${
                isActive 
                  ? 'bg-orange-50' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon 
                className={`w-6 h-6 mb-1 transition-colors ${
                  isActive 
                    ? 'text-[var(--color-primary)]' 
                    : 'text-gray-400'
                }`}
              />
              <span 
                className={`text-xs transition-colors ${
                  isActive 
                    ? 'text-[var(--color-primary)] font-semibold' 
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
