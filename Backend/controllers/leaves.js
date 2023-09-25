import { addLeavesModel, getLeavesModel, getLeavesUserBasedModel } from "../models/leavesModel";
import { getUserIdModel } from "../models/usersModel";

export const addLeavesUserBased = async(req, res) => {
    try {
        const leavesInfo = {...req.body};
        const userId = await getUserIdModel(leavesInfo.email);
        await addLeavesModel(userId);
        res.send({success: 'Added leaves successfully'})
    } catch(err) {
        console.error(err);
        res.status(500).send({fail: 'Internal Server Error'});
    }
};

export const getLeaves = async(req, res) => {
    try {
        const leaves = await getLeavesModel();
        res.send(leaves);
    } catch (err) {
        console.error(err);
        res.status(500).send({fail: 'Internal Server Error'});
    }
};

export const getLeavesUserBased = async(req, res) => {
    try {
        const email = req.params.emailId;
        const leaves = await getLeavesUserBasedModel(email);
        res.send(leaves);
    } catch(err) {
        console.log(err);
        res.status(500).send({fail: 'Internal Server Error'});
    }
};
