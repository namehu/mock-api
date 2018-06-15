import moment from 'moment';

export interface IBaseEntity {
  createTime: String;
  updateTime: String;
}

/**
 * 基类
 *
 * @export
 * @abstract
 * @class BaseEntity
 * @implements {IBaseEntity}
 */
export default abstract class BaseEntity implements IBaseEntity {
  
  constructor() {
    const d = moment().format('YYYY-MM-DD hh:mm:ss');
    this.createTime = d;
    this.updateTime = d;
  }

  /**
   * 创建时间
   *
   * @type {Date}
   * @memberof BaseEntity
   */
  createTime: String;

  /**
   * 更新时间
   *
   * @type {Date}
   * @memberof BaseEntity
   */
  updateTime: String;
}