
// 项目表实体
const ProjectEntity: Entity = {
  name: {
    require: true,
    type: 'string',
  },
  url: {
    require: true,    
    type: 'string',
  },
  protocol: {
    require: true,
    type: 'number',
  },
  description: 'string',
}

export default JSON.parse(JSON.stringify(ProjectEntity));