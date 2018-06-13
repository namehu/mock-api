
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
  
  /**
   * 创建时间
   *
   * @type {Date}
   * @memberof BaseEntity
   */
  createTime: Date = new Date();

  /**
   * 更新时间
   *
   * @type {Date}
   * @memberof BaseEntity
   */
  updateTime: Date = new Date();
}