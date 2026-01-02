import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background-light dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-10">
      <div className="layout-content-container max-w-[1280px] mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex flex-col gap-4 max-w-[300px]">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white">
            <span className="material-symbols-outlined text-primary text-[24px]">link</span>
            <h3 className="text-lg font-bold">ShrinkIt Pro</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            The most powerful URL shortener for modern businesses. Track, manage, and optimize your links with ease.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 sm:gap-20">
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Product</h4>
            <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Features</a>
            <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Integrations</a>
            <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Pricing</a>
            <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">API</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Company</h4>
            <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">About Us</a>
            <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Careers</a>
            <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Blog</a>
            <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Contact</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Legal</h4>
            <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Privacy Policy</a>
            <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition-colors" href="#">Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="layout-content-container max-w-[1280px] mx-auto mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-center md:text-left text-sm text-slate-500">
        © 2023 ShrinkIt Pro. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
