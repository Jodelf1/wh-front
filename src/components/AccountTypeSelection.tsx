import { useState } from 'react';
import { User, Briefcase } from 'lucide-react';
import logoWeHave from 'figma:asset/3da59d2ca70d00b763c0f31c433b1074a1ef33a9.png';

interface AccountTypeSelectionProps {
  onContinue: (type: 'client' | 'provider') => void;
}

export function AccountTypeSelection({ onContinue }: AccountTypeSelectionProps) {
  const [selectedType, setSelectedType] = useState<'client' | 'provider' | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      onContinue(selectedType);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] flex flex-col max-w-md mx-auto">
      {/* Header */}
      <div className="pt-8 pb-6 px-6">
        <img 
          src={logoWeHave} 
          alt="WeHave" 
          className="h-12 w-auto mx-auto mb-8"
        />
        <h1 className="text-center text-2xl">
          Como deseja usar a WeHave?
        </h1>
      </div>

      {/* Cards */}
      <div className="flex-1 px-6 py-4 space-y-4">
        {/* Cliente Card */}
        <button
          onClick={() => setSelectedType('client')}
          className={`w-full p-6 rounded-3xl border-2 transition-all active:scale-98 ${
            selectedType === 'client'
              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-lg'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              selectedType === 'client'
                ? 'bg-[var(--color-primary)]'
                : 'bg-gray-100'
            }`}>
              <User className={`w-8 h-8 ${
                selectedType === 'client' ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1 text-left">
              <h3 className={`text-xl mb-2 ${
                selectedType === 'client' ? 'text-[var(--color-primary)]' : ''
              }`}>
                Cliente
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quero encontrar prestadores de serviços
              </p>
            </div>
          </div>
        </button>

        {/* Prestador Card */}
        <button
          onClick={() => setSelectedType('provider')}
          className={`w-full p-6 rounded-3xl border-2 transition-all active:scale-98 ${
            selectedType === 'provider'
              ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-lg'
              : 'border-gray-200 bg-white hover:border-gray-300'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${
              selectedType === 'provider'
                ? 'bg-[var(--color-primary)]'
                : 'bg-gray-100'
            }`}>
              <Briefcase className={`w-8 h-8 ${
                selectedType === 'provider' ? 'text-white' : 'text-gray-600'
              }`} />
            </div>
            <div className="flex-1 text-left">
              <h3 className={`text-xl mb-2 ${
                selectedType === 'provider' ? 'text-[var(--color-primary)]' : ''
              }`}>
                Prestador de Serviço
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Quero oferecer meus serviços e ganhar dinheiro
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Continue Button */}
      <div className="p-6">
        <button
          onClick={handleContinue}
          disabled={!selectedType}
          className={`w-full py-4 rounded-full transition-all ${
            selectedType
              ? 'bg-[var(--color-primary)] text-white active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
