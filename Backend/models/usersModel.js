import {connectionPool} from "../utils/connection.js";

export const addUsersModel = ({username, email, updatedPassword, image}) => {
    connectionPool.query(`insert into users(username, email, password, image) values('${username}', '${email}', '${updatedPassword}', '${image}')`, (err, result) => {
        if (err) 
            throw err;
        return result;
    });
};
