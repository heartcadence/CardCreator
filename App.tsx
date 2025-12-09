import React, { useState, useRef } from 'react';
import BusinessCard from './components/BusinessCard';
import { CardData } from './types';
import { generateTagline } from './services/geminiService';
import { 
  Wand2, 
  User, 
  Briefcase, 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  Sparkles,
  Printer,
  Image as ImageIcon,
  Upload
} from 'lucide-react';

const initialData: CardData = {
  fullName: 'Alex Morgan',
  jobTitle: 'Senior Developer',
  companyName: 'SiteEase',
  email: 'alex@siteease.ca',
  phone: '+1 (555) 123-4567',
  website: 'www.siteease.ca',
  tagline: 'Crafting digital experiences that matter.',
  address: 'Toronto, ON'
};

const App: React.FC = () => {
  const [data, setData] = useState<CardData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeSide, setActiveSide] = useState<'front' | 'back'>('front');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({ ...prev, logoUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateTagline = async () => {
    if (!data.jobTitle || !data.companyName) {
      alert("Please enter a Job Title and Company Name first.");
      return;
    }
    
    setIsGenerating(true);
    const newTagline = await generateTagline(data.jobTitle, data.companyName);
    setData(prev => ({ ...prev, tagline: newTagline }));
    setIsGenerating(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30">
      
      {/* Navbar */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-lg">S</span>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              SiteEase Card Creator
            </h1>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all text-sm font-medium border border-slate-700 hover:border-slate-600"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Controls */}
        <div className="lg:col-span-5 space-y-8 no-print">
          
          {/* Company & Logo Section */}
          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 shadow-xl backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
              <Building2 className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Branding</h2>
            </div>
            <div className="space-y-4">
               <div className="group">
                  <label className="block text-xs font-medium text-slate-400 mb-1 ml-1">Logo</label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-950 border border-slate-800 border-dashed hover:border-blue-500 hover:bg-slate-900 rounded-lg transition-all text-sm text-slate-400 hover:text-white"
                    >
                      <Upload className="w-4 h-4" />
                      {data.logoUrl ? 'Change Logo Image' : 'Upload Custom Logo'}
                    </button>
                    {data.logoUrl && (
                      <button 
                        onClick={() => setData(prev => ({...prev, logoUrl: undefined}))}
                        className="px-3 py-3 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-lg transition-all"
                        title="Remove custom logo"
                      >
                        ×
                      </button>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-2 ml-1">
                    Defaults to SiteEase branding if no image provided.
                  </p>
               </div>
               
               <div className="group">
                  <label className="block text-xs font-medium text-slate-400 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">Company Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-600" />
                    <input
                      type="text"
                      name="companyName"
                      value={data.companyName}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                      placeholder="e.g. SiteEase"
                    />
                  </div>
                </div>

                <div className="group">
                  <div className="flex justify-between items-end mb-1">
                    <label className="block text-xs font-medium text-slate-400 ml-1 group-focus-within:text-blue-400 transition-colors">Tagline</label>
                    <button 
                      onClick={handleGenerateTagline}
                      disabled={isGenerating}
                      className="text-xs flex items-center gap-1 text-blue-400 hover:text-blue-300 disabled:opacity-50 transition-colors"
                    >
                      {isGenerating ? <Sparkles className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                      {isGenerating ? 'Generating...' : 'Generate with AI'}
                    </button>
                  </div>
                  <input
                    type="text"
                    name="tagline"
                    value={data.tagline}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                    placeholder="A short catchy phrase..."
                  />
                </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
              <User className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Personal Information</h2>
            </div>
            
            <div className="space-y-4">
              <div className="group">
                <label className="block text-xs font-medium text-slate-400 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={data.fullName}
                  onChange={handleChange}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                  placeholder="e.g. Jane Doe"
                />
              </div>
              
              <div className="group">
                <label className="block text-xs font-medium text-slate-400 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">Job Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-3.5 w-4 h-4 text-slate-600" />
                  <input
                    type="text"
                    name="jobTitle"
                    value={data.jobTitle}
                    onChange={handleChange}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                    placeholder="e.g. Director"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800 shadow-xl backdrop-blur-sm">
             <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-4">
              <MapPin className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Contact Details</h2>
            </div>
             <div className="space-y-4">
               <div className="group">
                  <label className="block text-xs font-medium text-slate-400 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-600" />
                    <input
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                      placeholder="alex@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="group">
                    <label className="block text-xs font-medium text-slate-400 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 w-4 h-4 text-slate-600" />
                      <input
                        type="tel"
                        name="phone"
                        value={data.phone}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                        placeholder="+1 555 000 0000"
                      />
                    </div>
                  </div>
                   <div className="group">
                    <label className="block text-xs font-medium text-slate-400 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3.5 w-4 h-4 text-slate-600" />
                      <input
                        type="text"
                        name="website"
                        value={data.website}
                        onChange={handleChange}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                        placeholder="www.company.com"
                      />
                    </div>
                  </div>
                </div>
                 <div className="group">
                  <label className="block text-xs font-medium text-slate-400 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">Location / Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-slate-600" />
                    <input
                      type="text"
                      name="address"
                      value={data.address}
                      onChange={handleChange}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                      placeholder="City, Country"
                    />
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-7 flex flex-col items-center">
           <div className="sticky top-28 space-y-8 w-full flex flex-col items-center">
              
              <div className="flex items-center gap-4 bg-slate-900/80 p-1.5 rounded-lg border border-slate-800 no-print">
                <button
                  onClick={() => setActiveSide('front')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeSide === 'front' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white'}`}
                >
                  Front Side
                </button>
                <button
                  onClick={() => setActiveSide('back')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${activeSide === 'back' ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:text-white'}`}
                >
                  Back Side
                </button>
              </div>

              {/* The Rendered Card Area */}
              <div className="perspective-1000">
                 <div id="printable-area" className="flex flex-col items-center justify-center gap-8 print:h-screen print:w-screen print:bg-white print:fixed print:top-0 print:left-0 print:z-[1000]">
                    {/* Front Render (Always render both for print, but hide in preview based on state) */}
                    <div className={`${activeSide === 'front' ? 'block' : 'hidden'} print:block print:mb-4`}>
                      <BusinessCard data={data} side="front" />
                    </div>
                    
                     <div className={`${activeSide === 'back' ? 'block' : 'hidden'} print:block`}>
                      <BusinessCard data={data} side="back" />
                    </div>
                 </div>
              </div>

              <div className="text-center space-y-2 max-w-md no-print">
                 <p className="text-slate-500 text-sm">
                   Preview approximates the final 3.5" x 2" print output. 
                   <br/>
                   Use standard high-quality cardstock settings when printing.
                 </p>
              </div>

           </div>
        </div>

      </main>
    </div>
  );
};

export default App;