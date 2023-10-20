import {addUsersModel, getUsersModel, getUserByEmailModel, updateUserModel, deleteUserModel} from "../models/usersModel.js";
import bycript from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRound = 10;

const encrypt = async (password) => {
    return await bycript.hash(password, saltRound);
};

export const addUser = async (req, res) => {
    try {
        if (!req.loggedUserEmail) {
            return res.sendStatus(401);
        }
        const updatedPassword = await encrypt(req.body.password);
        const userData = {
            ...req.body,
            password: updatedPassword,
        };
        await addUsersModel(userData);
        return res.send({success: 'Added successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};

export const getUsers = async (req, res) => {
    try {
        if (!req.loggedUserEmail) {
            return res.sendStatus(401);
        }
        const users = await getUsersModel();
        return res.send(users);
    } catch(err) {
        console.error(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};

export const getUsersByEmail = async (req, res) => {
    try {
        if (!req.loggedUserEmail) {
            return res.sendStatus(401);
        }
        const email = req.params.email ?? req.loggedUserEmail;
        const user = await getUserByEmailModel(email);
        user[0].password = undefined;
        return res.send(user);
    } catch(err) {
        console.error(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};

export const updateUsers = async (req, res) => {
    try {
        if (!req.loggedUserEmail) {
            return res.sendStatus(401);
        }
        const userData = {...req.body};
        const requiredEmail = req.params.email;
        await updateUserModel(userData, requiredEmail);
        return res.send({success: true, msg: 'Updated successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};

export const deleteUsers = async(req, res) => {
    try {
        if (!req.loggedUserEmail) {
            return res.sendStatus(401);
        }
        const email = req.body.email;
        await deleteUserModel(email);
        return res.send({success: true, msg: 'Deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};

export const registerUser = async (req, res) => {
    try {
        const {email} = req.body;
        const existUser = await getUserByEmailModel(email);
        console.log(existUser);
        if (existUser.length) {
            return res.status(401).json({alreadyExist: true, success: false, msg: 'User Already Exist in DB'});
        }

        const updatedPassword = await encrypt(req.body.password);
        const userData = {
            ...req.body,
            password: updatedPassword,
        };
        await addUsersModel(userData);

        const token = jwt.sign({email}, 'SecreteHash', {expiresIn: '2h'});
        return res.status(200).json({success: true, msg: 'Added successfully', token});
    } catch (err) {
        console.error(err);
        res.status(500).send({success: false, msg: 'Internal Server Error'});
    }
};


export const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!(email && password)) {
            return res.status(401).send({success: false, msg: 'Incomplete Fields'});
        }

        const userData = await getUserByEmailModel(email);

        if (userData.length && await bycript.compare(password, userData[0].password)) {
            const token = jwt.sign(
                {email},
                'SecreteHash', // process.env.SECRET
                {expiresIn: '2h'});

            res.status(200).json({success: true, msg: 'Logged In', token});
        } else {
            return res.status(400).send({success: false, msg: 'Invalid Credentials Given'});
        }

    } catch(err) {
        console.log(err);
        return res.status(500).send({ success: false, msg: 'Internal Server Error' });
    }
    
};
