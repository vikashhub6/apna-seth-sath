import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchNearbyHospitals = async () => {
  const res = await axios.get('/api/emergency');
  return res.data.data;
};