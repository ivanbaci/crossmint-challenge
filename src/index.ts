import axios from 'axios';
import 'dotenv/config';
import { Map } from './types/map.type';

const fetchGoalMap = async (): Promise<string[][]> => {
  const goalMapUrl = `${process.env.BASE_API_URL}/map/${process.env.CANDIDATE_ID}/goal`;

  const response = await axios.get(goalMapUrl);
  console.log(response.data);
  return response.data.goal;
};

const parseMap = (map: string[][]): void => {
  map.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      console.log(`Row ${rowIndex}, Cell ${cellIndex}: ${cell}`);
    });
  });
};

const main = async () => {
  const goalMap = await fetchGoalMap();
  parseMap(goalMap);
};

main();
