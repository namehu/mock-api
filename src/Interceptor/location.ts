import ProjectController from '../Controller/ProjectController';

const c = new ProjectController();

import { Location } from './index';

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
      ]
    }
  ],
  version: '1.0',
};

export default location;
