import 'dotenv/config';
import { CrossmintApiClient } from './api/crossmintApiClient';
import { MapParser } from './parsers/mapParser';
import { AstralObjectsFactory } from './factories/astralObjectsFactory';

const main = async () => {
  const apiClient = new CrossmintApiClient();
  console.log('Fetching goal map...');
  const goalMap = await apiClient.fetchGoalMap();
  const cells = new MapParser().parseMap(goalMap);
  console.log('Parsed map:', JSON.stringify(cells));

  console.log('Creating astral objects...');
  const astralObjectsFactory = new AstralObjectsFactory(apiClient);
  await astralObjectsFactory.createAstralObjects(cells);
  console.log('Astral objects created successfully!');

  console.log(
    `Look at the map at https://challenge.crossmint.io/map with candidateId ${process.env.CANDIDATE_ID} to see the result!`
  );
};

main();
