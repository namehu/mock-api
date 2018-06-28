declare type TY = 'string' | 'number' | 'boolean' | 'object' | null;


declare interface IBaseEntity {
  createTime: String;
  updateTime: String;
}


declare interface Entity {
  [name: string]: {
    type: TY,
    require?: boolean,
    default?: any;
  } | TY;
}