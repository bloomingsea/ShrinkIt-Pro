import React from 'react';

const DashboardPreview = () => {
  return (
    <div className="w-full bg-slate-50 dark:bg-[#161a23] py-20 px-4 sm:px-10 border-y border-slate-200 dark:border-slate-800">
      <div className="layout-content-container flex flex-col max-w-[1280px] mx-auto gap-12">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">Visualize Your Success with Glassmorphism Dashboards</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Our intuitive dashboard provides deep insights into geographic data, device targeting, and click heatmaps. Understand your audience at a glance without the complexity.
            </p>
            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Real-time Clicks</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">See who is clicking your links as it happens.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-1 rounded-md bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[20px]">check</span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">Device Breakdown</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Optimize for mobile, desktop, or tablet users.</p>
                </div>
              </div>
            </div>
            <button className="w-fit mt-4 text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all">
              View Live Demo <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          {/* Dashboard Image/Card */}
          <div className="flex-1 w-full">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Analytics dashboard charts displaying data visualization" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuADFFqYdL5Cazy4aQrp_0iHe4WtA9DRyiJwpYEkLTDGPVUhu1JQ6m8ZYfzdT7z1kQ4UItd3BXIxznU_0DXYxoHXj6dbNgTaW5uClYSgVq4HUHtimQu-JzKr9a-nqOBqeis2HGZOEHSfe8SFK_FybCeJXxgC7S0r3v4OFUvJBn-yEKAmmhPRUELGJ8T9Xusj0djtnuHkjWyrkX32CyuCJyheuUG1V_CThb6xtUjNoDXAs2HVPc5I0sB1fmDVhnMX_eRssUJNTW9WrI8a")'}}>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              {/* Floating Glass Card */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel p-4 rounded-lg border border-white/10 backdrop-blur-md">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium text-sm">Active Users</span>
                  <span className="text-green-400 text-xs font-bold flex items-center">+12.5% <span className="material-symbols-outlined text-[14px]">trending_up</span></span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 mb-1">
                  <div className="bg-primary h-1.5 rounded-full" style={{width: '70%'}}></div>
                </div>
                <div className="flex justify-between text-[10px] text-white/60">
                  <span>00:00</span>
                  <span>12:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;
