import {connectionPool} from "../utils/connection.js";

export const addUsersModel = (userData) => {
    return new Promise((resolve, reject) => {
        const values = [];
        for (const key in userData) {
            if (userData.hasOwnProperty(key)) {
                const dataType = (key === 'status') ?  userData[key] : `'${userData[key]}'`;
                values.push(dataType);
            }
        }
        connectionPool.query(`insert into users(${Object.keys(userData).join(',')}) values(${values.join(',')})`, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result)
        });
    })
    
};

export const getUsersModel = () => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`select * from users`, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};

export const getUserIdModel = (email) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`select userID from users where email = ${email}`, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
};
