export const AND = ' AND ';
export const ASC = ' ASC';
export const DESC = ' DESC';
export const FROM = ' FROM ';
export const GROUP_BY = ' GROUP BY';
export const INSERT = ' INSERT ';
export const INTO = ' INTO ';
export const ORDER_BY = ' ORDER BY ';
export const SELECT = ' SELECT ';
export const STAR = ' * ';
export const UPDATE = ' UPDATE ';
export const VALUES = ' VALUES ';
export const WHERE = ' WHERE ';
export const DOUBLE_QUESTION = ' ?? ';
export const QUESTION = ' ? ';
export const EQUAL = ' = ';
export const COUNT_ALL = ' COUNT(*) ';
export const LIMIT = ' LIMIT ';
export const OFFSET = ' OFFSET ';
export const IN = ' IN ';
export const DELETE = ' DELETE ';
export const SET = ' SET ';
export const COMMA = ' , ';

/** ----------------- 项目 --------------------- */
// 查询项目信息
export const queryProjectList = `${SELECT} * ${FROM} project`;
// 添加项目
export const addPorject = `${INSERT + INTO} project (??) ${VALUES} (?)`;
