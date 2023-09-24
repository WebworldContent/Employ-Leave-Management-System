import {addUsersModel, getUsersModel} from "../models/usersModel.js";
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
    try {
        const updatedPassword = await encrypt(req.body.password);
        const userData = {
            ...req.body,
            password: updatedPassword,
        };
        await addUsersModel(userData);
        res.send({success: 'Added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send({fail: 'Internal Server Error'});
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await getUsersModel();
        res.send(users);
    } catch(err) {
        console.error(err);
        res.status(500).send({fail: 'Internal Server Error'});
    }
};
