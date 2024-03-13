import axios, { AxiosResponse } from 'axios';

export class ApiCaller {
  constructor(private retries: number = 3, private backoffMs: number = 1000) {}

  public async callWithRetries(
    call: () => Promise<AxiosResponse>
  ): Promise<AxiosResponse> {
    for (let attempt = 0; attempt <= this.retries; attempt++) {
      try {
        return await call();
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const status: number = error.response.status;
          const message: string = error.response.data?.message || 'No message';
          if (status === 429 || (status >= 500 && status <= 599)) {
            // TODO: handle other errors
            console.error(`Attempt ${attempt} - Error ${status}: ${message}`);
            if (attempt < this.retries) {
              const waitTime: number = this.backoffMs * attempt;
              console.log(`Retrying in ${waitTime}ms...`);
              await new Promise(resolve => setTimeout(resolve, waitTime));
              continue;
            }
          }
        }
        break;
      }
    }
    throw new Error('Call failed after all retries'); // TODO: add error details
  }
}
