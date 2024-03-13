import axios from 'axios';

export class ConcurrentApiCaller {
  private currentConcurrency: number;
  private queue: Array<() => Promise<any>>;
  private activeCalls: number;
  private sucessfulConsecutiveCalls: number = 0;
  private failedAttempts: number = 0;

  constructor(
    private maxConcurrency: number = 5,
    private increaseRate: number = 1,
    private decreaseRate: number = 1,
    private initialConcurrency: number = 2,
    private baseDelay: number = 1000,
    private maxDelay: number = 30000
  ) {
    this.currentConcurrency = initialConcurrency;
    this.queue = [];
    this.activeCalls = 0;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async processQueue(): Promise<void> {
    while (
      this.queue.length > 0 &&
      this.activeCalls < this.currentConcurrency
    ) {
      const call = this.queue.shift()!;
      this.activeCalls++;
      console.log(`New call entry. Active calls: ${this.activeCalls}`);
      try {
        await call();
        this.sucessfulConsecutiveCalls++;
        console.log(
          `Call successful. Consecutive calls: ${this.sucessfulConsecutiveCalls}`
        );
        if (this.sucessfulConsecutiveCalls % this.initialConcurrency === 0) {
          this.failedAttempts = 0;
          this.adjustConcurrency(true);
        }
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 429
        ) {
          this.sucessfulConsecutiveCalls = 0;
          this.adjustConcurrency(false);
          this.failedAttempts++;
          const backoffDelay = this.calculateExponentialBackoff(
            this.failedAttempts
          );
          console.log(`Rate limit exceeded. Retrying in ${backoffDelay}ms...`);
          await this.delay(backoffDelay);
          this.queue.unshift(call);
        } else console.error('Error calling API:', error);
      } finally {
        this.activeCalls--;
        this.processQueue();
      }
    }
  }

  public addCall(call: () => Promise<any>) {
    this.queue.push(call);
    this.processQueue();
  }

  async makeConcurrentCalls(calls: Array<() => Promise<any>>): Promise<void> {
    for (const call of calls) {
      this.addCall(call);
    }

    while (this.activeCalls > 0 || this.queue.length > 0) {
      await this.delay(100);
    }
  }

  private adjustConcurrency(success: boolean) {
    console.log(`Adjusting concurrency. Success: ${success}`);
    if (success) {
      this.currentConcurrency = Math.min(
        this.currentConcurrency + this.increaseRate,
        this.maxConcurrency
      );
    } else {
      this.currentConcurrency = Math.min(
        this.initialConcurrency,
        this.activeCalls - this.decreaseRate
      );
      if (this.currentConcurrency < 1) {
        this.currentConcurrency = 1;
      }
    }
    console.log(`Current concurrency updated: ${this.currentConcurrency}`);
  }

  private calculateExponentialBackoff(failedAttempts: number): number {
    console.log(`Calculating backoff for failed attempt ${failedAttempts}`);
    return Math.min(
      this.baseDelay * Math.pow(2, failedAttempts),
      this.maxDelay
    );
  }
}
