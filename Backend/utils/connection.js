import mysql from 'mysql';

//------------------Using Normal Method ------------------------------
// const con = mysql.createConnection({host: 'localhost', user: 'root', password: 'password'});
// const connect = async () => {
//     try {
//         const res = await new Promise((resolve, reject) => {
//             con.connect((err) => {
//                 if (err) {
//                     reject(err);
//                 }
//                 resolve(con);
//             });
//         });
//         return res;
//     } catch (err_1) {
//         return console.log(err_1);
//     }
// }
// console.log(connect());

//--------------- Using Connection Pool ------------------------------
export const connectionPool = mysql.createPool({host: 'localhost', user: 'root', password: 'password', database: 'leave_app_system'});
