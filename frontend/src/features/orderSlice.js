import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const placeOrder = createAsyncThunk('orders/place', async ({gigId, clientId}, thunkAPI) => {
  try {
    const orderData = {
        gigId,
        clientId,
        status: "PENDING",
        createdAt: new Date().toISOString()
    }
    const response = await api.post(`orders`, orderData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.toString());
  }
});

// Since json-server allows relational queries like /orders?clientId=X Expand gig: /orders?clientId=X&_expand=gig
export const getClientOrders = createAsyncThunk('orders/client', async (clientId, thunkAPI) => {
  try {
    // Note: json-server doesn't natively do deep nested joins easily via API, but we'll try standard query.
    // In our mock, gigId is just an int. We can do client lookup quickly.
    const response = await api.get(`orders?clientId=${clientId}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.toString());
  }
});

export const getFreelancerOrders = createAsyncThunk('orders/freelancer', async (_, thunkAPI) => {
  try {
    // Complex mock queries not possible natively, returning everything for demo simplicity if freelancer.
    const response = await api.get('orders');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.toString());
  }
});

export const makePayment = createAsyncThunk('orders/pay', async ({orderId, amount}, thunkAPI) => {
  try {
    // patch the order
    const response = await api.patch(`orders/${orderId}`, {
        status: "IN_PROGRESS",
        amountPaid: amount
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.toString());
  }
});

export const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    isLoading: false,
    isError: false,
    message: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientOrders.pending, (state) => { state.isLoading = true; })
      .addCase(getClientOrders.fulfilled, (state, action) => { state.isLoading = false; state.orders = action.payload; })
      .addCase(getFreelancerOrders.pending, (state) => { state.isLoading = true; })
      .addCase(getFreelancerOrders.fulfilled, (state, action) => { state.isLoading = false; state.orders = action.payload; })
      .addCase(makePayment.fulfilled, (state, action) => {
          const index = state.orders.findIndex(o => o.id === action.payload.id);
          if (index !== -1) {
              state.orders[index] = action.payload;
          }
      });
  }
});

export default orderSlice.reducer;
