import axios from 'axios';

const API_URL = 'http://localhost:3000';
async function executeTransaction(id: string, value: number) {
  const resp = await axios.post(`${API_URL}/transaction`, { id, value });
  return resp.data;
}

function getBalance(id: string) {
  return axios.get(`${API_URL}/balance/${id}`);
}

function getHistory(id: string) {
  return axios.get(`${API_URL}/history/${id}`);
}

export const ApiService = {
  executeTransaction,
  getBalance,
  getHistory,
};
