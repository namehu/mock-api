import BaseService from "./Base.Service";
import ProjectDao from "../Daos/Project.Dao";

/**
 * 项目service层
 *
 * @export
 * @class ProjectService
 * @extends {BaseService}
 */
export default class ProjectService extends BaseService {

  constructor() {
    super('project');
  }

  /**
   * 项目Dao
   *
   * @private
   * @type {ProjectDao}
   * @memberof ProjectService
   */
  private projectDao: ProjectDao = new ProjectDao();
  
  /**
   * 查询项目列表
   *
   * @param {number} number
   * @param {number} size
   * @returns
   * @memberof ProjectService
   */
  public queryList(number: number, size: number) {
    return this.projectDao.queryList(number, size)
  }
}