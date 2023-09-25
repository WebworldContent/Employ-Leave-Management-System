import { addLeavesModel, getLeavesModel, getLeavesUserBasedModel } from "../models/leavesModel.js";
import { getUserIdModel } from "../models/usersModel.js";

export const addLeavesUserBased = async(req, res) => {
    try {
        const email = req.body.email;
        const leavesInfo = {
            casual_leave: req.body.casualLeave,
            sick_leave: req.body.sickLeave,
            privileged_leave: req.body.privilegedLeave,
            parental_leave: req.body.parentalLeave,
            maternity_leave: req.body.maternityLeave,
        };
        const userIds = await getUserIdModel(email);
        await addLeavesModel(leavesInfo, userIds[0].userID);
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
        console.error(err);
        res.status(500).send({fail: 'Internal Server Error'});
    }
};
