import axios from 'axios';
import 'dotenv/config';
import { Map } from './types/map.type';

export const fetchGoalMap = async (): Promise<Map> => {
  const goalMapUrl = `${process.env.BASE_API_URL}/map/${process.env.CANDIDATE_ID}/goal`;

  const response = await axios.get(goalMapUrl);
  console.log(response.data);
  return response.data;
};

fetchGoalMap();
