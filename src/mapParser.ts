import { AstralObject, Cell } from './types/map.type';

export class MapParser {
  public parseMap(rawMap: string[][]): Cell[] {
    return rawMap.flatMap((row, y) =>
      row.map((cell, x) => this.createCell(cell, x, y))
    );
  }

  private createCell(rawCell: string, x: number, y: number): Cell {
    const [prefix, object] = rawCell.split('_');

    if (object && !(object in AstralObject)) {
      throw new Error(`Unknown AstralObject on goal map: ${object}`);
    }

    const cellObject = object
      ? (object as AstralObject)
      : (prefix as AstralObject);

    return {
      object: cellObject,
      position: { x, y },
      ...(cellObject === AstralObject.SOLOON && {
        color: this.getColor(prefix)
      }),
      ...(cellObject === AstralObject.COMETH && {
        direction: this.getDirection(prefix)
      })
    };
  }

  private getColor(prefix: string): string {
    return prefix;
  }

  private getDirection(prefix: string): string {
    return prefix;
  }
}
