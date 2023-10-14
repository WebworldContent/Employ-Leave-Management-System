import {addUsersModel, getUsersModel, getUserByEmailModel, updateUserModel, deleteUserModel} from "../models/usersModel.js";
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

export const updateUsers = async (req, res) => {
    try {
        const userData = {...req.body};
        const requiredEmail = req.params.email;
        await updateUserModel(userData, requiredEmail);
        res.send({success: 'Updated successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send({fail: 'Internal Server Error'});
    }
};

export const deleteUsers = async(req, res) => {
    try {
        const email = req.body.email;
        console.log(email);
        await deleteUserModel(email);
        res.send({success: 'Deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send({fail: 'Internal Server Error'});
    }
};