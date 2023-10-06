import {addUsersModel, getUsersModel, getUserByEmailModel} from "../models/usersModel.js";
import bycript from 'bcrypt';
const saltRound = 10;

const encrypt = async (password) => {
    return await bycript.hash(password, saltRound);
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

export const getUsersByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        console.log(email);
        const user = await getUserByEmailModel(email);
        res.send(user);
    } catch(err) {
        console.error(err);
        res.status(500).send({fail: 'Internal Server Error'});
    }
};