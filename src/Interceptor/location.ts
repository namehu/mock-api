import { Location } from './index';
import ProjectController from '../Controllers/Project.Controller';
import PathController from '../Controllers/Path.Controller';


const location: Location = {
  protocol: 'http',
  url: 'mock.com',
  description: 'mock-api接口',
  PathGroup: [
    {
      controller: new ProjectController(),
      path: [
        {
          name: 'api/projects',
          query: {
            pageNumber: {
              type: Number,
              require: true,
            },
            pageSize: {
              type: Number,
              require: true,
            },
            name: String,
            url: String,
            protocol: [String, Number],
          },
          handler: 'getProjectList',
          description: '项目列表',
        },
        {
          name: 'api/project',
          handler: 'isExit',
          query: {
            url: {
              type: String,
              require: true,
            },
          },
          description: '项目是否有效',
        },
        {
          name: 'api/project',
          method: 'POST',
          handler: 'addProject',
          body: {
            name: {
              type: String,
              require: true,
            },
            url: {
              type: String,
              require: true,
            },
            description: String,
            protocol: {
              type: Number,
              require: true,
            },
          },
          description: '新增项目',
        },
        {
          name: '/api/project/:id',
          method: 'PATCH',
          body: {
            name: {
              type: String,
              require: true,
            },
            url: {
              type: String,
              require: true,
            },
            description: String,
            protocol: {
              type: Number,
              require: true,
            },
          },
          handler: 'update',
          description: '更新项目信息',
        },
        {
          name: 'api/project/:id',
          method: 'DELETE',
          handler: 'deleteById',
          description: '根据id删除项目'
        }, {
          name: 'api/project/:id',
          method: 'GET',
          handler: 'queryProjectById',
          description: '根据id查询项目信息',
        }
      ]
    }, 
    {
      controller: new PathController(),
      path: [
        {
          name: 'api/path',
          method: 'POST',
          body: {
            name: {
              type: String,
              require: true,
            },
            method: {
              type: String,
              require: true,
            },
            query: Object,
            body: Object,
            json: String,
            description: String,
            projectId: {
              type: Number,
              require: true,
            },
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
