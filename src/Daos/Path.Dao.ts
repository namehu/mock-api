import BaseDao from "./Base.Dao";

/**
 * 路径Dao
 *
 * @export
 * @class PathDao
 * @extends {BaseDao}
 */
export default class PathDao extends BaseDao {

  constructor() {
    super('path');
  }

  /**
   * 查询路径列表
   *
   * @param {number} number
   * @param {number} size
   * @returns
   * @memberof ProjectDao
   */
  public queryList(number: number, size: number) {
    return this.queryForPaging(number, size);
  }

  /**
   * 根据id删除路径
   *
   * @param {number} id
   * @returns
   * @memberof ProjectDao
   */
  public deleteById(id: number) {
    return this.delete({ id });
  }
  
}