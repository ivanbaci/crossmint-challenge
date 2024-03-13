import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import { ApiCaller } from '../../src/api/apiCaller';

describe('ApiCaller', () => {
  const mockAxios = new AxiosMockAdapter(axios);
  const caller = new ApiCaller();

  afterEach(() => {
    mockAxios.reset();
  });

  it('should successfully return data on first try', async () => {
    const mockData = 'response';
    mockAxios.onGet('url').reply(200, { mockData });

    const result = await caller.callWithRetries(() => axios.get('url'));
    expect(result.status).toBe(200);
    expect(result.data).toMatchObject({ mockData });
    expect(mockAxios.history.get.length).toBe(1);
  });

  it('should retry on failure and succeed on second try', async () => {
    const mockData = 'response';

    mockAxios.onGet('url').replyOnce(503);
    mockAxios.onGet('url').replyOnce(200, mockData);

    const result = await caller.callWithRetries(() => axios.get('url'));
    expect(result.data).toBe(mockData);
    expect(mockAxios.history.get.length).toBe(2);
  });

  it('should throw error after all retries failed', async () => {
    mockAxios.onGet('url').reply(503);

    await expect(
      caller.callWithRetries(() => axios.get('url'))
    ).rejects.toThrow('Call failed after all retries');
    expect(mockAxios.history.get.length).toBe(4);
  });
});
