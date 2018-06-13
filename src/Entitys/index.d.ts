declare type TY = 'string' | 'number' | 'boolean' | 'object' | null;

declare interface Entity {
  [name: string]: {
    type: TY,
    require?: boolean,
    default?: any;
  } | TY;
}