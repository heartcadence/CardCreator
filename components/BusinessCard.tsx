import React from 'react';
import { CardData } from '../types';
import { Mail, Phone, Globe, MapPin, Home } from 'lucide-react';

interface BusinessCardProps {
  data: CardData;
  side: 'front' | 'back';
}

const SiteEaseLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex flex-col items-center justify-center shadow-lg shadow-blue-900/50 relative overflow-hidden border border-blue-400/20">
      <Home className="text-white w-5 h-5 relative z-10" strokeWidth={2.5} />
      {/* Decorative lines inside the house icon to match the reference */}
      <div className="absolute top-[22px] w-2.5 h-0.5 bg-white/90 z-10 rounded-full"></div>
      <div className="absolute top-[26px] w-2.5 h-0.5 bg-white/90 z-10 rounded-full"></div>
    </div>
    <div className="flex items-baseline leading-none">
      <span className="text-2xl font-bold text-white tracking-tight">SiteEase</span>
      <span className="text-2xl font-bold text-blue-500 tracking-tight">.ca</span>
    </div>
  </div>
);

const BusinessCard: React.FC<BusinessCardProps> = ({ data, side }) => {
  // Standard US Business Card Ratio: 3.5" x 2"
  // Using a higher resolution base for print quality (1050px x 600px is 300dpi for 3.5x2)
  // But keeping the CSS unit consistent with the previous logic for screen display, scaling via print CSS.
  const cardStyle = "w-[525px] h-[300px] relative overflow-hidden shadow-2xl rounded-xl transition-all duration-500 ease-in-out font-inter";
  
  // Theme Colors inspired by SiteEase (Dark, Purples, Blues, Gradients)
  const bgGradient = "bg-[#0B1121]";
  const textPrimary = "text-slate-100";

  // Dot matrix background pattern
  const GridPattern = () => (
    <div 
      className="absolute inset-0 z-0 opacity-20 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)',
        backgroundSize: '24px 24px'
      }}
    />
  );

  // Helper to render user logo or default SiteEase logo
  const renderLogo = () => {
    if (data.logoUrl) {
      return <img src={data.logoUrl} alt="Logo" className="h-12 object-contain" />;
    }
    return <SiteEaseLogo />;
  };

  if (side === 'front') {
    return (
      <div className={`${cardStyle} ${bgGradient} flex flex-col justify-between p-8 border border-white/5 group`}>
        <GridPattern />
        
        {/* Abstract Glows */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-20px] left-[-20px] w-64 h-64 bg-purple-600/10 rounded-full blur-[80px]" />

        {/* Header / Logo Area */}
        <div className="relative z-10 flex items-center justify-between w-full">
          {renderLogo()}
        </div>

        {/* Main Content */}
        <div className="relative z-10 mt-auto mb-2">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-slate-400 mb-2 tracking-tight">
            {data.fullName || 'Your Name'}
          </h1>
          <p className={`text-sm font-bold text-blue-400 tracking-widest uppercase flex items-center gap-3`}>
             <span className="w-6 h-[2px] bg-blue-500 rounded-full"></span>
            {data.jobTitle || 'Job Title'}
          </p>
          {data.tagline && (
             <p className="mt-5 text-sm text-slate-400/90 font-light italic tracking-wide">
               "{data.tagline}"
             </p>
          )}
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600"></div>
      </div>
    );
  }

  // Back of Card
  return (
    <div className={`${cardStyle} ${bgGradient} flex flex-col p-8 border border-white/5 relative`}>
       <GridPattern />
       
       {/* Center Glow */}
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(30,58,138,0.15)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div className="flex justify-between items-start opacity-40">
           <div className="scale-75 origin-top-left">
              {renderLogo()}
           </div>
        </div>

        {/* Bottom Area: Contact Info */}
        <div className="flex flex-row items-end justify-between w-full">
          
          {/* Contact Info Grid */}
          <div className="flex flex-col gap-3.5 w-full">
            
            {data.email && (
              <div className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700/50 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className={`${textPrimary} text-sm font-medium tracking-wide`}>{data.email}</span>
                </div>
              </div>
            )}

            {data.phone && (
              <div className="flex items-center gap-4 group">
                 <div className="w-8 h-8 rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700/50 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className={`${textPrimary} text-sm font-medium tracking-wide`}>{data.phone}</span>
                </div>
              </div>
            )}

            {data.website && (
              <div className="flex items-center gap-4 group">
                 <div className="w-8 h-8 rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700/50 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className={`${textPrimary} text-sm font-medium tracking-wide`}>{data.website}</span>
                </div>
              </div>
            )}
            
             {data.address && (
              <div className="flex items-center gap-4 group">
                 <div className="w-8 h-8 rounded-md bg-slate-800/50 flex items-center justify-center border border-slate-700/50 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className={`${textPrimary} text-sm font-medium tracking-wide`}>{data.address}</span>
                </div>
              </div>
            )}

          </div>
        </div>
        
        {/* Back decorative element */}
        <div className="absolute bottom-6 right-6 opacity-20">
          <img src={data.logoUrl || ''} className="w-24 h-24 object-contain grayscale" onError={(e) => e.currentTarget.style.display = 'none'} alt="" />
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;