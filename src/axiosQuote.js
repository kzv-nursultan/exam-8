import axios from 'axios';

const axiosQuote = axios.create({
  baseURL: 'https://exam-8-75fc6-default-rtdb.firebaseio.com/'
});

export default axiosQuote;