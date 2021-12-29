const express = require("express");
const User = require("../models/user")
const auth = require("../middleware/auth");

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    }catch(e){
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user: user.getPublicProfile, token});
        // res.send(user);
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post("/users/logout", auth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        })
        await req.user.save();
        res.send();
    } catch (error) {
        res.send(500).send(error)
    }
})
router.post("/users/logoutAll", auth, async (req, res)=>{
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.send(500).send(error)
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
})

router.patch('/users/me',auth, async (req, res) => {
    const _id = req.user._id
    const updates = Object.keys(req.body);
    const allowedupdate = ["name","email","age","password"];
    const isValidOpertion = updates.every((update)=>{
        return allowedupdate.includes(update);
    })
    if(!isValidOpertion){
        return res.send(404).send({error:"invalid update"});
    }
    try{
        updates.forEach((update)=> req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(400).send(e)
    }
})
router.delete('/users/me', auth, async (req, res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user._id);
        // if(!user){
        //     return res.status(404).send();
        // }
        await req.user.remove();
        res.send(req.user);
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;