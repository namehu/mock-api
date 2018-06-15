
declare interface OriginObject {
  [name: string]: any
}

// 数据库操作结果
declare interface MysqlResult {
  fieldCount: number;
  affectedRows: number;
  insertId: number;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean,
  changedRows: number
}


declare interface HttpResponseData {
  code: number;
  message?: string;
  data?: string | any[] | OriginObject
}