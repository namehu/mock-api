import { Request } from "express";
import mysql from 'mysql';
import { resolve } from "path";
import { mysqlConfig, 
} from '../config';

const pool = mysql.createPool(Object.assign(mysqlConfig, {
  connectionLimit: 100,
}));




export async function projectListController(request: Request) {
  const sql = 'select * from project';

  return new Promise((resolve) => {
    pool.query(sql, (error: any, result: any) => {
      if (error) {
        console.log(error);
      } else if (result) {
        console.log(result);
      }

      resolve(result);
    });
  })
}


export function projectAddController(request: Request) {
  return 'ok'
}