import { CrossmintApiClient } from './crossmintApiClient';
import { ConcurrentApiCaller } from './concurrentApiCaller';
import { AstralObject, Cell } from './types/map.type';

export class AstralObjectsFactory {
  private concurrentApiCaller: ConcurrentApiCaller;

  constructor(private apiClient: CrossmintApiClient) {
    this.concurrentApiCaller = new ConcurrentApiCaller();
  }

  public async createAstralObjects(cells: Cell[]): Promise<void> {
    const calls = cells.flatMap(cell => this.createCallForCell(cell));
    await this.concurrentApiCaller.makeConcurrentCalls(calls);
  }

  private createCallForCell(cell: Cell): Array<() => Promise<any>> {
    const actionMap: Record<AstralObject, (() => Promise<any>) | null> = {
      [AstralObject.SPACE]: null,
      [AstralObject.POLYANET]: () =>
        this.apiClient.createPolyanet(cell.position),
      [AstralObject.SOLOON]: cell.color
        ? () => this.apiClient.createSoloon(cell.position, cell.color as string)
        : null,
      [AstralObject.COMETH]: cell.direction
        ? () =>
            this.apiClient.createCometh(cell.position, cell.direction as string)
        : null
    };

    const action = actionMap[cell.object] ?? null;
    return action ? [action] : [];
  }
}
