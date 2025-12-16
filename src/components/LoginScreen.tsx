import { useState } from 'react';
import { Mail, Lock, ArrowLeft } from 'lucide-react';
import logoWeHave from 'figma:asset/3da59d2ca70d00b763c0f31c433b1074a1ef33a9.png';

interface LoginScreenProps {
  onBack: () => void;
  onCreateAccount: () => void;
  onForgotPassword: () => void;
  onLogin: (email: string, password: string) => void;
}

export function LoginScreen({ onBack, onCreateAccount, onForgotPassword, onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="relative min-h-screen max-w-md mx-auto overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1612885397564-40d0e2ad2981?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYWJzdHJhY3QlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2NTg3Mjc3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-[var(--color-text)]" />
        </button>

        {/* Logo and Title */}
        <div className="pt-20 pb-8 px-6">
          <img 
            src={logoWeHave} 
            alt="WeHave" 
            className="h-12 w-auto mx-auto mb-8"
          />
          <h1 className="text-center text-3xl mb-2">
            Bem-vindo de volta!
          </h1>
          <p className="text-center text-gray-500">
            Entre para continuar
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex-1 px-6 space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-[var(--color-primary)] active:opacity-70"
            >
              Esqueci a senha
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-white py-4 rounded-full active:scale-95 transition-transform mt-6"
          >
            Entrar
          </button>
        </form>

        {/* Create Account Link */}
        <div className="px-6 pb-8 pt-4">
          <div className="text-center">
            <span className="text-gray-600">Não tem uma conta? </span>
            <button
              onClick={onCreateAccount}
              className="text-[var(--color-primary)] active:opacity-70"
            >
              Criar conta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
