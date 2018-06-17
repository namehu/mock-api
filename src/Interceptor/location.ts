import { Location } from './index';
import ProjectController from '../Controllers/Project.Controller';
import PathController from '../Controllers/Path.Controller';

const c = new ProjectController();
const pathController = new PathController();

const location: Location = {
  protocol: 'http',
  url: 'localhost',
  description: 'mock-api接口',
  PathGroup: [
    {
      controller: c,
      path: [
        {
          name: 'api/projects',
          query: {
            pageNumber: '$$',
            pageSize: '$$',
          },
          handler: 'getProjectList',
          description: '项目列表',
        },
        {
          name: 'api/project',
          handler: 'isExit',
          query: {
            url: '$$',
          },
          description: '项目是否有效',
        },
        {
          name: 'api/project',
          method: 'POST',
          handler: 'addProject',
          body: {
            name: '$$',
            url: '$$',
            description: '?',
            protocol: '$$',
          },
          description: '新增项目',
        },
        {
          name: '/api/project/:id',
          method: 'PATCH',
          body: {
            name: '$$',
            url: '$$',
            description: '?',
            protocol: '$$',
          },
          handler: 'update',
          description: '更新项目信息',
        },
        {
          name: 'api/project/:id',
          method: 'DELETE',
          handler: 'deleteById',
          description: '根据id删除项目'
        }
      ]
    }, 
    {
      controller: pathController,
      path: [
        {
          name: 'api/path',
          method: 'POST',
          body: {
            name: '$$',
            method: '$$',
            query: '?',
            body: '?',
            json: '?',
            description: '?',
            projectId: '$$',
          },
          handler: 'addPath',
          description: '新增路径',
        },
      ],
    }
  ],
  version: '1.0',
};

export default location;
