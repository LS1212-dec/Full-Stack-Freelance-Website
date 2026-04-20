import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Award, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

const GigCard = ({ gig }) => {
  const isTopRated = gig.isTopRated || gig.rating > 4.8;
  const isTrending = gig.tags && gig.tags.toLowerCase().includes('trending');

  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -6, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="card flex flex-col h-full p-0 overflow-hidden relative group bg-white dark:bg-dark-card border-light-border dark:border-dark-border"
    >
      {/* Absolute Badges over Image */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isTopRated && (
              <span className="bg-yellow-500 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wider backdrop-blur-sm">
                  <Award size={12}/> Top Rated
              </span>
          )}
          {isTrending && (
              <span className="bg-rose-500 text-white text-[10px] sm:text-xs font-black px-2.5 py-1 rounded shadow-md flex items-center gap-1 uppercase tracking-wider backdrop-blur-sm">
                  <TrendingUp size={12}/> Trending
              </span>
          )}
      </div>

      <div className="relative w-full h-48 sm:h-52 overflow-hidden border-b border-light-border dark:border-dark-border bg-slate-200 dark:bg-slate-800">
          <img 
              src={(gig.image && gig.image !== "null" && gig.image !== "undefined") ? gig.image : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80'} 
              alt={gig.title} 
              className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500"></div>
      </div>
      
      <div className="p-5 sm:p-6 flex flex-col h-full flex-grow">
        <div className="flex justify-between items-start mb-3">
            <span className="bg-primary/10 text-primary text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-full uppercase tracking-widest border border-primary/20">
              {gig.category || 'Gig'}
            </span>
            <div className="flex items-center text-sm font-bold bg-yellow-500/10 dark:bg-yellow-400/10 px-2 py-1 rounded-md text-yellow-600 dark:text-yellow-400 border border-yellow-500/20">
                <Star size={14} className="mr-1 fill-current" />
                <span>{gig.rating ? gig.rating.toFixed(1) : "5.0"}</span>
                <span className="ml-1.5 text-light-textMuted dark:text-dark-textMuted font-medium text-xs">({gig.reviewCount || 0})</span>
            </div>
        </div>
        
        <h3 className="text-lg sm:text-[1.15rem] font-extrabold text-light-text dark:text-dark-text leading-snug mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link to={`/gigs/${gig.id}`} className="focus:outline-none">{gig.title}</Link>
        </h3>
        
        <span className="text-xs text-light-textMuted dark:text-dark-textMuted font-semibold mb-4 underline decoration-light-border dark:decoration-dark-border underline-offset-4 decoration-2">
            by {gig.freelancer?.username || 'Expert'}
        </span>

        {gig.skills && (
            <div className="flex flex-wrap gap-2 mb-6 mt-auto pt-2">
                {gig.skills.split(',').slice(0,2).map(skill => (
                    <span key={skill} className="px-2.5 py-1 bg-slate-50 dark:bg-dark-bg text-light-textMuted dark:text-dark-textMuted text-xs font-semibold rounded border border-light-border dark:border-dark-border">
                        {skill.trim()}
                    </span>
                ))}
            </div>
        )}
        
        <div className="mt-auto border-t border-light-border dark:border-dark-border pt-4 flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-[10px] text-light-textMuted dark:text-dark-textMuted uppercase font-black tracking-widest mb-0.5">Starting at</span>
                <span className="text-2xl font-black text-light-text dark:text-dark-text">${gig.price}</span>
            </div>
            
            <Link to={`/gigs/${gig.id}`} className="btn px-4 sm:px-5 py-2.5 bg-white dark:bg-dark-bg border-2 border-primary text-primary hover:bg-primary hover:text-white dark:border-primary dark:text-primary transition-all shadow-sm font-bold flex items-center gap-1 group-hover:scale-105 active:scale-95">
              Select <ChevronRight size={16} />
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GigCard;
