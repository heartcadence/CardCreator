import React from 'react';
import { CardData } from '../types';
import { Mail, Phone, Globe, MapPin, Layers } from 'lucide-react';

interface BusinessCardProps {
  data: CardData;
  side: 'front' | 'back';
}

const SiteEaseLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex flex-col items-center justify-center shadow-lg shadow-blue-500/20 relative overflow-hidden border border-white/10">
      <Layers className="text-white w-5 h-5 relative z-10" />
    </div>
    <div className="flex flex-col justify-center leading-none">
      <div className="flex items-baseline">
        <span className="text-2xl font-bold text-white tracking-tight">SiteEase</span>
        <span className="text-2xl font-bold text-blue-500 tracking-tight">.ca</span>
      </div>
    </div>
  </div>
);

const BusinessCard: React.FC<BusinessCardProps> = ({ data, side }) => {
  // Standard US Business Card Ratio: 3.5" x 2"
  const cardStyle = "w-[525px] h-[300px] relative overflow-hidden shadow-2xl rounded-xl transition-all duration-500 ease-in-out font-inter";
  
  // SiteEase Dark Theme Colors
  // Deep Slate background with a gradient
  const bgTheme = "bg-[#0B1121]"; 
  const textPrimary = "text-slate-100";

  // Refined Dot Matrix Pattern
  const GridPattern = () => (
    <>
      {/* Base Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#60a5fa 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      />
      {/* Diagonal Sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-0" />
    </>
  );

  const renderLogo = () => {
    if (data.logoUrl) {
      return <img src={data.logoUrl} alt="Logo" className="h-10 object-contain" />;
    }
    return <SiteEaseLogo />;
  };

  if (side === 'front') {
    return (
      <div className={`${cardStyle} ${bgTheme} flex flex-col justify-between p-8 border border-slate-700/50 relative group`}>
        <GridPattern />
        
        {/* Glow Effects */}
        <div className="absolute top-[-20%] right-[-10%] w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[250px] h-[250px] bg-indigo-600/10 rounded-full blur-[80px]" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between w-full">
          {renderLogo()}
        </div>

        {/* Main Content */}
        <div className="relative z-10 mt-auto">
          <h1 className="text-4xl font-bold text-white mb-1 tracking-tight drop-shadow-sm">
            {data.fullName || 'Your Name'}
          </h1>
          <div className="flex items-center gap-3">
             <div className="h-[2px] w-8 bg-blue-500 rounded-full"></div>
             <p className="text-sm font-bold text-blue-400 tracking-widest uppercase">
              {data.jobTitle || 'Job Title'}
            </p>
          </div>
          
          {data.tagline && (
             <p className="mt-6 text-sm text-slate-400 font-light italic border-l-2 border-slate-700 pl-3">
               {data.tagline}
             </p>
          )}
        </div>
      </div>
    );
  }

  // Back of Card
  return (
    <div className={`${cardStyle} ${bgTheme} flex flex-col p-8 border border-slate-700/50 relative`}>
       <GridPattern />
       
       {/* Ambient Glow */}
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div className="flex justify-between items-start opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
           <div className="scale-75 origin-top-left">
              {renderLogo()}
           </div>
        </div>

        {/* Contact Info Grid */}
        <div className="grid grid-cols-1 gap-4 w-full relative">
            
            {data.email && (
              <div className="flex items-center gap-4 group">
                <div className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 group-hover:bg-blue-900/20 transition-all duration-300 shrink-0 shadow-lg shadow-black/20">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Email</span>
                  <span className={`${textPrimary} text-sm font-medium tracking-wide`}>{data.email}</span>
                </div>
              </div>
            )}

            {data.phone && (
              <div className="flex items-center gap-4 group">
                 <div className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 group-hover:bg-blue-900/20 transition-all duration-300 shrink-0 shadow-lg shadow-black/20">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Phone</span>
                  <span className={`${textPrimary} text-sm font-medium tracking-wide`}>{data.phone}</span>
                </div>
              </div>
            )}

            <div className="flex gap-8">
              {data.website && (
                <div className="flex items-center gap-4 group">
                   <div className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 group-hover:bg-blue-900/20 transition-all duration-300 shrink-0 shadow-lg shadow-black/20">
                    <Globe className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Website</span>
                    <span className={`${textPrimary} text-sm font-medium tracking-wide`}>{data.website}</span>
                  </div>
                </div>
              )}
              
               {data.address && (
                <div className="flex items-center gap-4 group">
                   <div className="w-9 h-9 rounded-lg bg-slate-800/80 flex items-center justify-center border border-slate-700 group-hover:border-blue-500/50 group-hover:bg-blue-900/20 transition-all duration-300 shrink-0 shadow-lg shadow-black/20">
                    <MapPin className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Location</span>
                    <span className={`${textPrimary} text-sm font-medium tracking-wide`}>{data.address}</span>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
      
      {/* Decorative Corner */}
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-600/10 to-transparent rounded-tl-full pointer-events-none"></div>
    </div>
  );
};

export default BusinessCard;