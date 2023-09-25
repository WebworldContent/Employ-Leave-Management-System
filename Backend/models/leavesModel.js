import { connectionPool } from "../utils/connection.js";

export const addLeavesModel = (leavesInfo, userId) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`insert into leaves(userID, casual_leave, sick_leave, privileged_leave, parental_leave, maternity_leave) 
        values(${userId}, ${leavesInfo.casual_leave}, ${leavesInfo.sick_leave}, ${leavesInfo.privileged_leave}, ${leavesInfo.parental_leave}, ${leavesInfo.maternity_leave})`, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

export const getLeavesModel = () => {
    return new Promise((resolve, reject) => {
        connectionPool.query('select * from leaves', (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
};

export const getLeavesUserBasedModel = (email) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`select l.* from users as u inner join leaves as l on l.userID = u.userID where email = '${email}'`, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
};
