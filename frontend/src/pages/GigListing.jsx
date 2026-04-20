import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getGigs } from '../features/gigSlice';
import GigCard from '../components/GigCard';
import { Search, Filter, SlidersHorizontal, ChevronRight, ChevronLeft, X, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 }
  }
};

const SkeletonCard = () => (
    <div className="h-[420px] bg-white dark:bg-dark-card border border-light-border dark:border-dark-border rounded-xl p-0 animate-pulse overflow-hidden">
        <div className="w-full h-52 bg-slate-200 dark:bg-dark-border"></div>
        <div className="p-6">
            <div className="flex justify-between mb-4">
                <div className="h-6 w-20 bg-slate-200 dark:bg-dark-border rounded-full"></div>
                <div className="h-6 w-16 bg-slate-200 dark:bg-dark-border rounded-md"></div>
            </div>
            <div className="h-6 w-3/4 bg-slate-200 dark:bg-dark-border rounded mb-3"></div>
            <div className="h-6 w-1/2 bg-slate-200 dark:bg-dark-border rounded mb-6"></div>
            <div className="mt-8 pt-4 border-t border-light-border dark:border-dark-border flex justify-between">
                <div className="h-8 w-24 bg-slate-200 dark:bg-dark-border rounded"></div>
                <div className="h-10 w-24 bg-slate-200 dark:bg-dark-border rounded-lg"></div>
            </div>
        </div>
    </div>
);

function GigListing() {
  const dispatch = useDispatch();
  const { gigs, totalGigs, isLoading, isFallbackActive } = useSelector((state) => state.gigs);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOption, setSortOption] = useState('createdAt_desc');
  const [page, setPage] = useState(1);
  const limit = 9;

  const categories = ["Development", "Design", "AI Services", "Marketing", "Writing"];

  const buildQueryStrings = () => {
      let query = `?page=${Math.max(0, page - 1)}&size=${limit}`;
      if (searchTerm) query += `&keyword=${searchTerm}`;
      if (selectedCategory && selectedCategory !== 'All') query += `&category=${selectedCategory}`;
      const [sortBy, sortDir] = sortOption.split('_');
      query += `&sortBy=${sortBy}&sortDir=${sortDir}`;
      return query;
  };

  useEffect(() => {
    dispatch(getGigs(buildQueryStrings()));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, page, selectedCategory, sortOption]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(getGigs(buildQueryStrings()));
  };

  const handleClearFilters = () => {
      setSearchTerm('');
      setSelectedCategory('');
      setPage(1);
      dispatch(getGigs(`?page=0&size=${limit}&sortBy=createdAt&sortDir=desc`));
  };

  const totalPages = Math.ceil(totalGigs / limit) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in bg-slate-50 dark:bg-dark-bg min-h-screen">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div>
            <h1 className="text-4xl md:text-5xl font-black text-light-text dark:text-dark-text mb-3">Find Work</h1>
            <p className="text-light-textMuted dark:text-dark-textMuted text-lg font-medium">Explore incredibly talented freelancers tailored for you.</p>
        </div>
        
        <div className="w-full md:w-1/3 relative flex items-center shadow-lg rounded-xl">
            <Search className="absolute left-4 top-4 text-light-textMuted dark:text-dark-textMuted" size={22}/>
            <form onSubmit={handleSearchSubmit} className="w-full">
                <input 
                    type="text" 
                    placeholder="Search by keyword, skill..." 
                    className="w-full pl-12 pr-4 py-4 rounded-xl border border-light-border bg-white text-light-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm font-medium dark:bg-dark-card dark:border-dark-border dark:text-dark-text text-lg"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </form>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sticky Sidebar Filters */}
        <aside className="w-full lg:w-1/4 lg:sticky lg:top-28">
            <div className="card border-light-border dark:border-dark-border shadow-md p-6 bg-white dark:bg-dark-card rounded-2xl">
                <div className="flex justify-between items-center mb-6 border-b border-light-border dark:border-dark-border pb-4">
                    <div className="flex items-center gap-2 text-light-text dark:text-dark-text font-black text-xl">
                        <SlidersHorizontal size={22}/> Filters
                    </div>
                </div>

                <div className="mb-2">
                    <label className="text-xs uppercase tracking-widest font-black text-light-textMuted dark:text-dark-textMuted mb-4 block">Categories</label>
                    <div className="flex flex-col gap-3">
                        <label className="flex items-center cursor-pointer group">
                            <input 
                                type="radio" 
                                name="category" 
                                className="form-radio h-5 w-5 text-primary border-gray-300 dark:border-dark-border"
                                checked={selectedCategory === ''}
                                onChange={() => { setPage(1); setSelectedCategory(''); }}
                            />
                            <span className={`ml-3 font-semibold transition-colors ${selectedCategory === '' ? 'text-primary' : 'text-light-text dark:text-dark-text hover:text-primary'}`}>All Categories</span>
                        </label>
                        {categories.map(cat => (
                            <label key={cat} className="flex items-center cursor-pointer group">
                                <input 
                                    type="radio" 
                                    name="category" 
                                    className="form-radio h-5 w-5 text-primary border-gray-300 dark:border-dark-border"
                                    checked={selectedCategory === cat}
                                    onChange={() => { setPage(1); setSelectedCategory(cat); }}
                                />
                                <span className={`ml-3 font-semibold transition-colors ${selectedCategory === cat ? 'text-primary' : 'text-light-text dark:text-dark-text hover:text-primary'}`}>
                                    {cat}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
        </aside>

        {/* Main Content Area */}
        <div className="w-full lg:w-3/4">
            
            {/* Context/Sort Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 bg-white dark:bg-dark-card p-4 rounded-xl border border-light-border dark:border-dark-border shadow-sm">
                
                <div className="flex flex-wrap items-center gap-3">
                    <span className="text-light-text dark:text-dark-text font-bold">Showing <span className="text-primary">{totalGigs}</span> gigs</span>
                    {(searchTerm || selectedCategory) && (
                        <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-light-textMuted dark:text-dark-textMuted text-sm">Filtered by:</span>
                            {selectedCategory && <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">{selectedCategory}</span>}
                            {searchTerm && <span className="px-3 py-1 bg-slate-100 dark:bg-dark-bg text-light-text text-xs font-bold rounded-full border border-light-border dark:text-dark-text">"{searchTerm}"</span>}
                            <button onClick={handleClearFilters} className="text-xs text-secondary hover:text-primary font-bold flex items-center ml-2 transition-colors"><X size={14}/> Clear</button>
                        </div>
                    )}
                </div>

                <select 
                    className="bg-slate-50 dark:bg-dark-bg border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text py-2.5 px-4 focus:ring-2 focus:ring-primary focus:border-primary transition-all font-semibold outline-none cursor-pointer"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="createdAt_desc">Recommended (Newest)</option>
                    <option value="rating_desc">Highest Rated</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="price_asc">Price: Low to High</option>
                </select>
            </div>

            {/* Display Grids */}
            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1,2,3,4,5,6].map(n => <SkeletonCard key={n} />)}
                </div>
            ) : gigs.length > 0 ? (
                <AnimatePresence mode="popLayout">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
                    >
                        {gigs.map((gig) => (
                            <GigCard key={gig.id} gig={gig} />
                        ))}
                    </motion.div>
                </AnimatePresence>
            ) : (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-24 bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border shadow-lg">
                    <Filter size={64} className="mx-auto text-light-border dark:text-dark-border mb-6"/>
                    <h3 className="text-3xl font-black text-light-text dark:text-dark-text mb-4">No results found</h3>
                    <p className="text-light-textMuted dark:text-dark-textMuted leading-relaxed max-w-md mx-auto mb-8 text-lg font-medium">
                        Your filters didn't match any of our top talent. Adjust your categories, clear search terms, or explore other active projects.
                    </p>
                    <button onClick={handleClearFilters} className="btn btn-primary px-8 py-3 text-lg shadow-primary/30 shadow-lg">
                        Explore All Categories
                    </button>
                </motion.div>
            )}

            {/* Premium Pagination Engine */}
            {!isLoading && totalPages > 1 && (
                <div className="flex justify-center items-center mt-12 gap-3 pb-8">
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="p-3 border-2 border-light-border dark:border-dark-border bg-white dark:bg-dark-card rounded-xl hover:border-primary hover:text-primary disabled:opacity-40 transition-all font-bold group shadow-sm disabled:shadow-none"
                    >
                        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform"/>
                    </button>
                    <div className="px-6 py-2.5 bg-white dark:bg-dark-card border-2 border-light-border dark:border-dark-border rounded-xl font-black text-light-text dark:text-dark-text text-lg shadow-sm">
                        {page} <span className="opacity-40 mx-1">/</span> {totalPages}
                    </div>
                    <button 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="p-3 border-2 border-light-border dark:border-dark-border bg-white dark:bg-dark-card rounded-xl hover:border-primary hover:text-primary disabled:opacity-40 transition-all font-bold group shadow-sm disabled:shadow-none"
                    >
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                    </button>
                </div>
            )}

        </div>
      </div>
    </div>
  );
}

export default GigListing;
