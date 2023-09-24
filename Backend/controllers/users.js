import {addUsersModel} from "../models/usersModel.js";
import bycript from 'bcrypt';
const saltRound = 10;

const encrypt = async (password) => {
    try {
        return await bycript.hash(password, saltRound);
    } catch (err) {
        throw err;
    }
};

export const addUser = async (req, res) => {
    const {username, email, password, image} = req.body;
    try {
        const updatedPassword = await encrypt(password);
        addUsersModel({username, email, updatedPassword, image});
        res.send({success: 'Added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send({fail: 'Internal error'});
    }
};
