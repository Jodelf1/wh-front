interface OnboardingSlideProps {
  imageUrl: string;
  title: string;
  description: string;
  isLast?: boolean;
  onStart?: () => void;
  onLogin?: () => void;
}

export function OnboardingSlide({ 
  imageUrl, 
  title, 
  description, 
  isLast = false,
  onStart,
  onLogin
}: OnboardingSlideProps) {
  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={imageUrl} 
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-end px-6 pb-12">
        <div className="mb-8">
          <h1 className="text-white text-3xl mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-white/90 text-lg leading-relaxed">
            {description}
          </p>
        </div>

        {isLast && (
          <div className="space-y-3">
            <button
              onClick={onStart}
              className="w-full bg-[var(--color-primary)] text-white py-4 rounded-full transition-transform active:scale-95"
            >
              Começar
            </button>
            <button
              onClick={onLogin}
              className="w-full bg-white/10 backdrop-blur-sm text-white py-4 rounded-full border-2 border-white/30 transition-transform active:scale-95"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}