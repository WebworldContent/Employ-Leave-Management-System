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
            resolve(result)
        });
    })
    
};

export const getUsersModel = () => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`select * from users`, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

export const getUserIdModel = (email) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`select userID from users where email = '${email}'`, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

export const getUserByEmailModel = (email) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`select * from users where email = '${email}'`, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};

export const updateUserModel = (userData, email) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`update users set username = '${userData.username}', email = '${userData.email}', user_type = '${userData.user_type}' where email = '${email}'`, (err, result) => {
            if (err) return reject (err);
            else resolve(result);
        });
    });
};

export const deleteUserModel = (email) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`delete from users where email = '${email}'`, (err, result) => {
            if (err) return reject (err);
            else resolve(result);
        });
    });
};