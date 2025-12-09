import React from 'react';
import { CardData } from '../types';
import { Mail, Phone, Globe, MapPin, Layers, Hexagon } from 'lucide-react';

interface BusinessCardProps {
  data: CardData;
  side: 'front' | 'back';
}

const SiteEaseLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="w-10 h-10 relative">
        <div className="absolute inset-0 bg-blue-600 rounded-lg rotate-3 opacity-50"></div>
        <div className="absolute inset-0 bg-indigo-600 rounded-lg -rotate-3 opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-lg border border-white/20 z-10">
            <Hexagon className="text-white w-6 h-6" strokeWidth={2.5} />
        </div>
    </div>
    <div className="flex flex-col justify-center leading-none">
      <span className="text-2xl font-bold text-white tracking-tight">SiteEase</span>
      <span className="text-[0.65rem] font-semibold text-blue-400 uppercase tracking-[0.2em]">Digital Solutions</span>
    </div>
  </div>
);

const BusinessCard: React.FC<BusinessCardProps> = ({ data, side }) => {
  // Standard US Business Card Ratio (3.5" x 2")
  // Using 525x300px for high-quality display scale
  const cardStyle = "w-[525px] h-[300px] relative overflow-hidden shadow-2xl rounded-xl transition-all duration-500 ease-in-out font-inter bg-[#0B1120]";

  const renderLogo = () => {
    if (data.logoUrl) {
      return <img src={data.logoUrl} alt="Logo" className="h-12 object-contain" />;
    }
    return <SiteEaseLogo />;
  };

  const BgPattern = () => (
      <>
         {/* Subtle Noise Texture */}
         <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ filter: 'contrast(120%) brightness(100%)', backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}></div>
         
         {/* Radial Gradients */}
         <div className="absolute top-[-50%] right-[-20%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
         <div className="absolute bottom-[-30%] left-[-10%] w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />
      </>
  )

  if (side === 'front') {
    return (
      <div className={`${cardStyle} flex flex-col p-10 justify-between border border-slate-800`}>
        <BgPattern />
        
        {/* Geometric Accent */}
        <div className="absolute top-0 right-12 w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500" />

        {/* Header / Logo */}
        <div className="relative z-10 w-full flex justify-between items-start">
            {renderLogo()}
        </div>

        {/* Main Content */}
        <div className="relative z-10 mt-auto">
          <h1 className="text-3xl font-bold text-white tracking-tight mb-1">
            {data.fullName || 'Your Name'}
          </h1>
          <p className="text-base font-medium text-blue-400 mb-6 flex items-center gap-2">
            {data.jobTitle || 'Job Title'}
          </p>

          <div className="w-full h-px bg-gradient-to-r from-slate-700 to-transparent mb-6"></div>

          {data.tagline && (
             <p className="text-sm text-slate-400 font-light italic leading-relaxed max-w-[80%]">
               "{data.tagline}"
             </p>
          )}
        </div>
      </div>
    );
  }

  // Back of Card
  return (
    <div className={`${cardStyle} flex flex-col p-10 border border-slate-800 relative`}>
      <BgPattern />
      
       {/* Decorative Side Bar */}
       <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-600 to-indigo-600"></div>

      <div className="relative z-10 flex flex-col justify-center h-full pl-6 gap-5">
        
        {data.email && (
          <div className="flex items-center gap-4 group">
            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-blue-400">
              <Mail className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Email</span>
              <span className="text-slate-200 text-sm font-medium">{data.email}</span>
            </div>
          </div>
        )}

        {data.phone && (
          <div className="flex items-center gap-4 group">
             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-blue-400">
              <Phone className="w-4 h-4" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Phone</span>
              <span className="text-slate-200 text-sm font-medium">{data.phone}</span>
            </div>
          </div>
        )}

        {data.website && (
            <div className="flex items-center gap-4 group">
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-blue-400">
                <Globe className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Website</span>
                <span className="text-slate-200 text-sm font-medium">{data.website}</span>
              </div>
            </div>
        )}
        
        {data.address && (
            <div className="flex items-center gap-4 group">
               <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-blue-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Location</span>
                <span className="text-slate-200 text-sm font-medium">{data.address}</span>
              </div>
            </div>
        )}

      </div>
        
      {/* Small Logo Watermark */}
      <div className="absolute bottom-6 right-6 opacity-20 grayscale">
          {data.logoUrl ? (
              <img src={data.logoUrl} className="h-8 object-contain" alt="watermark" />
          ) : (
            <div className="flex items-center gap-2">
                 <Hexagon className="w-6 h-6" />
                 <span className="font-bold text-lg">SiteEase</span>
            </div>
          )}
      </div>

    </div>
  );
};

export default BusinessCard;