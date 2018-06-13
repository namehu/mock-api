import mysql from 'mysql';
import { forEach, isEmpty } from 'lodash';
import { mysqlConfig } from '../config';
import { underscoreName } from './utils';
import { FROM, SELECT, WHERE, STAR, DOUBLE_QUESTION, QUESTION, EQUAL, AND, COUNT_ALL, INSERT, INTO, VALUES } from '../sql';
import { resolve } from 'path';

const pool = mysql.createPool(Object.assign(mysqlConfig, {
  connectionLimit: 100,
}));

/**
 * 基础controller.包含数据库的基础增删改查
 *
 * @export
 * @class BaseController
 */
export default class BaseController {

  protected constructor(public tableName: string) { }

  public poolQuery(sql: string) {
    return new Promise((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err) { reject(err); } else if (result) { resolve(result); }
      });
    });
  }

  /**
   * 新增
   *
   * @param {*} condition 数据键值对
   * @returns
   * @memberof BaseController
   */
  public async add(condition: any) {
    let sql = `${INSERT + INTO + this.tableName} (${DOUBLE_QUESTION}) ${VALUES} (${QUESTION})`
    const result = await new Promise((resolve, reject) => {
      const sqlKey: string[] = [];
      const sqlValue: string[] = [];
      Object.keys(condition).forEach((k) => {
        sqlKey.push(underscoreName(k));
        sqlValue.push(condition[k]);
      });

      sql = mysql.format(sql, [sqlKey, sqlValue]);
      // 查询
      pool.query(sql, (err, result) => {
        if (err) { reject(err); } else if (result) { resolve(result); }
      });
    });

    return result;
  }

  /**
   * 查询
   *
   * @param {string[]} [selectCondition] 查询参数 可选，数组
   * @param {{ [name: string]: any }} [queryCondition] 查询条件
   * @returns
   * @memberof BaseController
   */
  public async query(selectCondition?: string[], queryCondition?: { [name: string]: any }) {
    const SC = selectCondition && selectCondition.length ? selectCondition.join(',') : STAR;
    let sql = SELECT + SC + FROM + this.tableName;

    sql = this.spliceWhere(sql, queryCondition);

    const data = await new Promise((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err) { reject(err); } else if (result) { resolve(result); }
      });
    })

    return data;
  }

  /**
   * 求和
   *
   * @param {{ [name: string]: any }} [queryCondition]
   * @returns
   * @memberof BaseController
   */
  public async count(queryCondition?: { [name: string]: any }) {
    let sql = SELECT + COUNT_ALL + FROM + this.tableName;

    sql = this.spliceWhere(sql, queryCondition);

    const result =  await new Promise<any[]>((resolve, reject) => {
      pool.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else if (result) {
          resolve(result);
        }
      });
    })

    return result[0][COUNT_ALL.trim()];
  }

  /**
   * 拼接sql语句中的where部分
   *
   * @protected
   * @param {string} sql sql语句
   * @param {*} [queryCondition] where条件
   * @returns string sql
   * @memberof BaseController
   */
  protected spliceWhere(sql: string, queryCondition?: any) {
    if (queryCondition && !isEmpty(queryCondition)) {
      sql += WHERE;
      const sqlFormaValue: any[] = [];
      forEach(queryCondition, (v, k) => {
        if (!v) { return };
        sqlFormaValue.push(underscoreName(k));
        sqlFormaValue.push(v);
        sql += DOUBLE_QUESTION + EQUAL + QUESTION + AND; // '?? = ? and'
      })

      sql = sql.slice(0, sql.lastIndexOf(AND));
      sql = mysql.format(sql, sqlFormaValue)
    }
    return sql.trim();
  }
}



