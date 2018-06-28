import { isEmpty, isNumber, isNaN, includes } from 'lodash';

// const valid: any = {
//   number: {
//     type: [Number, Object],
//     require: false,
//   },
// }

let message: string = '';
// String Object Array Number

export function validParams(data: any, valid: any) {
  const validInfo: any = {
    valid: true,
    data: ''
  }

  function error(k: string): boolean {
    validInfo.valid = false;
    validInfo.data = message || `'${k}' parameter's type is not matching`;
    message = '';
    return false;
  }

  /**  TODO: 复杂对象还不支持oneof */
  function baseValid(dataValue: string, type: any, require?: boolean, oneOf?: any[]): boolean {
    let flag: boolean = true;
    const valueIsEmpty: boolean = isEmpty(dataValue);
    switch (type) {
      case Number:
        const nv = Number(dataValue);
        if (!valueIsEmpty && (!isNumber(nv) || isNaN(nv))) { // 类型是否匹配
          flag = false;
        } else if (valueIsEmpty && require) { // 是否必须而且为空
          flag = false;
          message = 'parameter is require';
        } else if (!valueIsEmpty && require && oneOf && oneOf.every((v) => (v !== Number(dataValue)))) { // 是否是oneof内之一
          flag = false;
          message = 'parameter is no suit';
        }
        break;
      case Array:
        if (!valueIsEmpty && !(/^\[.*\]$/.test(dataValue))) {
          flag = false;
        } else if (valueIsEmpty && require) {
          flag = false;
          message = 'parameter is require';
        } 
        
        break;
      case Object:
        if (!valueIsEmpty && !(/^{.*}$/).test(dataValue)) {
          flag = false;
        } else if (valueIsEmpty && require) {
          flag = false;
          message = 'parameter is require';
        }
        break;
      case String:
        if (require && valueIsEmpty) {
          flag = false;
        } else if (!valueIsEmpty && require && oneOf && !includes(oneOf, dataValue)) { // 是否是oneof内之一
          flag = false;
          message = 'parameter is no suit';
        } else {
          flag = true;
        }
        break;
      default:
        let sflag: boolean = false;
        if (type instanceof Array) {
          type.every(v => {
            if (baseValid(dataValue, v, require)) {
              sflag = true;
              return false;
            }
            return true;
          });
        } else if (type instanceof Object) {
          sflag = baseValid(dataValue, type.type, type.require, type.oneOf);
        }
        flag = sflag;
        break;
    }

    return flag;
  }

  Object.keys(valid).every((k: string) => {
    const type = valid[k];
    const dataValue: string = data[k];

    const va: boolean = baseValid(dataValue, type);
    if (!va) {
      return error(k);
    }

    return true;

  })

  return validInfo;

}
