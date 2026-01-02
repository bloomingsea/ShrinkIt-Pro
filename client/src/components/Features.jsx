import React from 'react';

const Features = () => {
  return (
    <div className="w-full py-20 px-4 sm:px-10 bg-background-light dark:bg-background-dark">
      <div className="layout-content-container flex flex-col max-w-[1280px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Why Choose ShrinkIt Pro?</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Everything you need to manage your links and understand your audience, built for performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group flex flex-col gap-4 p-6 rounded-xl border border-slate-200 dark:border-[#2e3545] bg-white dark:bg-[#1c1f26] hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary mb-2 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px]">monitoring</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Real-time Analytics</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Track clicks as they happen with our instant data pipeline. Know exactly when your campaign takes off.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div className="group flex flex-col gap-4 p-6 rounded-xl border border-slate-200 dark:border-[#2e3545] bg-white dark:bg-[#1c1f26] hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500 mb-2 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px]">folder_open</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Link Management</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Organize your links with tags, folders, and campaign groups. Keep your marketing efforts structured.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div className="group flex flex-col gap-4 p-6 rounded-xl border border-slate-200 dark:border-[#2e3545] bg-white dark:bg-[#1c1f26] hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500 mb-2 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px]">language</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Custom Domains</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Brand your links with your own domain name for better trust and higher click-through rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
