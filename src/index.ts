import 'dotenv/config';
import { CrossmintApiClient } from './crossmintApiClient';

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
  // const polyanetUrl = `${process.env.BASE_API_URL}/polyanets`;
  // await axios.post(polyanetUrl, {
  //   row: rowIndex,
  //   column: columnIndex,
  //   candidateId: process.env.CANDIDATE_ID
  // });
};

const main = async () => {
  const apiClient = new CrossmintApiClient();
  const goalMap = await apiClient.fetchGoalMap();
  parseMap(goalMap);
};

main();
