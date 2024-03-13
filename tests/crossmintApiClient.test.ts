import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { CrossmintApiClient } from '../src/crossmintApiClient';

describe('CrossmintApiClient', () => {
  const mockAxios = new AxiosMockAdapter(axios);
  const client = new CrossmintApiClient();
  const baseUrl = process.env.BASE_API_URL;
  const candidateId = process.env.CANDIDATE_ID;

  afterEach(() => {
    mockAxios.reset();
  });

  it('fetchGoalMap should return the goal map', async () => {
    const mockGoalMap = [
      ['SPACE', 'POLYANET', 'SOLOON'],
      ['SPACE', 'COMETH', 'SPACE']
    ];
    mockAxios
      .onGet(`${baseUrl}/map/${candidateId}/goal`)
      .reply(200, { goal: mockGoalMap });

    const goalMap = await client.fetchGoalMap();
    expect(goalMap).toEqual(mockGoalMap);
  });

  it('createPolyanet should post polyanet position', async () => {
    const pos = { x: 1, y: 2 };
    mockAxios.onPost(`${baseUrl}/polyanets`).reply(200);

    await client.createPolyanet(pos);
    expect(mockAxios.history.post.length).toBe(1);
    const postCall = mockAxios.history.post[0];
    expect(postCall.data).toEqual(
      JSON.stringify({
        candidateId,
        column: pos.x,
        row: pos.y
      })
    );
  });

  it('createSoloon should post SOLoon position and color', async () => {
    const pos = { x: 1, y: 2 };
    const color = 'red';
    mockAxios.onPost(`${baseUrl}/soloons`).reply(200);

    await client.createSoloon(pos, color);
    expect(mockAxios.history.post.length).toBe(1);
    const postCall = mockAxios.history.post[0];
    expect(postCall.data).toEqual(
      JSON.stringify({
        candidateId,
        column: pos.x,
        row: pos.y,
        color
      })
    );
  });

  it('createCometh should post comETH position and direction', async () => {
    const pos = { x: 3, y: 4 };
    const direction = 'north';
    mockAxios.onPost(`${baseUrl}/comeths`).reply(200);

    await client.createCometh(pos, direction);
    expect(mockAxios.history.post.length).toBe(1);
    const postCall = mockAxios.history.post[0];
    expect(postCall.data).toEqual(
      JSON.stringify({
        candidateId,
        column: pos.x,
        row: pos.y,
        direction
      })
    );
  });
});
