import axios from 'axios';
import 'dotenv/config';
import { Map } from './types/map.type';

const fetchGoalMap = async (): Promise<string[][]> => {
  const goalMapUrl = `${process.env.BASE_API_URL}/map/${process.env.CANDIDATE_ID}/goal`;

  const response = await axios.get(goalMapUrl);
  console.log(response.data);
  return response.data.goal;
};

const parseMap = async (map: string[][]): Promise<void> => {
  for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
    const row = map[rowIndex];
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      const cell = row[columnIndex];
      console.log(`Row ${rowIndex}, Column ${columnIndex}: ${cell}`);
      if (cell === 'POLYANET') await createPolyanet(rowIndex, columnIndex);
    }
  }
};

const createPolyanet = async (
  rowIndex: number,
  columnIndex: number
): Promise<void> => {
  console.log(`Creating Polyanet at Row ${rowIndex}, Column ${columnIndex}`);
  const polyanetUrl = `${process.env.BASE_API_URL}/polyanets`;
  await axios.post(polyanetUrl, {
    row: rowIndex,
    column: columnIndex,
    candidateId: process.env.CANDIDATE_ID
  });
};

const main = async () => {
  const goalMap = await fetchGoalMap();
  parseMap(goalMap);
};

main();
