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
    });
};

export const getLeavesUserBasedModel = (email) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`select l.* from users as u inner join leaves as l on l.userID = u.userID where email = '${email}'`, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

export const addHolidaysModal = (holidays) => {
    const values = holidays.map((holiday) => `("${holiday.name}", "${holiday.date}")`).join(',');

    return new Promise((resolve, reject) => {
        connectionPool.query(`truncate table holiday`, (err, result) => {
            if (err) return reject(err);
            else return resolve(result);
        });
    }).then(res => {
        return new Promise((resolve, reject) => {
            connectionPool.query(`insert into holiday (name, date) values ${values}`, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }).catch((err) => console.log(err))
};

export const getHolidaysModel = () => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`select * from holiday`, (err, result) => {
            if (err) {return reject(err)}
            else {return resolve(result)}
        });
    });
};

