import { useState } from 'react';
import { OnboardingSlide } from './components/OnboardingSlide';
import { AccountTypeSelection } from './components/AccountTypeSelection';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';
import { ClientHome } from './components/ClientHome';
import { ProviderHome } from './components/ProviderHome';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logoWeHave from 'figma:asset/3da59d2ca70d00b763c0f31c433b1074a1ef33a9.png';

const slides = [
  {
    imageUrl: "https://images.unsplash.com/photo-1758274252144-6421f856e770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWFydHBob25lJTIwc2VydmljZXN8ZW58MXx8fHwxNzY1ODcyMDg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Precisa de um serviço rápido?",
    description: "Encontre prestadores perto de si em segundos."
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1760888549280-4aef010720bd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBjb252ZW5pZW50fGVufDF8fHx8MTc2NTg3MjA4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Escolha, solicite e resolva.",
    description: "Tudo num só lugar."
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1759310610325-2c7cb621e5e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cnVzdCUyMGhhbmRzaGFrZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc2NTc2Mjk2NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Veja avaliações e contrate",
    description: "com confiança e segurança."
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1728281144091-b743062a9bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrJTIwc2tpbGxzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2NTg3MjA4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Tem uma habilidade?",
    description: "Ganhe dinheiro quando quiser."
  }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showAccountSelection, setShowAccountSelection] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showHome, setShowHome] = useState(false);
  const [accountType, setAccountType] = useState<'client' | 'provider' | null>(null);
  const [userName, setUserName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSkip = () => {
    setShowAccountSelection(true);
  };

  const handleStart = () => {
    setShowAccountSelection(true);
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleBackFromLogin = () => {
    setShowLogin(false);
  };

  const handleCreateAccount = () => {
    setShowLogin(false);
    setShowAccountSelection(true);
  };

  const handleForgotPassword = () => {
    alert('Recuperação de senha - Em desenvolvimento');
  };

  const handleLoginSubmit = (email: string, password: string) => {
    // TODO: Implement login logic
    console.log('Login:', email, password);
    setUserName(email.split('@')[0]);
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowHome(true);
  };

  const handleAccountTypeSelected = (type: 'client' | 'provider') => {
    setAccountType(type);
    setShowAccountSelection(false);
    setShowRegister(true);
  };

  const handleBackFromRegister = () => {
    setShowRegister(false);
    setShowAccountSelection(true);
  };

  const handleGoToLoginFromRegister = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleRegisterSubmit = (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    // TODO: Implement register logic
    console.log('Register:', data, 'Account Type:', accountType);
    setUserName(data.name);
    setIsLoggedIn(true);
    setShowRegister(false);
    setShowHome(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowHome(false);
    setUserName('');
    setAccountType(null);
    setShowLogin(true);
  };

  if (showHome && isLoggedIn) {
    if (accountType === 'client') {
      return <ClientHome userName={userName} onLogout={handleLogout} />;
    }
    
    return <ProviderHome userName={userName} onLogout={handleLogout} />;
  }

  if (showRegister && accountType) {
    return (
      <RegisterScreen
        accountType={accountType}
        onBack={handleBackFromRegister}
        onLogin={handleGoToLoginFromRegister}
        onRegister={handleRegisterSubmit}
      />
    );
  }

  if (showLogin) {
    return (
      <LoginScreen
        onBack={handleBackFromLogin}
        onCreateAccount={handleCreateAccount}
        onForgotPassword={handleForgotPassword}
        onLogin={handleLoginSubmit}
      />
    );
  }

  if (showAccountSelection) {
    return <AccountTypeSelection onContinue={handleAccountTypeSelected} />;
  }

  return (
    <div className="relative w-full h-screen max-w-md mx-auto bg-white overflow-hidden">
      {/* Logo */}
      <div className="absolute top-6 left-6 z-20">
        <img 
          src={logoWeHave} 
          alt="WeHave" 
          className="h-10 w-auto"
        />
      </div>

      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 text-white px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm"
      >
        Pular
      </button>

      {/* Slides Container */}
      <div 
        className="flex h-full transition-transform duration-300 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="min-w-full h-full">
            <OnboardingSlide
              imageUrl={slide.imageUrl}
              title={slide.title}
              description={slide.description}
              isLast={index === slides.length - 1}
              onStart={handleStart}
              onLogin={handleLogin}
            />
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-32 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide 
                ? 'w-8 bg-[var(--color-primary)]' 
                : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      {currentSlide > 0 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {currentSlide < slides.length - 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}