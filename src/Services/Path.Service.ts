import BaseService from "./Base.Service";
import PathDao from "../Daos/Path.Dao";
import PathEntity from "../Entitys/Path.Entity";

/**
 * 路径service层
 *
 * @export
 * @class PathService
 * @extends {BaseService}
 */
export default class PathService extends BaseService {

  constructor() {
    super('path');
  }
  
  /**
   * Path Dao
   *
   * @private
   * @type {pathDao}
   */
  private pathDao: PathDao = new PathDao();


  public async addPath(entity: PathEntity): Promise<any> {

    const result = await this.add(entity);
    return entity;
  }

}