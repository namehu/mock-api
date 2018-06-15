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

  /**
   * 根据id删除项目
   *
   * @param {number} id
   * @returns
   * @memberof ProjectService
   */
  public async deleteById(id: number): Promise<HttpResponseData> {
    let data: HttpResponseData = {
      code: 200,
      message: '删除失败'
    };
    const result = await this.projectDao.deleteById(id);
    if (result) {
      if (result.affectedRows > 0) {
        data = {
          code: 200,
          message: 'success',
          data: {
            id,
          },
        };
      } else {
        data = {
          code: 200,
          message: '删除失败，项目不存在'
        }
      }
    }
    return data
  }
}