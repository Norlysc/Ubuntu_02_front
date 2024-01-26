import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://t-ubuntu02.qi.local:31934/api/v1/',
  baseURL: 'http://localhost:8080/api/v1/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
