import { isEmpty, forEach } from 'lodash';

// 数据与实体进行转换
export function entityMap<T>(body: any, entity: T): T {
  if (isEmpty(entity) || isEmpty(body)) return <T>{};

  const o: any = {};

  forEach(entity as Object, (v: any, k: string) => {
    // console.log(k, v);
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
        o[k] = String(bk || v || '');
        break;
      default:
        if (v instanceof Array) {
          o[k] = bk instanceof Array ? bk : [];
        } else if (v instanceof Date) {
          o[k] = bk ? new Date(bk) : v ? v : new Date();
        } else {
          o[k] = bk;
        }
        break;
    }

  })

  return <T>o;
}

