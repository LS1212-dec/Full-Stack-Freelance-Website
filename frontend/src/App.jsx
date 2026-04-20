import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import GigDetails from './pages/GigDetails';
import GigListing from './pages/GigListing';
import HireTalent from './pages/HireTalent';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen transition-colors duration-300 flex flex-col">
        <Navbar />
        <main className="flex-grow pt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<GigListing />} />
            <Route path="/talent" element={<HireTalent />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/gigs/:id" element={<GigDetails />} />
          </Routes>
        </main>
        
        {/* Simple Footer across site */}
        <footer className="bg-white dark:bg-dark-card border-t border-light-border dark:border-dark-border mt-20 py-8">
            <div className="max-w-7xl mx-auto px-4 text-center text-light-textMuted dark:text-dark-textMuted">
                <p>&copy; {new Date().getFullYear()} GigHive Marketplace. All rights reserved.</p>
            </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
