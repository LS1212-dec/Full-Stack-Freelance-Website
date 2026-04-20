import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Search, Zap, ShieldCheck } from 'lucide-react';

function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-light-bg dark:bg-dark-bg pt-16 pb-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/5 dark:to-secondary/5 z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-light-text dark:text-dark-text mb-6">
            Find the perfect <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">freelance</span> services for your business
          </h1>
          <p className="mt-4 text-xl text-light-textMuted dark:text-dark-textMuted max-w-3xl mx-auto mb-10">
            Work with talented people at the most affordable price to get the most out of your time and cost.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/explore" className="btn btn-primary text-lg px-8 py-4 shadow-xl shadow-primary/25">
              Find Talent
            </Link>
            <Link to="/register" className="btn btn-outline text-lg px-8 py-4 bg-white dark:bg-dark-card border-none shadow-xl">
              Become a Freelancer
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-dark-card border-t border-light-border dark:border-dark-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="flex flex-col items-center md:items-start animate-fade-in animate-delay-100">
              <div className="h-16 w-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">Proof of quality</h3>
              <p className="text-light-textMuted dark:text-dark-textMuted">Check any pro's work samples, client reviews, and identity verification before booking.</p>
            </div>

            <div className="flex flex-col items-center md:items-start animate-fade-in animate-delay-200">
              <div className="h-16 w-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">No cost until you hire</h3>
              <p className="text-light-textMuted dark:text-dark-textMuted">Interview potential fits for your job, negotiate rates, and only pay for work you approve.</p>
            </div>

            <div className="flex flex-col items-center md:items-start animate-fade-in animate-delay-300">
              <div className="h-16 w-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-4">Safe and secure</h3>
              <p className="text-light-textMuted dark:text-dark-textMuted">Focus on your work knowing we help protect your data and privacy. We're here with 24/7 support if you need it.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
