import moment from 'moment';
import BaseDao from '../Daos/Base.Dao';

export default class BaseService {

  constructor(public tabalename: string) {
    this.baseDao = new BaseDao(tabalename);
  }
  /**
   * 基础Dao
   *
   * @private
   * @type {BaseDao}
   * @memberof BaseService
   */
  private baseDao: BaseDao;

  /**
   * 查询
   *
   * @param {string[]} [selectCondition]
   * @param {OriginObject} [queryCondition]
   * @returns
   * @memberof BaseService
   */
  public query(selectCondition?: string[], queryCondition?: OriginObject): Promise<any[]> {
    return this.baseDao.query(selectCondition, queryCondition);
  }

  /**
   * 分页查询
   *
   * @param {number} number 页数
   * @param {number} size 每页大小
   * @param {string[]} [selectCondition] 查询参数
   * @param {OriginObject} [queryCondition] 查询条件
   * @memberof BaseDao
   */
  public async queryForPage(number: number, size: number, selectCondition?: string[], queryCondition?: OriginObject) {
    const data = Promise.all([
      this.baseDao.queryForPaging(number, size, selectCondition, queryCondition),
      this.baseDao.count('id'),
    ]).then(([list, count]) => {
      return {
        data: {
          result: list,
          pageNumber: number,
          pageSize: size,
          totalCount: count,
        }
      }
    })
    return data;
  }

  /**
   * 新增
   *
   * @param {*} condition
   * @returns
   * @memberof BaseService
   */
  public add(condition: any) {
    condition.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
    condition.updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    return this.baseDao.add(condition);
  }

  /**
   * 求和
   *
   * @param {string} [countCondition] 需要count的参数
   * @param {OriginObject} [queryCondition]
   * @returns
   * @memberof BaseService
   */
  public count(countCondition?: string, queryCondition?: OriginObject) {
    return this.baseDao.count(countCondition, queryCondition);
  }

}