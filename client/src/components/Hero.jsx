import React from 'react';

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center px-4 pt-16 pb-20 sm:px-10 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50 dark:opacity-30"></div>
      <div className="layout-content-container flex flex-col items-center max-w-[960px] w-full z-10 gap-8">
        <div className="flex flex-col gap-4 text-center items-center">
          <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-white/5 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span> New v2.0 Released
          </span>
          <h1 className="text-slate-900 dark:text-white text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] tracking-tight max-w-[800px]">
            Shorten links. <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Expand your reach.</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg font-normal leading-relaxed max-w-[600px]">
            ShrinkIt Pro gives you the power to track clicks, analyze audience location, and optimize your marketing strategy with precision.
          </p>
        </div>
        {/* Input Component */}
        <div className="w-full max-w-[640px] mt-4 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-400 to-primary rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex w-full items-center p-2 rounded-xl bg-white dark:bg-[#1c1f26] border border-slate-200 dark:border-slate-700 shadow-2xl shadow-black/5 dark:shadow-black/20">
            <div className="pl-4 pr-3 text-slate-400 dark:text-slate-500">
              <span className="material-symbols-outlined">link</span>
            </div>
            <input className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base h-12 focus:ring-0" placeholder="Paste your long URL here to shrink it..." type="text" />
            <button className="hidden sm:flex h-11 items-center justify-center rounded-lg bg-primary hover:bg-blue-600 text-white px-6 font-bold text-sm transition-all transform active:scale-95 shadow-lg shadow-primary/20">
              Shrink It
            </button>
          </div>
          <button className="sm:hidden w-full mt-3 h-11 flex items-center justify-center rounded-lg bg-primary hover:bg-blue-600 text-white px-6 font-bold text-sm transition-all shadow-lg shadow-primary/20">
            Shrink It
          </button>
        </div>
        <div className="flex items-center gap-8 pt-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
          <div className="text-sm font-semibold text-slate-500 dark:text-slate-400">Trusted by modern teams at</div>
          {/* Mock Logos */}
          <div className="flex gap-4">
            <div className="h-6 w-20 bg-slate-300 dark:bg-slate-700 rounded animate-pulse" data-alt="Company Logo Placeholder"></div>
            <div className="h-6 w-20 bg-slate-300 dark:bg-slate-700 rounded animate-pulse" data-alt="Company Logo Placeholder"></div>
            <div className="h-6 w-20 bg-slate-300 dark:bg-slate-700 rounded animate-pulse" data-alt="Company Logo Placeholder"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
