import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderService from './orderAPI';

const initialState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchAdminOrders = createAsyncThunk(
  'orders/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      // Token ko auth state se lena (isliye getState ka istemal)
      const token = getState().auth.user.accessToken;
      return await orderService.fetchAll(token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

// Async Thunk to update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateStatus',
  async ({ orderId, status }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.user.accessToken;
      return await orderService.updateStatus(orderId, status, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      return rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetOrders: (state) => {
        state.items = [];
        state.status = 'idle';
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Orders
      .addCase(fetchAdminOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Order Status
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        // Puraani list me se updated order ko dhoond kar replace karein
        const index = state.items.findIndex((order) => order._id === updatedOrder._id);
        if (index !== -1) {
          state.items[index] = updatedOrder;
        }
      });
  },
});

export const { resetOrders } = orderSlice.actions;
export default orderSlice.reducer;