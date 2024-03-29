import { SOLoonColors, comETHDirections } from '../constants/constants';
import { AstralObject, Cell } from '../types/map.type';

export class MapParser {
  public parseMap(rawMap: string[][]): Cell[] {
    return rawMap.flatMap((row, y) =>
      row.map((cell, x) => this.createCell(cell, x, y))
    );
  }

  private createCell(rawCell: string, x: number, y: number): Cell {
    let prefix, object;
    if (rawCell.includes('_')) {
      [prefix, object] = rawCell.split('_');
    } else {
      object = rawCell;
    }

    if (object && !(object in AstralObject)) {
      throw new Error(`Unknown AstralObject on goal map: ${object}`);
    }

    const cellObject = object
      ? (object as AstralObject)
      : (prefix as AstralObject);

    return {
      object: cellObject,
      position: { x, y },
      ...(cellObject === AstralObject.SOLOON &&
        prefix && {
          color: this.getColor(prefix)
        }),
      ...(cellObject === AstralObject.COMETH &&
        prefix && {
          direction: this.getDirection(prefix)
        })
    };
  }

  private getColor(prefix: string): string {
    if (!SOLoonColors.includes(prefix.toUpperCase())) {
      throw new Error(`Unknown SOLoon color: ${prefix}`);
    }
    return prefix.toLowerCase();
  }

  private getDirection(prefix: string): string {
    if (!comETHDirections.includes(prefix.toUpperCase())) {
      throw new Error(`Unknown comETH direction: ${prefix}`);
    }
    return prefix.toLowerCase();
  }
}
