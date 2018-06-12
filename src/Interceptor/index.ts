import express, { NextFunction, Request, Response } from 'express';
import { isSameQuery } from '../utils';
import location from './location';

export interface Location {
  url: string;
  protocol: string;
  path: Path[];
  version: string;
  description?: string;
}

export interface Path {
  name: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'ALL';
  query?: object;
  body?: object;
  controller: Function;
  description?: string;
}

/**
 * express app 监听请求
 * @param app Express 实例
 * @param env 环境变量 dev | uat1 | mmall
 */
export default (app: express.Express, env?: string) => {
  const locations: Location[] = [location]
  locations.forEach(location => {

    const locationUrl: string = location.url;

    location.path.forEach(path => {
      const pathName = path.name.indexOf('/') === 0 ? `/v${location.version + path.name}` : `/v${location.version}/${path.name}`;

      (<any>app)[(path.method || 'GET').toLowerCase()](pathName, (req: Request, res: Response, next: NextFunction) => {

        let reqFullUrl: string = `${req.protocol}://${req.hostname}${req.path}`;
        let pathUrl = location.protocol === '//' ?
          `${location.protocol}:${locationUrl}` :
          `${location.protocol}://${locationUrl + pathName}`;
        // 域名路径不匹配直接返回下一个中间件
        if (reqFullUrl !== pathUrl) return next();
        // 判断query 是否一致
        if (!isSameQuery(req.query, path.query)) return next();
        // POST 请求下判断参数是否一致
        if (req.method === 'POST' && !isSameQuery(req.body, path.body)) return next();

        Promise.resolve(path.controller(req)).then((data) => {
          if (req.query.callback) {
            res.jsonp(data);
          } else {
            res.json(data);
          }
        });
      });
    });

  });
}

// 没有匹配数据时
export function notFound(req: Request, res: Response, next: NextFunction) {
  res.json({
    code: 200,
    urlParse: {
      method: req.method,
      protocol: req.protocol,
      host: req.hostname,
      path: req.path,
      query: req.query,
      params: req.params || null,
      body: req.body,
    },
    message: '未匹配到请求，请检查url是否正确'
  });
  next();
}