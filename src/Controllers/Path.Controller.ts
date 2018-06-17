import { Request } from 'express';
import PathService from '../Services/Path.Service';
import { entityMap } from './utils';
import PathEntity from '../Entitys/Path.Entity';

/**
 *  项目controller
 *  
 * @export
 * @class ProjectController
 */
export default class PathController {

  /**
   * 路径 service
   *
   * @private
   * @type {PathService}
   * @memberof PathController
   */
  private pathService: PathService = new PathService();

  
  /**
   * 添加路径
   *
   * @param {Request} request
   * @returns {Promise<HttpResponseData>}
   * @memberof PathController
   */
  public async addPath(request: Request): Promise<HttpResponseData> {

    const body = request.body;
    const map: PathEntity = entityMap(body, new PathEntity())

    const result = await this.pathService.addPath(map);

    const data: HttpResponseData = {
      code: 200,
      data: result,
      message: 'success',
    };

    return data;
  }

}

