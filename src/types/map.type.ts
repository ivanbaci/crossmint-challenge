export enum Cell {
  SPACE = 'SPACE',
  POLYANET = 'POLYANET'
}

export type Row = {
  cells: Cell[];
};

export type Map = {
  rows: Row[];
};
