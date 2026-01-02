import React from 'react';

const Pricing = () => {
  return (
    <div className="w-full py-20 px-4 sm:px-10 bg-slate-50 dark:bg-[#0b0e14]">
      <div className="layout-content-container flex flex-col max-w-[1280px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Simple, transparent pricing</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-[1000px] mx-auto">
          {/* Free Tier */}
          <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-[#161a23] border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Starter</h3>
            <div className="mt-2 mb-6">
              <span className="text-4xl font-black text-slate-900 dark:text-white">$0</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> 50 Links / month</li>
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Basic Analytics</li>
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Standard Support</li>
            </ul>
            <button className="w-full py-2 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Get Started</button>
          </div>
          {/* Pro Tier */}
          <div className="relative flex flex-col p-6 rounded-2xl bg-white dark:bg-[#161a23] border-2 border-primary shadow-xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Pro</h3>
            <div className="mt-2 mb-6">
              <span className="text-4xl font-black text-slate-900 dark:text-white">$19</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Unlimited Links</li>
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Custom Domains</li>
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Advanced Analytics</li>
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> API Access</li>
            </ul>
            <button className="w-full py-2 rounded-lg bg-primary font-semibold text-white hover:bg-blue-600 transition-colors">Start Free Trial</button>
          </div>
          {/* Enterprise Tier */}
          <div className="flex flex-col p-6 rounded-2xl bg-white dark:bg-[#161a23] border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Business</h3>
            <div className="mt-2 mb-6">
              <span className="text-4xl font-black text-slate-900 dark:text-white">$49</span>
              <span className="text-slate-500">/mo</span>
            </div>
            <ul className="flex flex-col gap-3 mb-8 flex-1">
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Everything in Pro</li>
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Team Management</li>
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> SSO & Security</li>
              <li className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300"><span className="material-symbols-outlined text-green-500 text-lg">check_circle</span> Dedicated Manager</li>
            </ul>
            <button className="w-full py-2 rounded-lg border border-slate-300 dark:border-slate-700 font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">Contact Sales</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
