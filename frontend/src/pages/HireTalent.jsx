import React, { useState } from 'react';
import { Search, MapPin, Star, Award, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_FREELANCERS = [
  { id: 1, name: 'Elena Rodriguez', title: 'Senior Full Stack Developer', rate: 85, rating: 5.0, jobs: 124, skills: ['React', 'Node.js', 'AWS'], location: 'United States', image: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, name: 'David Chen', title: 'UI/UX Visual Designer', rate: 60, rating: 4.9, jobs: 89, skills: ['Figma', 'Prototyping', 'User Research'], location: 'Canada', image: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Sarah Johnson', title: 'Expert SEO Copywriter', rate: 45, rating: 4.8, jobs: 205, skills: ['SEO', 'Content Strategy', 'B2B'], location: 'United Kingdom', image: 'https://i.pravatar.cc/150?img=5' },
  { id: 4, name: 'Michael Chang', title: 'Machine Learning Engineer', rate: 120, rating: 5.0, jobs: 42, skills: ['Python', 'PyTorch', 'Computer Vision'], location: 'Singapore', image: 'https://i.pravatar.cc/150?img=8' },
  { id: 5, name: 'Emily Davis', title: 'Digital Marketing Strategist', rate: 70, rating: 4.9, jobs: 156, skills: ['Google Ads', 'Analytics', 'Social Media'], location: 'Australia', image: 'https://i.pravatar.cc/150?img=9' },
  { id: 6, name: 'Alex Smirnov', title: 'Mobile App Developer', rate: 65, rating: 4.7, jobs: 73, skills: ['Flutter', 'iOS', 'Android'], location: 'Germany', image: 'https://i.pravatar.cc/150?img=12' },
];

function HireTalent() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTalent = MOCK_FREELANCERS.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black text-light-text dark:text-dark-text mb-6 leading-tight">
          Find and hire <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">expert talent</span>
        </h1>
        <p className="text-xl text-light-textMuted dark:text-dark-textMuted mb-8">
          Browse our highly vetted directory of top-tier freelancers ready to accelerate your next big project.
        </p>

        <div className="relative max-w-2xl mx-auto shadow-lg rounded-xl">
          <Search className="absolute left-4 top-4 text-light-textMuted dark:text-dark-textMuted" size={24}/>
          <input 
            type="text" 
            placeholder="Search by name, skills, or job title..." 
            className="w-full pl-14 pr-4 py-4 rounded-xl border-2 border-transparent bg-white dark:bg-dark-card text-light-text dark:text-dark-text focus:border-primary focus:outline-none focus:ring-0 transition-colors text-lg"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTalent.length > 0 ? filteredTalent.map((freelancer, index) => (
          <div key={freelancer.id} className="card p-6 flex flex-col items-center text-center animate-fade-in transform transition-transform hover:-translate-y-2 hover:shadow-xl hover:border-primary/30" style={{animationDelay: `${index * 50}ms`}}>
            <div className="relative mb-6">
              <img src={freelancer.image} alt={freelancer.name} className="w-24 h-24 rounded-full object-cover border-4 border-white dark:border-dark-bg shadow-md" />
              <div className="absolute -bottom-2 -right-2 bg-secondary text-white p-1.5 rounded-full border-2 border-white dark:border-dark-bg" title="Top Rated">
                <Award size={16} />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-1">{freelancer.name}</h3>
            <p className="text-primary font-medium mb-3">{freelancer.title}</p>
            
            <div className="flex items-center gap-4 text-sm text-light-textMuted dark:text-dark-textMuted mb-4">
              <div className="flex items-center gap-1"><MapPin size={14}/> {freelancer.location}</div>
              <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded"><Star size={14} className="fill-current"/> {freelancer.rating}</div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {freelancer.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-gray-100 dark:bg-dark-bg text-light-textMuted dark:text-dark-textMuted text-xs font-semibold rounded-full border border-light-border dark:border-dark-border">
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="mt-auto w-full border-t border-light-border dark:border-dark-border pt-4 flex items-center justify-between">
              <div>
                <span className="text-sm text-light-textMuted dark:text-dark-textMuted">Hourly Rate</span>
                <p className="text-lg font-black text-light-text dark:text-dark-text">${freelancer.rate}<span className="text-sm font-normal text-light-textMuted">/hr</span></p>
              </div>
              <Link to="/register" className="btn btn-primary px-6 flex items-center gap-2">
                Hire <ChevronRight size={16}/>
              </Link>
            </div>
          </div>
        )) : (
            <div className="col-span-full text-center py-20 bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border">
                <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">No Freelancers Match</h3>
                <p className="text-light-textMuted dark:text-dark-textMuted">Try searching for broader skills like "React" or "Design".</p>
            </div>
        )}
      </div>
    </div>
  );
}

export default HireTalent;
