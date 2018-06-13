import fs from 'fs';
import { each, includes, isEmpty } from 'lodash';
import path from 'path';

const jsonPath = path.join(__dirname, '../../json/');

/**
 * 读取json文件内容
 *
 * @param {string} name 文件名
 * @returns json文件内容
 */
export function readJson(name: string) {
  if (!name) {
    return {
      message: '文件名未传递',
    };
  }
  if (name.indexOf('.json') === -1) {
    name += '.json';
  }
  const filePath: string = path.join(jsonPath, name);
  const file = fs.readFileSync(filePath);
  return JSON.parse(file.toString());
}


/**
 * 比较两个url的query值是否一致
 *
 * @param {Request} req request请求
 * @param {Path} path  配置请求路径对象
 * @param {Location} Location  配置请求location对象
 * @returns {boolean} 是否一致
 */
export function isSameQuery(reqQuery: any, pathQuery: any): boolean {
  if (!pathQuery || isEmpty(pathQuery)) {
    return true;
  }
  if (isEmpty(reqQuery)) {
    return false;
  }
  let valid = true;
  const pathKeys = Object.keys(pathQuery);
  valid = pathKeys.every((k) => {
    const pathValue: string = String(pathQuery[k]);
    if (pathValue === '?') {
      return true;
    }
    if (reqQuery[k] === undefined) { // 参数值不存在
      return false;
    }
    if (pathValue.lastIndexOf('$') === -1) { // 参数值全等
      return pathValue === String(reqQuery[k]);
    } else if (pathValue.lastIndexOf('$') === 0) { // 参数值为配置值之中的一个
      const oneOfvalues: string[] = pathValue.slice(1).split(',');
      return includes(oneOfvalues, String(reqQuery[k]));
    } else if (pathValue.lastIndexOf('$') === 1) { // 参数值不限
      return true;
    }
    return false;
  });
  return valid;
}
