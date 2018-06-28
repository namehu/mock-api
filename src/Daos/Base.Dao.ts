import mysql from 'mysql';
import { forEach, isEmpty } from 'lodash';
import { mysqlConfig } from '../config';
// import { underscoreName } from './utils';
import UtilsDao from './Utils.Dao';
import {
  FROM,
  SELECT,
  WHERE,
  STAR,
  DOUBLE_QUESTION,
  QUESTION,
  EQUAL,
  AND,
  COUNT_ALL,
  INSERT,
  INTO,
  VALUES,
  LIMIT,
  OFFSET,
  ORDER_BY,
  DESC,
  IN,
  DELETE,
  UPDATE,
  SET,
} from '../sql';

const pool = mysql.createPool(Object.assign(mysqlConfig, {
  connectionLimit: 100,
  dateStrings: true,
}));

/**
 * 基础dao.包含数据库的基础增删改查
 *
 * @export
 * @class BaseDao
 */
export default class BaseDao extends UtilsDao {

  public constructor(public tableName: string = '') { 
    super();
  }

  /**
   * 新增
   *
   * @param {*} condition 数据键值对
   * @returns
   * @memberof BaseController
   */
  public async add(condition: any): Promise<MysqlResult> {
    if (condition.id !== undefined) {
     try {
       delete condition.id;
     } catch (error) {} 
    }
    let sql = `${INSERT + INTO + this.tableName} (${DOUBLE_QUESTION}) ${VALUES} (${QUESTION})`;
    const result = await new Promise((resolve, reject) => {
      const sqlKey: string[] = [];
      const sqlValue: string[] = [];
      Object.keys(condition).forEach((k) => {
        sqlKey.push(this.underscoreName(k));
        sqlValue.push(condition[k]);
      });

      sql = mysql.format(sql, [sqlKey, sqlValue]);
      // 查询
      pool.query(sql, (err, result) => {
        if (err) { reject(err); } else if (result) { resolve(result); }
      });
    });

    return result as MysqlResult;
  }

  /**
   * 查询
   *
   * @param {string[]} [selectCondition] 查询参数 可选，数组
   * @param {{ [name: string]: any }} [queryCondition] 查询条件
   * @returns
   * @memberof BaseController
   */
  public async query(selectCondition?: string[], queryCondition?: OriginObject): Promise<any[]> {
    const SC = selectCondition && selectCondition.length ? selectCondition.join(',') : STAR;
    let sql = SELECT + SC + FROM + this.tableName;

    sql = this.spliceWhere(sql, queryCondition);

    const data = await new Promise((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err) { reject(err); } else if (result) { resolve(result); }
      });
    })
    return this.convertSqlToEntity(data) as any[];
  }

  /**
   * 分页查询
   *
   * @param {number} number 页数
   * @param {number} size 每页大小
   * @param {string[]} [selectCondition] 查询参数
   * @param {OriginObject} [queryCondition] 查询条件
   * @memberof BaseDao
   */
  public async queryForPaging(number: number, size: number, selectCondition?: string[], queryCondition?: OriginObject) {
    const SC = selectCondition && selectCondition.length ? selectCondition.join(',') : STAR;
    let sql = SELECT + SC + FROM + this.tableName;
    sql = this.spliceWhere(sql, queryCondition);

    sql += ORDER_BY + 'create_time' + DESC;
    sql += LIMIT + size + OFFSET + (number - 1);
    const data = await new Promise((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err) { reject(err); } else if (result) { resolve(result); }
      });
    })
    
    return this.convertSqlToEntity(data);
  }

  /**
   * 根据条件删除
   *
   * @param {OriginObject} condition
   * @returns
   * @memberof BaseDao
   */
  public async delete(condition: OriginObject): Promise<MysqlResult> {
    let sql = DELETE + FROM + this.tableName;

    sql = this.spliceWhere(sql, condition);

    const data: MysqlResult = await new Promise<MysqlResult>((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err) { reject(err); } else if (result) { resolve(result); }
      });
    })

    return data;
  }

  /**
   * update语句
   *
   * @template T
   * @param {T} updateEntity
   * @param {OriginObject} [queryCondition]
   * @returns {Promise<{}>}
   * @memberof BaseDao
   */
  public async update<T>(updateEntity: T, queryCondition?: OriginObject): Promise<MysqlResult> {
    let sql = UPDATE + this.tableName;
    sql = this.spliceUpdate(sql, updateEntity);
    sql = this.spliceWhere(sql, queryCondition);

    const result: MysqlResult = await new Promise<MysqlResult>((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err) { reject(err); } else if (result) { resolve(result); }
      });
    })

    return result;
  }

  /**
   * 求和
   *
   * @param {string} [countCondition] 需要count的参数
   * @param {OriginObject} [queryCondition] 查询参数
   * @returns
   * @memberof BaseController
   */
  public async count(countCondition?: string, queryCondition?: OriginObject) {
    const CC = `COUNT(${countCondition || STAR})`;
    let sql = SELECT + CC + FROM + this.tableName;

    sql = this.spliceWhere(sql, queryCondition);
    const result = await new Promise<any[]>((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(result);
        }
      });
    })
    return result[0][CC.trim()];
  }

  
}



