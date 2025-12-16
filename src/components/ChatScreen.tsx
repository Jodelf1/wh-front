import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Paperclip, Phone, MoreVertical } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'provider';
  timestamp: string;
}

interface ChatScreenProps {
  provider?: {
    id: number;
    name: string;
    avatar: string;
    service?: string;
  };
  onBack: () => void;
}

export function ChatScreen({ provider, onBack }: ChatScreenProps) {
  // Use mock provider if none provided
  const chatProvider = provider || {
    id: 1,
    name: "Prestador",
    avatar: "https://i.pravatar.cc/150?img=12",
    service: "Serviço",
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Olá! Recebi sua solicitação de serviço.',
      sender: 'provider',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: 2,
      text: 'Olá! Ótimo, quando você pode começar?',
      sender: 'user',
      timestamp: new Date(Date.now() - 3500000).toISOString(),
    },
    {
      id: 3,
      text: 'Posso ir amanhã no horário combinado. Vou levar todas as ferramentas necessárias.',
      sender: 'provider',
      timestamp: new Date(Date.now() - 3400000).toISOString(),
    },
  ]);
  
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate provider response
    setTimeout(() => {
      const response: Message = {
        id: messages.length + 2,
        text: 'Obrigado pela mensagem! Vou responder em breve.',
        sender: 'provider',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoje';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ontem';
    } else {
      return date.toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
    }
  };

  return (
    <div className="relative h-screen max-w-md mx-auto bg-[var(--color-background)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <img
            src={chatProvider.avatar}
            alt={chatProvider.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="font-semibold">{chatProvider.name}</h2>
            {chatProvider.service && (
              <p className="text-xs text-gray-500">{chatProvider.service}</p>
            )}
          </div>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform">
            <Phone className="w-5 h-5 text-gray-700" />
          </button>
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform">
            <MoreVertical className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Date Header */}
        <div className="flex justify-center mb-4">
          <div className="bg-gray-200 rounded-full px-3 py-1">
            <span className="text-xs text-gray-600">{formatDate(messages[0].timestamp)}</span>
          </div>
        </div>

        {/* Message List */}
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-3xl px-4 py-3 ${
                  message.sender === 'user'
                    ? 'bg-[var(--color-primary)] text-white rounded-br-lg'
                    : 'bg-white text-gray-800 rounded-bl-lg'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 flex-shrink-0">
        <div className="flex items-end gap-2">
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform flex-shrink-0">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1 bg-gray-100 rounded-3xl px-4 py-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Digite sua mensagem..."
              className="w-full bg-transparent resize-none outline-none text-sm max-h-24"
              rows={1}
              style={{
                minHeight: '24px',
                height: 'auto',
              }}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!inputText.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-95 transition-all flex-shrink-0 ${
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