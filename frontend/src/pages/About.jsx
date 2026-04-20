import React from 'react';
import { Target, Users, ShieldCheck, Zap } from 'lucide-react';

function About() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-light-bg dark:bg-dark-bg py-20 border-b border-light-border dark:border-dark-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-balance">
          <h1 className="text-5xl md:text-6xl font-black text-light-text dark:text-dark-text mb-6">
            Empowering the global <span className="text-primary">freelance economy</span>
          </h1>
          <p className="text-xl text-light-textMuted dark:text-dark-textMuted leading-relaxed">
            GigHive was founded with a simple objective: effortlessly connect brilliant talent with ambitious businesses. We believe that distance and borders shouldn't dictate who you can work with.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text mb-4">Our Core Values</h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-3">Quality First</h3>
            <p className="text-light-textMuted dark:text-dark-textMuted">We prioritize delivering top-tier results over quick, rushed jobs. Excellence is our baseline.</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-3">Community</h3>
            <p className="text-light-textMuted dark:text-dark-textMuted">A thriving ecosystem where freelancers and clients grow together in a supportive environment.</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-3">Trust & Safety</h3>
            <p className="text-light-textMuted dark:text-dark-textMuted">Robust payment escrows and strict vetting ensure you can collaborate with peace of mind.</p>
          </div>

          <div className="text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-3">Speed</h3>
            <p className="text-light-textMuted dark:text-dark-textMuted">Streamlined tooling allows businesses to hire and onboard talent in a matter of minutes.</p>
          </div>

        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border py-20">
         <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-divider">
            <div>
               <h4 className="text-4xl font-black text-primary mb-2">10M+</h4>
               <p className="text-light-textMuted dark:text-dark-textMuted font-medium uppercase tracking-wider text-sm">Gigs Completed</p>
            </div>
            <div>
               <h4 className="text-4xl font-black text-secondary mb-2">4.9/5</h4>
               <p className="text-light-textMuted dark:text-dark-textMuted font-medium uppercase tracking-wider text-sm">Average Rating</p>
            </div>
            <div>
               <h4 className="text-4xl font-black text-blue-500 mb-2">120+</h4>
               <p className="text-light-textMuted dark:text-dark-textMuted font-medium uppercase tracking-wider text-sm">Countries</p>
            </div>
            <div>
               <h4 className="text-4xl font-black text-yellow-500 mb-2">24/7</h4>
               <p className="text-light-textMuted dark:text-dark-textMuted font-medium uppercase tracking-wider text-sm">Support</p>
            </div>
         </div>
      </section>
    </div>
  );
}

export default About;
