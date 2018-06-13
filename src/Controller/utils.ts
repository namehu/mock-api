import { isEmpty, forEach } from 'lodash';

// 将驼峰写法转成数据库下表写法
export function underscoreName(name: any) {
  const na = String(name).replace(/([A-Z]+)/g, (v) => `_${v.toLowerCase()}`);
  return na;
}

export function entityMap<T>(body: any, entity: T): T | null {
  if (isEmpty(entity) || isEmpty(body)) return null;

  const o: any = {};

  forEach(entity, (v, k) => {
    console.log(k, v);
    const bk = body[k];
    switch (typeof v) {
      case 'number':
        o[k] = Number(bk || 0);
        if (o[k] === NaN) {
          o[k] = 0;
        }
        break;
      case 'boolean':
        o[k] = Boolean(bk || false);
        break;
      case 'function':
        o[k] = Function(bk || (() => { }));
        break;
      case 'undefined':
        o[k] = undefined;
        break;
      case 'string':
        o[k] = String(bk || '');
        break;
      default:
        if (v instanceof Array) {
          o[k] = bk instanceof Array ? bk : [];
        } else if (v instanceof Date) {
          o[k] = new Date(bk || null)
        } else {
          o[k] = bk;
        }
        break;
    }

  })

  return <T>o;
}


export function validAndMap(data: any, entity: Entity) {
  // 实体为空则不做验证，返回空Map
  if (isEmpty(entity)) return {};
  // 数据为空。则验证不通过
  if (isEmpty(data)) return false;

  const o: any = {};
  let flag: boolean = false;
  forEach(entity, (v, k) => {

    if (v === null) {
      return o[k] = v;
    }
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