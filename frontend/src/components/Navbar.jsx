import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/authSlice';
import { useTheme } from './ThemeToggle';
import { Moon, Sun, User as UserIcon, LogOut, Menu } from 'lucide-react';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isDarkMode, toggleTheme } = useTheme();

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-dark-bg/80 border-b border-light-border dark:border-dark-border transition-colors duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Left Side: Logo & Links */}
          <div className="flex items-center gap-10">
            <Link to="/" className="text-3xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-90 transition-opacity">
              GigHive
            </Link>
            
            <div className="hidden lg:flex space-x-8">
              <Link to="/explore" className="text-light-textMuted dark:text-dark-textMuted hover:text-primary dark:hover:text-primary font-medium transition-colors">Find Work</Link>
              <Link to="/talent" className="text-light-textMuted dark:text-dark-textMuted hover:text-primary dark:hover:text-primary font-medium transition-colors">Hire Talent</Link>
              <Link to="/about" className="text-light-textMuted dark:text-dark-textMuted hover:text-primary dark:hover:text-primary font-medium transition-colors">About</Link>
              <Link to="/contact" className="text-light-textMuted dark:text-dark-textMuted hover:text-primary dark:hover:text-primary font-medium transition-colors">Contact</Link>
            </div>
          </div>

          {/* Right Side: Auth & Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border transition-colors text-light-textMuted dark:text-dark-textMuted">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="hidden md:flex items-center gap-2 text-light-text dark:text-dark-text font-medium hover:text-primary dark:hover:text-primary transition-colors bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border px-4 py-2 rounded-lg">
                  <UserIcon size={18}/>
                  <span>{user.username}</span>
                </Link>
                <button onClick={onLogout} className="btn bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-border dark:text-dark-text dark:hover:bg-gray-700 flex items-center gap-2 shadow-none">
                  <LogOut size={18}/>
                  <span className="hidden md:inline">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-light-text dark:text-dark-text font-medium hover:text-primary dark:hover:text-primary hidden sm:block px-4 py-2">Log In</Link>
                <Link to="/register" className="btn btn-primary shadow-md">Sign Up</Link>
              </div>
            )}
            
            <button className="lg:hidden p-2 text-light-text dark:text-dark-text rounded-md hover:bg-gray-100 dark:hover:bg-dark-border">
                <Menu size={24}/>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
