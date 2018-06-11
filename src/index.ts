import mysql from 'mysql';
import { mysqlConfig } from './config';

const pool = mysql.createPool(Object.assign(mysqlConfig, {
  connectionLimit: 100,
}));

const sql = 'select * from project';
pool.query(sql, (error: any, result: any) => {
  if (error) { console.log(error); } else if (result) { console.log(result); }
});
