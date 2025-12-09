import React from 'react';
import { CardData } from '../types';
import { Mail, Phone, Globe, MapPin, Hexagon, Home } from 'lucide-react';

interface BusinessCardProps {
  data: CardData;
  side: 'front' | 'back';
}

const SiteEaseLogo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="w-10 h-10 bg-blue-600 rounded-lg flex flex-col items-center justify-center shadow-lg shadow-blue-900/50 relative overflow-hidden">
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
  // Multiplied by scale factor for crisp rendering
  const cardStyle = "w-[525px] h-[300px] relative overflow-hidden shadow-2xl rounded-xl transition-all duration-500 ease-in-out";
  
  // Theme Colors inspired by SiteEase (Dark, Purples, Blues, Gradients)
  const bgGradient = "bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#1e1b4b]";
  const textPrimary = "text-slate-100";

  // Helper to render user logo or default SiteEase logo
  const renderLogo = () => {
    if (data.logoUrl) {
      return <img src={data.logoUrl} alt="Logo" className="h-12 object-contain" />;
    }
    return <SiteEaseLogo />;
  };

  if (side === 'front') {
    return (
      <div className={`${cardStyle} ${bgGradient} flex flex-col justify-between p-8 border border-white/10 group`}>
        {/* Fused Background Watermark */}
        <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.03] transform -rotate-12 pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-500">
           {data.logoUrl ? (
             <img src={data.logoUrl} className="w-64 h-64 grayscale contrast-200" alt="" />
           ) : (
             <Home className="w-80 h-80 text-white" strokeWidth={0.5} />
           )}
        </div>

        {/* Abstract Background Shapes */}
        <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-20px] left-[-20px] w-48 h-48 bg-purple-600/20 rounded-full blur-[60px]" />

        {/* Header / Logo Area */}
        <div className="relative z-10 flex items-center justify-between w-full">
          {renderLogo()}
        </div>

        {/* Main Content */}
        <div className="relative z-10 mt-auto mb-2">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400 mb-2 tracking-tight">
            {data.fullName || 'Your Name'}
          </h1>
          <p className={`text-lg font-semibold text-blue-400 tracking-wide uppercase text-xs flex items-center gap-2`}>
             <span className="w-8 h-[2px] bg-blue-500 inline-block"></span>
            {data.jobTitle || 'Job Title'}
          </p>
          {data.tagline && (
             <p className="mt-4 text-sm text-slate-400 font-light italic opacity-90">
               "{data.tagline}"
             </p>
          )}
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-600"></div>
      </div>
    );
  }

  // Back of Card
  return (
    <div className={`${cardStyle} ${bgGradient} flex flex-col p-8 border border-white/10 relative`}>
       {/* Abstract Background Shapes */}
       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900/50 to-transparent" />
       
       {/* Fused Background Watermark (Center) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
           {data.logoUrl ? (
             <img src={data.logoUrl} className="w-96 h-96 grayscale" alt="" />
           ) : (
             <Home className="w-96 h-96 text-white" strokeWidth={0.5} />
           )}
        </div>

      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
           {/* Placeholder for visual balance */}
           <div className="text-xs text-slate-500 font-medium tracking-widest uppercase opacity-0">Contact</div> 
           <div className="opacity-50 scale-75 origin-top-right">
              {renderLogo()}
           </div>
        </div>

        {/* Bottom Area: Contact Info */}
        <div className="flex flex-row items-end justify-between w-full">
          
          {/* Contact Info Grid */}
          <div className="flex flex-col gap-4 w-full">
            
            {data.email && (
              <div className="flex items-center gap-3 group">
                <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center border border-white/5 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold leading-none mb-0.5">Email</span>
                  <span className={`${textPrimary} font-medium tracking-wide text-xs`}>{data.email}</span>
                </div>
              </div>
            )}

            {data.phone && (
              <div className="flex items-center gap-3 group">
                 <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center border border-white/5 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold leading-none mb-0.5">Phone</span>
                  <span className={`${textPrimary} font-medium tracking-wide text-xs`}>{data.phone}</span>
                </div>
              </div>
            )}

            {data.website && (
              <div className="flex items-center gap-3 group">
                 <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center border border-white/5 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                  <Globe className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold leading-none mb-0.5">Website</span>
                  <span className={`${textPrimary} font-medium tracking-wide text-xs`}>{data.website}</span>
                </div>
              </div>
            )}
            
             {data.address && (
              <div className="flex items-center gap-3 group">
                 <div className="w-8 h-8 rounded-lg bg-slate-800/80 flex items-center justify-center border border-white/5 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300 shrink-0">
                  <MapPin className="w-4 h-4 text-blue-400" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold leading-none mb-0.5">Office</span>
                  <span className={`${textPrimary} font-medium tracking-wide text-xs`}>{data.address}</span>
                </div>
              </div>
            )}

          </div>
        </div>
        
        {/* Back decorative line */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1 bg-gradient-to-l from-blue-600 to-transparent"></div>
      </div>
    </div>
  );
};

export default BusinessCard;