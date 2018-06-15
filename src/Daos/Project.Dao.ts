import BaseDao from "./Base.Dao";

/**
 * 项目Dao
 *
 * @export
 * @class ProjectDao
 * @extends {BaseDao}
 */
export default class ProjectDao extends BaseDao {

  constructor() {
    super('project');
  }

  /**
   * 查询项目列表
   *
   * @param {number} number
   * @param {number} size
   * @returns
   * @memberof ProjectDao
   */
  public queryList(number: number, size: number) {
    return this.queryForPaging(number, size, undefined, {
      status: [1, 2],
    })
  }
}