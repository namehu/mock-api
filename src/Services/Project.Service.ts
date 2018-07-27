import moment from 'moment';
import BaseService from "./Base.Service";
import ProjectDao from "../Daos/Project.Dao";
import ProjectEntity from "../Entitys/Project.Entity";
import { toNumber, isEmpty } from 'lodash';

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
  public queryList(query: any) {
    const size: number = toNumber(query.pageSize);
    const number: number = toNumber(query.pageNumber);
    const o: any = {};
    if (!isEmpty(query.name)) o.name = query.name;
    if (!isEmpty(query.url)) o.url = query.url;
    if (!isEmpty(query.protocol)) o.protocol = Number(query.protocol);
    return this.projectDao.queryList(number, size, o);
  }

  /**
   * 项目Id
   *
   * @template T
   * @param {T} entity
   * @param {number} projectId
   * @returns {Promise<HttpResponseData>}
   * @memberof ProjectService
   */
  public async updateProject(entity: ProjectEntity): Promise<HttpResponseData> {
    let data: HttpResponseData = {
      code: 200,
      message: 'success',
    };

    const projectResult: ProjectEntity[] = await this.query(undefined, { id: entity.id });
    if (!projectResult[0]) {
      data.code = 403;
      data.message = '更新失败，项目不存在'
    } else {
      const PR = projectResult[0];
      PR.updateTime = moment().format('YYYY-MM-DD HH:ss:mm');
      try {
        delete entity.createTime;
        delete entity.updateTime;
      } catch (error) {
      }
      const updateData = Object.assign({}, PR, entity);
      const result = await this.projectDao.update(updateData, { id: entity.id });

      if (result.affectedRows > 0) {
        data.data = updateData;
      } else {
        data.message = '更新失败';
      }
    }

    return data;
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

  /**
   * 根据id查询项目信息
   *
   * @param {number} id
   * @returns {Promise<HttpResponseData>}
   * @memberof ProjectService
   */
  public async queryProjectById(id: number): Promise<HttpResponseData> {
    let data: HttpResponseData = {
      code: 200,
      message: 'success'
    };
    const result: any[] = await this.projectDao.queryById(id);
    if (result && result.length) {
      data.data = result[0];
    } else {
      data.code === 501;
      data.message === '项目不存在';
    }
    return data;
  }
}