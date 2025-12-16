import { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, DollarSign } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
}

interface Provider {
  id: number;
  name: string;
  service: string;
  rating: number;
  distance: string;
  price: string;
  avatar: string;
}

interface ServiceRequestProps {
  provider: Provider;
  selectedService?: Service;
  onBack: () => void;
  onConfirm: (requestData: any) => void;
}

export function ServiceRequest({ 
  provider, 
  selectedService,
  onBack, 
  onConfirm 
}: ServiceRequestProps) {
  const [address, setAddress] = useState('Rua Example, 123 - Lisboa');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  // Set default date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDate = tomorrow.toISOString().split('T')[0];

  const handleConfirm = () => {
    const requestData = {
      id: Date.now(),
      provider,
      service: selectedService?.name || provider.service,
      address,
      date: date || defaultDate,
      time: time || '10:00',
      price: selectedService?.price || provider.price,
      duration: selectedService?.duration || '1h',
      notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    onConfirm(requestData);
  };

  const serviceName = selectedService?.name || provider.service;
  const servicePrice = selectedService?.price || provider.price;
  const serviceDuration = selectedService?.duration || '1h';

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
          <h1 className="text-xl">Solicitar Serviço</h1>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-6 pb-28 overflow-y-auto h-[calc(100vh-140px)]">
        {/* Provider Info Card */}
        <div className="bg-white rounded-3xl shadow-sm p-4 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-16 h-16 rounded-2xl object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{provider.name}</h3>
              <p className="text-sm text-gray-600">{provider.service}</p>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
          <h3 className="font-semibold mb-4">Resumo do Serviço</h3>
          
          {/* Service */}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-[var(--color-primary)]" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-1">Serviço</p>
              <p className="font-semibold">{serviceName}</p>
              <p className="text-sm text-gray-600 mt-1">Duração: {serviceDuration}</p>
            </div>
            <p className="text-lg text-[var(--color-primary)]">{servicePrice}</p>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">Endereço</p>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                placeholder="Digite seu endereço"
              />
            </div>
          </div>

          {/* Date */}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">Data</p>
              <input
                type="date"
                value={date || defaultDate}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-500 mb-2">Hora</p>
              <input
                type="time"
                value={time || '10:00'}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <p className="text-sm text-gray-500 mb-2">Observações (opcional)</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione informações adicionais sobre o serviço..."
              className="w-full px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
              rows={4}
            />
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-3xl shadow-sm p-5 mb-4">
          <h3 className="font-semibold mb-4">Resumo de Pagamento</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Serviço</span>
              <span>{servicePrice}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Taxa de serviço</span>
              <span>€0</span>
            </div>
            <div className="h-px bg-gray-200 my-2"></div>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-[var(--color-primary)]">{servicePrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-lg">
        <button
          onClick={handleConfirm}
          className="w-full bg-[var(--color-primary)] text-white py-4 rounded-full font-semibold active:scale-98 transition-transform shadow-lg hover:shadow-xl"
        >
          Confirmar Solicitação
        </button>
      </div>
    </div>
  );
}
