import { useState } from 'react';
import { ArrowLeft, Send, Paperclip, MoreVertical } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  time: string;
  isProvider: boolean;
}

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

interface ProviderChatScreenProps {
  chat: Chat;
  onBack: () => void;
  onClientProfileClick: (client: { name: string; avatar: string }) => void;
}

const mockMessages: Message[] = [
  {
    id: 1,
    text: 'Olá! Preciso de uma instalação elétrica na sala.',
    time: '09:30',
    isProvider: false,
  },
  {
    id: 2,
    text: 'Bom dia! Claro, posso ajudar. Quantas tomadas precisa instalar?',
    time: '09:32',
    isProvider: true,
  },
  {
    id: 3,
    text: 'Preciso de 3 tomadas na parede principal.',
    time: '09:33',
    isProvider: false,
  },
  {
    id: 4,
    text: 'Perfeito! Posso ir hoje às 14h. O valor será de €45.',
    time: '09:35',
    isProvider: true,
  },
  {
    id: 5,
    text: 'Ótimo! Confirmo para as 14h então.',
    time: '09:37',
    isProvider: false,
  },
  {
    id: 6,
    text: 'Confirmado! Até logo.',
    time: '09:38',
    isProvider: true,
  },
  {
    id: 7,
    text: 'Estou a caminho!',
    time: '10:28',
    isProvider: true,
  },
  {
    id: 8,
    text: 'Obrigada! Já chegou?',
    time: '10:30',
    isProvider: false,
  },
];

export function ProviderChatScreen({ chat, onBack, onClientProfileClick }: ProviderChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputText,
        time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
        isProvider: true,
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={() => onClientProfileClick(chat.client)}
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={chat.client.avatar}
                  alt={chat.client.name}
                  className="w-11 h-11 rounded-xl object-cover"
                />
                {chat.isActive && (
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <h2 className="font-semibold truncate">{chat.client.name}</h2>
                <p className="text-xs text-gray-600 truncate">{chat.service}</p>
              </div>
            </button>
          </div>
          <button className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center flex-shrink-0">
            <MoreVertical className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Active Chat Badge */}
        {chat.isActive && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-semibold text-green-700">Chat Ativo - Serviço em andamento</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="overflow-y-auto h-[calc(100vh-200px)] px-4 py-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isProvider ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[75%]`}>
                <div
                  className={`rounded-3xl px-4 py-3 ${
                    message.isProvider
                      ? 'bg-gray-200 text-gray-800 rounded-br-md'
                      : 'bg-[var(--color-primary)] text-white rounded-bl-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed break-words">{message.text}</p>
                </div>
                <p
                  className={`text-xs text-gray-500 mt-1 px-2 ${
                    message.isProvider ? 'text-right' : 'text-left'
                  }`}
                >
                  {message.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-4">
        <div className="flex items-end gap-2">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 active:scale-95 transition-transform">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          
          <div className="flex-1 bg-gray-100 rounded-3xl px-4 py-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escreva uma mensagem..."
              className="w-full bg-transparent resize-none outline-none text-sm max-h-24"
              rows={1}
              style={{
                minHeight: '24px',
                height: 'auto',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 active:scale-95 transition-all ${
              inputText.trim()
                ? 'bg-[var(--color-primary)] text-white'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
