import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { makePayment } from '../features/orderSlice';

function Payment() {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    dispatch(makePayment({ orderId, amount: parseFloat(amount) })).then((res) => {
        if(!res.error) {
            alert('Payment Successful!');
            navigate('/dashboard');
        } else {
            alert('Payment failed');
            setIsProcessing(false);
        }
    });
  };

  return (
    <div className="form-container">
      <h2 style={{textAlign: 'center', marginBottom: '30px', fontSize: '2rem'}}>Secure Payment</h2>
      <p style={{textAlign: 'center', marginBottom: '20px', color: 'var(--text-muted)'}}>Order #{orderId}</p>
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Amount to Pay ($)</label>
          <input type="number" step="0.01" className="form-control" value={amount} onChange={e => setAmount(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Card Number</label>
          <input type="text" className="form-control" placeholder="**** **** **** ****" required />
        </div>
        <div style={{display: 'flex', gap: '15px'}}>
            <div className="form-group" style={{flex: 1}}>
                <label>Expiry Date</label>
                <input type="text" className="form-control" placeholder="MM/YY" required />
            </div>
            <div className="form-group" style={{flex: 1}}>
                <label>CVV</label>
                <input type="text" className="form-control" placeholder="123" required />
            </div>
        </div>
        <button type="submit" className="btn btn-secondary" style={{width: '100%', padding: '15px'}} disabled={isProcessing}>
          {isProcessing ? 'Processing Payment...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}

export default Payment;
