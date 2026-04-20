import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClientOrders, getFreelancerOrders } from '../features/orderSlice';
import { createGig } from '../features/gigSlice';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, DollarSign, Activity } from 'lucide-react';

const mockChartData = [
  { name: 'Week 1', earnings: 400 },
  { name: 'Week 2', earnings: 300 },
  { name: 'Week 3', earnings: 800 },
  { name: 'Week 4', earnings: 1200 },
];

function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading } = useSelector((state) => state.orders);
  
  const [showGigForm, setShowGigForm] = useState(false);
  const [gigData, setGigData] = useState({ title: '', description: '', price: '', category: 'Development', skills: '' });

  useEffect(() => {
    if (user?.role === 'ROLE_CLIENT') dispatch(getClientOrders());
    else if (user?.role === 'ROLE_FREELANCER') dispatch(getFreelancerOrders());
  }, [dispatch, user]);

  const onGigSubmit = (e) => {
    e.preventDefault();
    dispatch(createGig({...gigData, price: parseFloat(gigData.price)}));
    alert("Gig posted successfully!");
    setShowGigForm(false);
    setGigData({ title: '', description: '', price: '', category: 'Development', skills: '' });
  };

  if (!user) return <div className="text-center py-20 text-light-textMuted">Please log in.</div>;

  const totalSpentOrEarned = orders.reduce((acc, curr) => acc + (curr.gig?.price || 0), 0);
  const activeOrders = orders.filter(o => o.status !== 'COMPLETED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-light-text dark:text-dark-text">Overview</h1>
        {user.role === 'ROLE_FREELANCER' && (
          <button onClick={() => setShowGigForm(!showGigForm)} className="btn btn-primary">
            {showGigForm ? 'Cancel' : '+ Create New Gig'}
          </button>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card flex items-center p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
            <div className="p-4 bg-primary/20 rounded-full text-primary mr-4"><DollarSign size={24}/></div>
            <div>
                <p className="text-sm text-light-textMuted dark:text-dark-textMuted font-medium uppercase tracking-wider">{user.role === 'ROLE_FREELANCER' ? 'Total Earnings' : 'Total Spent'}</p>
                <h3 className="text-3xl font-bold text-light-text dark:text-dark-text">${totalSpentOrEarned.toLocaleString()}</h3>
            </div>
        </div>
        <div className="card flex items-center p-6 bg-gradient-to-br from-secondary/10 to-transparent border-secondary/20">
            <div className="p-4 bg-secondary/20 rounded-full text-secondary mr-4"><Package size={24}/></div>
            <div>
                <p className="text-sm text-light-textMuted dark:text-dark-textMuted font-medium uppercase tracking-wider">Active Orders</p>
                <h3 className="text-3xl font-bold text-light-text dark:text-dark-text">{activeOrders}</h3>
            </div>
        </div>
        <div className="card flex items-center p-6">
            <div className="p-4 bg-gray-100 dark:bg-dark-bg rounded-full text-gray-500 dark:text-gray-400 mr-4"><Activity size={24}/></div>
            <div>
                <p className="text-sm text-light-textMuted dark:text-dark-textMuted font-medium uppercase tracking-wider">Completion Rate</p>
                <h3 className="text-3xl font-bold text-light-text dark:text-dark-text">98%</h3>
            </div>
        </div>
      </div>

      {user.role === 'ROLE_FREELANCER' && showGigForm && (
        <div className="card mb-8 border-primary dark:border-primary">
          <h3 className="text-xl font-bold mb-6 text-light-text dark:text-dark-text">Post a New Gig</h3>
          <form onSubmit={onGigSubmit} className="space-y-4">
            <input type="text" placeholder="Gig Title" className="input-field" required value={gigData.title} onChange={e => setGigData({...gigData, title: e.target.value})} />
            <textarea placeholder="Extensive Description" className="input-field min-h-[100px]" required value={gigData.description} onChange={e => setGigData({...gigData, description: e.target.value})} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="number" step="1" placeholder="Price ($)" className="input-field" required value={gigData.price} onChange={e => setGigData({...gigData, price: e.target.value})} />
                <select className="input-field" value={gigData.category} onChange={e => setGigData({...gigData, category: e.target.value})}>
                    <option>Development</option>
                    <option>Design</option>
                    <option>AI Services</option>
                </select>
                <input type="text" placeholder="Skills (comma separated)" className="input-field" value={gigData.skills} onChange={e => setGigData({...gigData, skills: e.target.value})} />
            </div>
            
            <button type="submit" className="btn btn-primary w-full py-3">Publish Gig</button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Orders Table */}
        <div className="card lg:col-span-2 overflow-hidden">
            <h3 className="text-xl font-bold mb-6 text-light-text dark:text-dark-text">Recent Orders</h3>
            {isLoading ? <p>Loading...</p> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-light-border dark:border-dark-border text-light-textMuted dark:text-dark-textMuted uppercase text-xs tracking-wider">
                                <th className="pb-3 pr-4 font-semibold">Order ID</th>
                                <th className="pb-3 pr-4 font-semibold">Gig Details</th>
                                <th className="pb-3 pr-4 font-semibold">Status</th>
                                <th className="pb-3 font-semibold">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <tr key={o.id} className="border-b border-light-border dark:border-dark-border last:border-0 hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors">
                                    <td className="py-4 pr-4 font-medium text-light-text dark:text-dark-text">#{o.id}</td>
                                    <td className="py-4 pr-4 text-light-text dark:text-dark-text truncate max-w-[200px]">{o.gig?.title}</td>
                                    <td className="py-4 pr-4">
                                        <span className={`px-2 py-1 text-xs rounded-full font-bold
                                            ${o.status === 'COMPLETED' ? 'bg-secondary/10 text-secondary' : 
                                              o.status === 'IN_PROGRESS' ? 'bg-blue-500/10 text-blue-500' : 'bg-yellow-500/10 text-yellow-600'}`}>
                                            {o.status}
                                        </span>
                                    </td>
                                    <td className="py-4 font-bold text-light-text dark:text-dark-text">${o.gig?.price}</td>
                                </tr>
                            ))}
                            {orders.length === 0 && <tr><td colSpan="4" className="py-4 text-center text-light-textMuted">No orders found.</td></tr>}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

        {/* Analytics Chart */}
        {user.role === 'ROLE_FREELANCER' && (
            <div className="card">
                <h3 className="text-xl font-bold mb-6 text-light-text dark:text-dark-text">Earnings Analytics</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={mockChartData}>
                            <defs>
                                <linearGradient id="colorEarnings" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff'}} />
                            <Area type="monotone" dataKey="earnings" stroke="#3b82f6" fillOpacity={1} fill="url(#colorEarnings)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        )}
      </div>

    </div>
  );
}

export default Dashboard;
