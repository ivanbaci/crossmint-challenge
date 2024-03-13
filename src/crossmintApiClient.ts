import axios, { AxiosResponse } from 'axios';
import { ApiCaller } from './apiCaller';

export class CrossmintApiClient {
  private readonly baseUrl: string = `${process.env.BASE_API_URL}`;
  private readonly candidateId: string = `${process.env.CANDIDATE_ID}`;
  private apiCaller: ApiCaller = new ApiCaller();

  public async fetchGoalMap(): Promise<string[][]> {
    const response: AxiosResponse = await this.apiCaller.callWithRetries(() =>
      axios.get(`${this.baseUrl}/map/${this.candidateId}/goal`)
    );
    return response.data.goal;
  }

  public async createPolyanet(pos: { x: number; y: number }): Promise<void> {
    await this.apiCaller.callWithRetries(() =>
      axios.post(`${this.baseUrl}/polyanets`, {
        column: pos.x,
        row: pos.y,
        candidateId: this.candidateId
      })
    );
  }

  public async createSoloon(
    pos: { x: number; y: number },
    color: string
  ): Promise<void> {
    await this.apiCaller.callWithRetries(() =>
      axios.post(`${this.baseUrl}/soloons`, {
        column: pos.x,
        row: pos.y,
        candidateId: this.candidateId,
        color
      })
    );
  }
}
