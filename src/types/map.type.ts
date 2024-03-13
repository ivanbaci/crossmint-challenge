export enum AstralObject {
  SPACE = 'SPACE',
  POLYANET = 'POLYANET',
  SOLOON = 'SOLOON',
  COMETH = 'COMETH'
}

export type Cell = {
  object: AstralObject;
  position: {
    x: number;
    y: number;
  };
  color?: string;
  direction?: string;
};
