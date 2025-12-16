import { useState } from 'react';
import { User, Mail, Lock, Phone, ArrowLeft } from 'lucide-react';
import logoWeHave from 'figma:asset/3da59d2ca70d00b763c0f31c433b1074a1ef33a9.png';

interface RegisterScreenProps {
  accountType: 'client' | 'provider';
  onBack: () => void;
  onLogin: () => void;
  onRegister: (data: {
    name: string;
    email: string;
    phone: string;
    password: string;
  }) => void;
}

export function RegisterScreen({ accountType, onBack, onLogin, onRegister }: RegisterScreenProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    onRegister({ name, email, phone, password });
  };

  return (
    <div className="relative min-h-screen max-w-md mx-auto overflow-hidden bg-[var(--color-background)]">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1612885397564-40d0e2ad2981?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYWJzdHJhY3QlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc2NTg3Mjc3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/92 to-white/95" />
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
        <div className="pt-20 pb-6 px-6">
          <img 
            src={logoWeHave} 
            alt="WeHave" 
            className="h-12 w-auto mx-auto mb-6"
          />
          <h1 className="text-center text-3xl mb-2">
            Cadastro
          </h1>
          <p className="text-center text-gray-500">
            {accountType === 'client' ? 'Cadastre-se como Cliente' : 'Cadastre-se como Prestador'}
          </p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="flex-1 px-6 space-y-4 pb-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm">
              Nome
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

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

          {/* Phone Input */}
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm">
              Número de telefone
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+351 912 345 678"
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

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm">
              Confirmação de senha
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-gray-200 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-[var(--color-alert)]/10 border border-[var(--color-alert)] text-[var(--color-alert)] px-4 py-3 rounded-2xl text-sm">
              {error}
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-[var(--color-primary)] text-white py-4 rounded-full active:scale-95 transition-transform mt-6"
          >
            Criar conta
          </button>
        </form>

        {/* Login Link */}
        <div className="px-6 pb-8 pt-4">
          <div className="text-center">
            <span className="text-gray-600">Já tem uma conta? </span>
            <button
              onClick={onLogin}
              className="text-[var(--color-primary)] active:opacity-70"
            >
              Fazer Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
