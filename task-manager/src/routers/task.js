const express = require("express");
const User = require("../models/task")
const router = new express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

router.post('/tasks',auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id,
    })
    try{
        await task.save();
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.get('/tasks', auth, async (req, res) => {
    try{
        // const tasks = await Task.find({});
        // const task = await Task.find({owner: req.user._id})
        await req.user.populate("tasks").execPopulate();
        res.send(req.user.tasks);
    }catch(e){
        res.status(500).send(e)
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        // const task = await Task.findById(_id);
        const task = await Task.findOne({_id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }

    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body);
    const allowedupdate = ["description","completed"];
    const isValidOpertion = updates.every((update)=>{
        return allowedupdate.includes(update);
    })
    if(!isValidOpertion){
        return res.send(404).send({error:"invalid update"});
    }
    try{
        const task = await Task.findOne({_id, owner: req.user_id});
        if(!task){
            return res.status(404).send();
        }
        updates.forEach((update)=> user[update] = req.body[update]);
        await task.save();
        // const task = await Task.findByIdAndUpdate(_id, req.body, {new : true, runValidator: true});
        
        res.send(task);
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try{
        // const task = await Task.findByIdAndDelete(req.params.id);
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user,_id});
        if(!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;