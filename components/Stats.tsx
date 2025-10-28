'use client';

import { TrendingUp, Award, Globe, Rocket } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    value: '500+',
    label: 'Organizations',
    description: 'Trust our platform',
  },
  {
    icon: Award,
    value: '4.9/5',
    label: 'Customer Rating',
    description: 'From verified users',
  },
  {
    icon: Globe,
    value: '50+',
    label: 'Countries',
    description: 'Worldwide coverage',
  },
  {
    icon: Rocket,
    value: '3x',
    label: 'Faster Growth',
    description: 'Average increase',
  },
];

export default function Stats() {
  return (
    <section className="py-20 px-6 gradient-bg">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Trusted by Organizations Worldwide
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Join thousands of successful organizations managing their memberships with MemberShipX
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-xl font-semibold text-white mb-1">{stat.label}</div>
              <div className="text-white/70">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

