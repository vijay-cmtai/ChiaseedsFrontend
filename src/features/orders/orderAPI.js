import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API_URL = `${BACKEND_URL}/api/v1/admin/orders`;

const fetchAll = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(`${API_URL}/all`, config);
  return response.data.data;
};

// Update an order's status
const updateStatus = async (orderId, status, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.patch(
    `${API_URL}/${orderId}/status`,
    { status }, // Request Body
    config
  );
  return response.data.data;
};

const orderService = {
  fetchAll,
  updateStatus,
};

export default orderService;