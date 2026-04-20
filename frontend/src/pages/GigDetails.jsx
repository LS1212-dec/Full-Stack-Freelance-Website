import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getGigById } from '../features/gigSlice';
import { placeOrder, makePayment } from '../features/orderSlice';
import Modal from '../components/Modal';
import { CheckCircle } from 'lucide-react';

function GigDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { currentGig, isLoading } = useSelector((state) => state.gigs);
  const { user } = useSelector((state) => state.auth);
  
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    dispatch(getGigById(id));
  }, [dispatch, id]);

  const onInitialOrder = () => {
    if (!user) { navigate('/login'); return; }
    setIsPaymentModalOpen(true);
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    // 1. Create the Order
    dispatch(placeOrder(id)).then((res) => {
        if(!res.error) {
            const orderId = res.payload.id;
            // 2. Automatically mock process the payment for UX flow
            dispatch(makePayment({ orderId, amount: currentGig.price })).then((paymentRes) => {
                setIsProcessing(false);
                if(!paymentRes.error) {
                    setSuccess(true);
                    setTimeout(() => {
                        setIsPaymentModalOpen(false);
                        navigate('/dashboard');
                    }, 2000);
                }
            });
        } else {
            setIsProcessing(false);
            alert("Error creating order.");
        }
    });
  };

  if (isLoading || !currentGig) return <div className="p-20 text-center animate-pulse">Loading amazing gig details...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left content */}
        <div className="w-full lg:w-2/3">
            <h1 className="text-4xl font-extrabold text-light-text dark:text-dark-text leading-tight mb-6">{currentGig.title}</h1>
            
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-light-border dark:border-dark-border">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {currentGig.freelancer?.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                     <p className="font-bold text-light-text dark:text-dark-text">{currentGig.freelancer?.username}</p>
                     <p className="text-sm text-secondary font-semibold">Top Rated Seller</p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 text-light-text dark:text-dark-text">About this Gig</h2>
            <p className="text-lg leading-relaxed text-light-textMuted dark:text-dark-textMuted whitespace-pre-line mb-8">
                {currentGig.description}
            </p>

            <h3 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Skills Required</h3>
            <div className="flex flex-wrap gap-2 mb-8">
                {currentGig.skills?.split(',').map(skill => (
                    <span key={skill} className="px-4 py-2 bg-gray-100 dark:bg-dark-bg text-light-textMuted dark:text-dark-textMuted rounded-lg font-medium">
                        {skill.trim()}
                    </span>
                ))}
            </div>
        </div>

        {/* Right Sticky Checkout */}
        <div className="w-full lg:w-1/3">
            <div className="card sticky top-28 p-8 border-2 border-primary/20 dark:border-primary/20 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">Standard Package</h3>
                    <span className="text-3xl font-black text-light-text dark:text-dark-text">${currentGig.price}</span>
                </div>
                <p className="text-light-textMuted dark:text-dark-textMuted mb-6">
                    Comprehensive delivery mapped exact to your requirements with 2 revisions.
                </p>
                <ul className="space-y-3 mb-8">
                    <li className="flex items-center gap-3 text-light-text dark:text-dark-text"><CheckCircle size={18} className="text-secondary"/> Priority Support</li>
                    <li className="flex items-center gap-3 text-light-text dark:text-dark-text"><CheckCircle size={18} className="text-secondary"/> Source Files Included</li>
                    <li className="flex items-center gap-3 text-light-text dark:text-dark-text"><CheckCircle size={18} className="text-secondary"/> 3 Day Delivery</li>
                </ul>

                {(!user || user.role === 'ROLE_CLIENT') && (
                    <button onClick={onInitialOrder} className="btn btn-primary w-full py-4 text-lg">
                        Continue to Checkout
                    </button>
                )}
                {user?.role === 'ROLE_FREELANCER' && (
                     <div className="text-center p-4 bg-gray-100 dark:bg-dark-bg text-light-textMuted dark:text-dark-textMuted rounded-lg">
                         Switch to Client account to purchase
                     </div>
                )}
            </div>
        </div>
      </div>

      {/* Payment Modal integration */}
      <Modal 
        isOpen={isPaymentModalOpen} 
        onClose={() => !isProcessing && setIsPaymentModalOpen(false)}
        title="Secure Checkout"
      >
        {success ? (
            <div className="text-center py-8 animate-fade-in">
                <div className="h-20 w-20 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold text-light-text dark:text-dark-text mb-2">Payment Successful!</h3>
                <p className="text-light-textMuted dark:text-dark-textMuted">Your order has been placed. Redirecting to dashboard...</p>
            </div>
        ) : (
            <form onSubmit={handleCheckout} className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-dark-bg rounded-xl border border-light-border dark:border-dark-border mb-6 flex justify-between items-center">
                    <span className="font-semibold text-light-text dark:text-dark-text">Total Due:</span>
                    <span className="text-2xl font-black text-primary border-transparent">${currentGig.price}</span>
                </div>
                
                <div>
                    <label className="label-text">Card Number</label>
                    <input type="text" className="input-field" placeholder="1234 5678 9101 1121" required disabled={isProcessing}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="label-text">Expiry Date</label>
                        <input type="text" className="input-field" placeholder="MM/YY" required disabled={isProcessing}/>
                    </div>
                    <div>
                        <label className="label-text">CVV</label>
                        <input type="password" className="input-field" placeholder="•••" required disabled={isProcessing}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-full py-4 mt-6" disabled={isProcessing}>
                    {isProcessing ? 'Processing Transaction...' : `Pay $${currentGig.price}`}
                </button>
            </form>
        )}
      </Modal>
    </div>
  );
}

export default GigDetails;
