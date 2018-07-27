import express, { NextFunction, Request, Response } from 'express';
import url from 'url';
import { isSameQuery } from '../utils';
import { validParams } from './uitils';
import LO from './location';

export interface Location {
  url: string;
  protocol: string;
  path?: Path[];
  PathGroup?: PathGroup[];
  version: string;
  description?: string;
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'PATCH' | 'ALL';

export interface Path {
  name: string;
  method?: Method;
  query?: object;
  body?: object;
  handler: any;
  description?: string;
}

export interface PathGroup {
  controller: any;
  path: Path[];
  description?: string;
}

let message: string = '';

// 绑定location 监听
function bindPath(paths: Path[], location: Location, app: express.Express, controller?: any) {
  const locationUrl: string = location.url;

  paths.forEach((path) => {
    const pathName = path.name.indexOf('/') === 0 ?
      `/v${location.version + path.name}` :
      `/v${location.version}/${path.name}`;

    (app as any)[(path.method || 'GET').toLowerCase()](pathName,
      (req: Request, res: Response, next: NextFunction) => {

        const reqFullUrl: string = `${req.protocol}://${req.hostname}`;
        const pathUrl: string = location.protocol === '//' ?
          `${location.protocol}:${locationUrl}` :
          `${location.protocol}://${locationUrl}`;

        // 域名路径不匹配直接返回下一个中间件
        if (reqFullUrl !== pathUrl) { return next(); }

        // 验证query参数
        const validQuery = validParams(req.query, path.query);
        if (!validQuery.valid) {
          message = validQuery.data;
          return next();
        }
        // query 是否一致
        // if (!isSameQuery(req.query, path.query)) { return next(); }

        // POST 请求下判断参数是否一致
        if (req.method === 'POST') {
          const validBody = validParams(req.body, path.body);
          if (!validBody.valid) {
            message = validBody.data;
            return next();
          }
        }

        const handler = controller ? controller[path.handler](req, res, next) : path.handler(req, res, next);
        Promise.resolve(handler).then((data) => {
          if (req.query.callback) {
            res.jsonp(data);
          } else {
            res.json(data);
          }
        });
      });
  });
}


/**
 * express app 监听请求
 * @param app Express 实例
 */
export default (app: express.Express) => {
  const locations: Location[] = [LO];
  locations.forEach((location) => {

    const locationUrl: string = location.url;

    if (location.path && location.path.length) {
      bindPath(location.path, location, app);
    }
    if (location.PathGroup && location.PathGroup.length) {
      location.PathGroup.forEach(group => {
        bindPath(group.path, location, app, group.controller);
      })
    }


  });
};

// 没有匹配数据时
export function notFound(req: Request, res: Response) {
  res.json({
    code: 501,
    urlParse: {
      method: req.method,
      protocol: req.protocol,
      host: req.hostname,
      path: req.path,
      query: req.query,
      params: req.params || null,
      body: req.body,
    },
    message: message || '未匹配到请求，请检查url是否正确',
  });

  message = '';
}
