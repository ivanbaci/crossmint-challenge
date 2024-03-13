import { MapParser } from '../../src/parsers/mapParser';
import { AstralObject } from '../../src/types/map.type';
import { SOLoonColors, comETHDirections } from '../../src/constants/constants';

describe('MapParser', () => {
  let mapParser: MapParser;

  beforeEach(() => {
    mapParser = new MapParser();
  });

  it('should parse a simple map correctly', () => {
    const rawMap = [
      ['SPACE', 'POLYANET'],
      ['RED_SOLOON', 'UP_COMETH']
    ];
    const expected = [
      { object: AstralObject.SPACE, position: { x: 0, y: 0 } },
      { object: AstralObject.POLYANET, position: { x: 1, y: 0 } },
      { object: AstralObject.SOLOON, position: { x: 0, y: 1 }, color: 'red' },
      { object: AstralObject.COMETH, position: { x: 1, y: 1 }, direction: 'up' }
    ];

    const result = mapParser.parseMap(rawMap);

    expect(result).toEqual(expected);
  });

  it('throws an error for unknown AstralObject', () => {
    const rawMapWithUnknownObject = [['SPACE', 'UNKNOWNOBJECT']];
    expect(() => mapParser.parseMap(rawMapWithUnknownObject)).toThrow(
      'Unknown AstralObject on goal map: UNKNOWNOBJECT'
    );
  });

  it('throws an error for unknown SOLoon color', () => {
    const rawMap = [['GREY_SOLOON']];
    expect(() => mapParser.parseMap(rawMap)).toThrow(
      'Unknown SOLoon color: GREY'
    );
  });

  it('throws an error for unknown comETH direction', () => {
    const rawMap = [['WRONGDIRECTION_COMETH']];
    expect(() => mapParser.parseMap(rawMap)).toThrow(
      'Unknown comETH direction: WRONGDIRECTION'
    );
  });

  it('parses SOLoon and comETH with valid prefixes correctly', () => {
    const rawMap = [
      [SOLoonColors[0] + '_SOLOON', comETHDirections[0] + '_COMETH']
    ];
    const expected = [
      {
        object: AstralObject.SOLOON,
        position: { x: 0, y: 0 },
        color: SOLoonColors[0].toLowerCase()
      },
      {
        object: AstralObject.COMETH,
        position: { x: 1, y: 0 },
        direction: comETHDirections[0].toLowerCase()
      }
    ];

    const result = mapParser.parseMap(rawMap);

    expect(result).toEqual(expected);
  });
});
