import BaseEntity from "./Base.Entity";

/**
 * 项目实体
 *
 * @export
 * @class ProjectEntity
 */
export default class ProjectEntity extends BaseEntity implements IBaseEntity {
  constructor() {
    super();
  }

  /**
   * 项目id
   *
   * @type {number}
   * @memberof ProjectEntity
   */
  public id: number = 0;

  /**
   * 项目名称
   *
   * @type {string}
   * @memberof ProjectEntity
   */
  public name: string = '';

  /**
   * 项目url
   *
   * @type {string}
   * @memberof ProjectEntity
   */
  public url: string = '';

  /**
   * 项目协议
   * @description 1-http; 2-https; 3-all
   * @type {number}
   * @memberof ProjectEntity
   */
  public protocol: number = 1;

  /**
   * 项目描述
   *
   * @type {object}
   * @memberof ProjectEntity
   */
  public description: object = {};

  public a: string = '1';

}