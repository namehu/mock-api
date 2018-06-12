import bodyParser from 'body-parser';
import express from 'express';
import interceptor, { notFound } from './Interceptor';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 监听端口
const port = 3000;
interceptor(app);
// 未匹配请求时
app.use(notFound);

app.listen(port, () => {
  console.log(`[INFO] ---- EXPRESS STARTED SUCCESSFULL AND LISTEN PORT IN ${port}`);
});
// import mysql from 'mysql';
// import { mysqlConfig } from './config';

// const pool = mysql.createPool(Object.assign(mysqlConfig, {
//   connectionLimit: 100,
// }));

// const sql = 'select * from project';
// pool.query(sql, (error: any, result: any) => {
//   if (error) { console.log(error); } else if (result) { console.log(result); }
// });
