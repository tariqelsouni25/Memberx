'use client';

import { Users, Shield, Zap, BarChart3, Clock, HeartHandshake } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Member Management',
    description: 'Easily manage all your members in one centralized dashboard with powerful search and filtering.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description: 'Enterprise-grade security with GDPR compliance and encrypted data storage for peace of mind.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized performance ensures your membership operations run smoothly without any delays.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Get insights into member behavior, engagement trends, and growth metrics with detailed reports.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Clock,
    title: 'Automated Workflows',
    description: 'Save time with automated renewals, notifications, and member onboarding processes.',
    color: 'from-indigo-500 to-blue-500',
  },
  {
    icon: HeartHandshake,
    title: 'Member Engagement',
    description: 'Build stronger relationships with built-in communication tools and engagement features.',
    color: 'from-rose-500 to-red-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Powerful Features for
            <span className="gradient-text"> Modern Teams</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to manage and grow your membership community effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-slate-200 rounded-2xl p-8 card-hover"
            >
              <div className={`bg-gradient-to-r ${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

