
export interface IBaseEntity {
  createTime: Date;
  updateTime: Date;
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
  
  constructor(date: Date) {
    const d = new Date();
    this.createTime = date;
    this.updateTime = date;
  }

  /**
   * 创建时间
   *
   * @type {Date}
   * @memberof BaseEntity
   */
  createTime: Date;

  /**
   * 更新时间
   *
   * @type {Date}
   * @memberof BaseEntity
   */
  updateTime: Date;
}