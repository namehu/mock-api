import * as c from '../Controller';

import { Location } from "./index";

const location: Location = {
  protocol: 'http',
  url: 'localhost',
  description: 'mock-api接口',
  path: [
    {
      name: 'api/project/list',
      controller: c.projectListController,
      description: '项目列表',
    },
    {
      name: 'api/project/add',
      method: 'POST',
      body: {
        name: '$$',
        description: '?',
        protocol: '$$',
        url: '$$',
      },
      controller: c.projectAddController,
      description: '新增一个项目'
    }
  ],
  version: '1.0'
}

export default location;