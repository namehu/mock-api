import { Request } from 'express';
import { isEmpty, forEach } from 'lodash';
import BaseController from './BaseControllor';
import ProjectEntity from '../Entitys/ProjectEntity';
import { SUCCESS, NO_FOUND, PARAMS_MISS } from '../httpResponse';
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
   * @param {Response} respose
   * @param {NextFunction} next
   * @memberof ProjectController
   */
  public isExit(request: Request) {
    const data = request.query;
    const url = data.url || '';

    if (!url) {
      return NO_FOUND
    }

    const result = this.count({
      url,
    }).then((count) => {
      return Object.assign(SUCCESS, {
        count,
        message: count ? '项目已经存在' : 'success'
      })
    });

    return result;
  }

  public addProject(request: Request) {
    const body = request.body;

    if (isEmpty(body)) {
      return PARAMS_MISS;
    }

    const data = dataValidAndMap(body, ProjectEntity)

    return data;
  }

}


function dataValidAndMap(data: any, entity: Entity) {
  // 实体为空则不做验证，返回空Map
  if (isEmpty(entity)) return {};
  // 数据为空。则验证不通过
  if (isEmpty(data)) return false;

  const o: any = {};
  let flag: boolean = false;
  forEach(entity, (v, k) => {
    if (flag) return;
    const value = data[k];
    if (typeof (v) === 'object') {
      if (v.require && !value) {
        return flag = true;
      }

      if (v.type === 'string') {
        o[k] = String(value || v.default || '');
      } else if (v.type === 'number') {
        o[k] = Number(value || v.default || 0);
      } else if (v.type === 'boolean') {
        o[k] = Boolean(value || v.default || false);

      } else if (v.type === 'object') {
        if (typeof value === 'object' || !v.require) {
          o[k] = value || Object(v.default || {});
        } else {
          return flag = true;
        }
      } else {
        o[k] = undefined
      }

    } else {
      if (v === 'string') {
        o[k] = String(value || '');
      } else if (v === 'number') {
        o[k] = Number(value || 0);
      } else if (v === 'object') {
        o[k] = Object(value || {})
      } else if (v === 'boolean') {
        o[k] = Boolean(v || false);
      } else {
        o[k] = undefined
      }
    }
  });
  if (flag) return false;

  return o;
}