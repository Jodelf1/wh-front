import { Home, Search, FileText, User } from 'lucide-react';

interface BottomNavigationProps {
  currentPage: 'home' | 'search' | 'orders' | 'profile';
  onNavigate?: (page: 'home' | 'search' | 'orders' | 'profile') => void;
}

export function BottomNavigation({ currentPage, onNavigate }: BottomNavigationProps) {
  const handleNavigation = (page: 'home' | 'search' | 'orders' | 'profile') => {
    if (onNavigate) {
      onNavigate(page);
    } else {
      // Default behavior - alert for demo
      if (page !== currentPage) {
        alert(`Navegando para: ${page}`);
      }
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[1001] bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-4">
        <button
          onClick={() => handleNavigation('home')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
            currentPage === 'home'
              ? 'text-[var(--color-primary)]'
              : 'text-gray-400'
          }`}
        >
          <Home className={`w-6 h-6 ${currentPage === 'home' ? 'fill-[var(--color-primary)]' : ''}`} />
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => handleNavigation('search')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
            currentPage === 'search'
              ? 'text-[var(--color-primary)]'
              : 'text-gray-400'
          }`}
        >
          <Search className="w-6 h-6" />
          <span className="text-xs">Pesquisa</span>
        </button>

        <button
          onClick={() => handleNavigation('orders')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
            currentPage === 'orders'
              ? 'text-[var(--color-primary)]'
              : 'text-gray-400'
          }`}
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs">Pedidos</span>
        </button>

        <button
          onClick={() => handleNavigation('profile')}
          className={`flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all ${
            currentPage === 'profile'
              ? 'text-[var(--color-primary)]'
              : 'text-gray-400'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">Perfil</span>
        </button>
      </div>
    </div>
  );
}
