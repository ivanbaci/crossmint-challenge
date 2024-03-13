import { ApiCaller } from './apiCaller';
import { ConcurrentApiCaller } from './concurrentApiCaller';
import { CrossmintApiClient } from './crossmintApiClient';
import { AstralObject, Cell } from './types/map.type';

export class AstralObjectsFactory {
  private concurrentApiCaller: ConcurrentApiCaller;

  constructor(private apiClient: CrossmintApiClient) {
    this.concurrentApiCaller = new ConcurrentApiCaller();
  }

  public async createAstralsObjects(cells: Cell[]): Promise<void> {
    const calls = cells.flatMap(cell => {
      switch (cell.object) {
        case AstralObject.POLYANET:
          return [() => this.apiClient.createPolyanet(cell.position)];
        case AstralObject.SOLOON:
          if (cell.color) {
            return [
              () =>
                this.apiClient.createSoloon(cell.position, cell.color as string)
            ];
          }
          return [];
        case AstralObject.COMETH:
          if (cell.direction) {
            return [
              () =>
                this.apiClient.createCometh(
                  cell.position,
                  cell.direction as string
                )
            ];
          }
          return [];
        default:
          return [];
      }
    });

    await this.concurrentApiCaller.makeConcurrentCalls(calls);
  }
}
