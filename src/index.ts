import 'dotenv/config';
import { CrossmintApiClient } from './crossmintApiClient';
import { MapParser } from './mapParser';
import { AstralObjectsFactory } from './astralObjectsFactory';

const main = async () => {
  const apiClient = new CrossmintApiClient();
  const goalMap = await apiClient.fetchGoalMap();
  const cells = new MapParser().parseMap(goalMap);
  console.log('Parsed map:', JSON.stringify(cells));

  console.log('Creating astral objects...');
  const astralObjectsFactory = new AstralObjectsFactory(apiClient);
  await astralObjectsFactory.createAstralsObjects(cells);
};

main();
