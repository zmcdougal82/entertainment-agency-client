import axios from 'axios';
import { Entertainer, EntertainerListItem } from '../models/Entertainer';

const API_URL = 'https://entertainment-agency-api-app.azurewebsites.net/api';

export const getEntertainers = async (): Promise<EntertainerListItem[]> => {
  const response = await axios.get(`${API_URL}/entertainers`);
  return response.data;
};

export const getEntertainer = async (id: number): Promise<Entertainer> => {
  const response = await axios.get(`${API_URL}/entertainers/${id}`);
  return response.data;
};

export const createEntertainer = async (entertainer: Entertainer): Promise<Entertainer> => {
  const response = await axios.post(`${API_URL}/entertainers`, entertainer);
  return response.data;
};

export const updateEntertainer = async (id: number, entertainer: Entertainer): Promise<void> => {
  await axios.put(`${API_URL}/entertainers/${id}`, entertainer);
};

export const deleteEntertainer = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/entertainers/${id}`);
};
