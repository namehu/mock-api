
// 将驼峰写法转成数据库下表写法
export function underscoreName(name: any) {
  const na = String(name).replace(/([A-Z]+)/g, (v) => `_${v.toLowerCase()}`);
  return na;
}