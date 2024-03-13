import axios, { AxiosResponse } from 'axios';
import { ApiCaller } from './apiCaller';

export class CrossmintApiClient {
  private readonly baseUrl: string = `${process.env.BASE_API_URL}`;
  private apiCaller: ApiCaller = new ApiCaller();

  public async fetchGoalMap(): Promise<string[][]> {
    const response: AxiosResponse = await this.apiCaller.callWithRetries(() =>
      axios.get(`${this.baseUrl}/map/${process.env.CANDIDATE_ID}/goal`)
    );
    return response.data.goal;
  }
}
