import { isEmpty, forEach } from 'lodash';
import mysql from 'mysql';
import { WHERE, DOUBLE_QUESTION, EQUAL, IN, AND, QUESTION } from '../sql';

/**
 * 工具Dao
 *
 * @export
 * @class UtilsDao
 */
export default class UtilsDao {

  /**
   * 将驼峰写法转成数据库下表写法
   *
   * @protected
   * @param {*} name
   * @returns
   * @memberof UtilsDao
   */
  protected underscoreName(name: any) {
    return String(name).replace(/([A-Z]+)/g, (v) => `_${v.toLowerCase()}`);
  }

  /**
   * 将下划线转换为驼峰写法
   *
   * @protected
   * @param {*} name
   * @returns
   * @memberof UtilsDao
   */
  protected upperCaseName(name: any) {
    return String(name).replace(/(_[a-z])/g, (v) => `${v.slice(1).toUpperCase()}`);
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
        sqlFormaValue.push(this.underscoreName(k));
        sqlFormaValue.push(v);
        if (v instanceof Array) {
          sql += DOUBLE_QUESTION + IN + '(?)' + AND;
        } else {
          sql += DOUBLE_QUESTION + EQUAL + QUESTION + AND; // '?? = ? and'
        }
      })

      sql = sql.slice(0, sql.lastIndexOf(AND));
      sql = mysql.format(sql, sqlFormaValue);
    }
    return sql.trim();
  }

  /**
   * 将sql字段映射成为实体字段
   *
   * @protected
   * @param {*} result
   * @returns
   * @memberof UtilsDao
   */
  protected convertSqlToEntity(result: any) {
    let data: any = {};
    if (result instanceof Array) {
      data = result.map((v) => {
        return this.convertSqlToEntity(v);
      })
    } else if (result instanceof Object) {
      forEach(result, (v, k) => {
        data[this.upperCaseName(k)] = v;
      })
    } else {
      data = result;
    }

    return data;
  }

}