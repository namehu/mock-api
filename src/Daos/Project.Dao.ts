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
  public queryList(number: number, size: number, queryCondition: object) {
    return this.queryForPaging(number, size, undefined, Object.assign({
      status: [1, 2],
    }, queryCondition))
  }

  /**
   * 根据id删除项目
   *
   * @param {number} id
   * @returns
   * @memberof ProjectDao
   */
  public deleteById(id: number) {
    return this.delete({ id });
  }
}