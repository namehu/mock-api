import BaseEntity from "./Base.Entity";

/**
 * 路径实体
 *
 * @export
 * @class ProjectEntity
 */
export default class ProjectEntity extends BaseEntity implements IBaseEntity {
  constructor() {
    super();
  }

  /**
   * path id
   *
   * @type {number}
   * @memberof ProjectEntity
   */
  public id: number = 0;

  /**
   * 路径名
   *
   * @type {string}
   * @memberof ProjectEntity
   */
  public name: string = '';


  /**
   * 方法
   * 
   * @description 1-get; 2-post
   * @type {number}
   * @memberof ProjectEntity
   */
  public method: number = 1;

  /**
   * 查询参数
   *
   * @type {string}
   * @memberof ProjectEntity
   */
  public query: string = '';

  /**
   * body数据
   *
   * @type {string}
   * @memberof ProjectEntity
   */
  public body: string = '';

  /**
   * json 名称
   *
   * @type {string}
   * @memberof ProjectEntity
   */
  public json: string = '';

  /**
   * 描述
   *
   * @type {string}
   * @memberof ProjectEntity
   */
  public description: string = '';

  /**
   * 版本
   *
   * @type {string}
   * @memberof ProjectEntity
   */
  public version: string = '';

  /**
   * 项目id
   *
   * @type {number}
   * @memberof ProjectEntity
   */
  public projectId: number = 0;

}