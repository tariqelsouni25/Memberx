'use client';

import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center animate-fade-in">
          <div className="inline-flex items-center space-x-2 bg-primary-50 border border-primary-200 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">
              The Future of Membership Management
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-slate-900 animate-slide-up">
            Manage Your Members{' '}
            <span className="gradient-text">Effortlessly</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Streamline your membership operations with our powerful platform. 
            Track, engage, and grow your community with ease.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="btn-primary group">
              Start Free Trial
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary">
              Watch Demo
            </button>
          </div>

          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-purple-400 rounded-2xl blur-3xl opacity-20 animate-float"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-slate-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">10K+</div>
                  <div className="text-slate-600">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">99.9%</div>
                  <div className="text-slate-600">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">24/7</div>
                  <div className="text-slate-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

