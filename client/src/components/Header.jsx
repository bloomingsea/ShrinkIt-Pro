import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
      <div className="layout-container flex justify-center w-full">
        <div className="flex w-full max-w-[1280px] items-center justify-between px-4 sm:px-10 py-4">
          <div className="flex items-center gap-3 text-slate-900 dark:text-white">
            <div className="flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[28px]">link</span>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-tight">ShrinkIt Pro</h2>
          </div>
          <div className="hidden md:flex flex-1 justify-end items-center gap-8">
            <nav className="flex items-center gap-6">
              <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="#">Features</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="#">Pricing</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="#">Analytics</a>
              <a className="text-sm font-medium text-slate-600 hover:text-primary dark:text-slate-300 dark:hover:text-white transition-colors" href="#">Resources</a>
            </nav>
            <div className="flex gap-3">
              <Link to="/dashboard" className="flex items-center justify-center rounded-lg h-9 px-4 bg-transparent border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-sm font-semibold transition-colors">
                Login
              </Link>
              <button className="flex items-center justify-center rounded-lg h-9 px-4 bg-primary hover:bg-blue-600 text-white text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(48,110,232,0.3)]">
                Get Started
              </button>
            </div>
          </div>
          {/* Mobile Menu Icon */}
          <button className="md:hidden p-2 text-slate-600 dark:text-slate-300">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
