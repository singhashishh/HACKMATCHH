import axios from 'axios';

const API = axios.create({ 
  baseURL: 'http://localhost:5000/api' // <--- '/api' hona MUST hai
});

export default API;