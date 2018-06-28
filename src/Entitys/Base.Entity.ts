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
  createTime: String = '';

  /**
   * 更新时间
   *
   * @type {Date}
   * @memberof BaseEntity
   */
  updateTime: String = '';
}