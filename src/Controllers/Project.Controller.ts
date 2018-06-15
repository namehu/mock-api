import { Request } from 'express';
import { isEmpty, forEach, merge, toNumber } from 'lodash';
import ProjectEntity from '../Entitys/ProjectEntity';
import { SUCCESS, NO_FOUND, PARAMS_MISS } from '../httpResponse';
import { entityMap } from './utils';
import ProjectService from '../Services/Project.Service';

/**
 *  项目controller
 *  
 * @export
 * @class ProjectController
 */
export default class ProjectController {

  private projectService: ProjectService = new ProjectService();

  /**
   * 获取项目列表
   *
   * @param {Request} request
   * @returns
   * @memberof ProjectController
   */
  public async getProjectList(request: Request) {
    const size = toNumber(request.query.pageSize);
    const number = toNumber(request.query.pageNumber);
    const data = await this.projectService.queryList(number, size);
    return merge({}, {
      code: 200,
      message: 'success',
      data,
    });
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

    const result = this.projectService.count(undefined, { url }).then((count) => {
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

    const result = await this.projectService.add(map);

    return merge({}, SUCCESS, {
      data: merge({}, map, { id: result.insertId })
    });
  }

  /**
   * 删除项目(硬删除)
   *
   * @param {Request} request
   * @returns
   * @memberof ProjectController
   */
  public async deleteById(request: Request): Promise<HttpResponseData> {
    const id: number = request.query.id;
    const data: HttpResponseData = await this.projectService.deleteById(id);
    return data;
  }


}

