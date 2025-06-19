import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000'
  // Você também pode definir outras configurações globais aqui, como headers:
  // headers: {
  //   'Content-Type': 'application/json',
  // }
});

export default api;