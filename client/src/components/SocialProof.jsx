import React from 'react';

const SocialProof = () => {
  return (
    <div className="w-full bg-[#111318] py-24 px-4 sm:px-10 relative overflow-hidden">
      {/* Decorative Map BG */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-no-repeat bg-center bg-contain" data-alt="Abstract world map outline pattern" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBIV14U279YYzhXOqmMD1u-v67b052yF1RUL6bFXGCIPGzrrOtU0s0PXGQzx-ZkjNwkONA7SsQ6LmW-6AJHlCi18QoNaiqyiHn1xtqrgMGcvfE6hQTu8lAVGJIXn4OKDd-H0T6oQfFs9sC39r1dokDFCsFbaLiIuk9CqYenFL12DMGL785j7J01Gh9_NNQLxMNRlWigKRPBCQHm823Dv-1Q4FwouYM_yHJ3RidP556IQy9VDapxhX_aXLPbkpn89bmAsM5pQeukUoal")'}}>
      </div>
      <div className="layout-content-container relative z-10 flex flex-col items-center max-w-[800px] mx-auto text-center gap-8">
        <h2 className="text-white text-3xl md:text-5xl font-black tracking-tight">Trusted by 10,000+ marketers.</h2>
        <p className="text-slate-400 text-lg max-w-[600px]">Join thousands of data-driven teams who rely on ShrinkIt Pro to manage their links and grow their business.</p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-primary hover:bg-blue-600 text-white text-base font-bold transition-all shadow-[0_0_20px_rgba(48,110,232,0.4)] hover:shadow-[0_0_30px_rgba(48,110,232,0.6)]">
            Start for free
          </button>
          <button className="flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-6 bg-transparent border border-slate-700 hover:bg-slate-800 text-white text-base font-bold transition-all">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;
