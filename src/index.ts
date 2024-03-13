import 'dotenv/config';
import { CrossmintApiClient } from './crossmintApiClient';
import { MapParser } from './mapParser';

const main = async () => {
  const apiClient = new CrossmintApiClient();
  const goalMap = await apiClient.fetchGoalMap();
  const parsedMap = new MapParser().parseMap(goalMap);
  console.log('Parsed map:', JSON.stringify(parsedMap));
};

main();
