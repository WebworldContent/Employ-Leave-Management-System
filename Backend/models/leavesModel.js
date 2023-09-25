import { connectionPool } from "../utils/connection";

export const addLeavesModel = (userId) => {
    return new Promise((resolve, reject) => {
        connectionPool.query(`select * from leaves where userID = ${userId}`, (err, result) => {
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
        connectionPool.query(`select * from leaves where email = ${email}`, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    })
};
