import { Request } from 'express';
import { isEmpty, forEach, merge } from 'lodash';
import BaseController from './BaseControllor';
import ProjectEntity from '../Entitys/ProjectEntity';
import { SUCCESS, NO_FOUND, PARAMS_MISS } from '../httpResponse';
import { entityMap } from './utils';
import moment from 'moment';

/**
 *  项目controller
 *  
 * @export
 * @class ProjectController
 * @extends {BaseController}
 */
export default class ProjectController extends BaseController {

  public constructor() {
    super('project');
  }

  /**
   * 获取项目列表
   *
   * @param {Request} request
   * @returns
   * @memberof ProjectController
   */
  public getProjectList(request: Request) {
    const data = this.query();
    return data;
  }

  /**
   * 项目是否存在
   *
   * @param {Request} request
   * @param {String} u 内部调用传入的url
   * @param {NextFunction} next
   * @memberof ProjectController
   */
  public isExit(request: Request, u?: string) {
    const data = request.query;
    const url = data.url || u || '';

    if (!url) {
      return NO_FOUND
    }

    const result = this.count({
      url,
    }).then((count) => {
      return merge({}, SUCCESS, {
        count,
        message: count ? '项目已经存在' : 'success'
      })
    });

    return result;
  }

  /**
   * 添加项目
   *
   * @param {Request} request
   * @returns
   * @memberof ProjectController
   */
  public async addProject(request: Request) {
    const params = request.body;

    const entity = new ProjectEntity();
    const map = entityMap<ProjectEntity>(params, entity);

    if (!map) {
      return PARAMS_MISS;
    }
    // 判断项目url是否存在
    const isExit = await this.isExit(request, map.url);
    if (isExit.code !== 200 || (<any>isExit).count >= 1) {
      return isExit;
    }

    console.log(map);
    // const result = await this.add(map);
    const result = { insertId: 1 };

    return merge({}, SUCCESS, {
      data: merge({}, map, { id: result.insertId })
    });
  }

  public async deleteProject(request: Request) {
    const id = request.query.id;
    if (!id) {
      return PARAMS_MISS
    }

    return id;
  }

}

