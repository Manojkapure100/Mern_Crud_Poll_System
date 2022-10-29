const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const myPollModel = require("./myPollModel")

const app = express()

mongoose.connect("mongodb://localhost:27017/stud", () => {
    console.log("Mongodb is running")
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("i am groot")
})

app.post("/insertPoll", async (req, res) => {
    try {
        const insertdata = await new myPollModel({
            q: req.body.q,
            o1: req.body.o1,
            o2: req.body.o2,
            o3: req.body.o3,
            o4: req.body.o4,
            co1: 0, co2: 0, co3: 0, co4: 0
        })
        insertdata.save()
        res.send(true);
    } catch (error) {
        res.send(false)
    }
})

app.post("/updatePoll", async (req, res) => {
    try {
        const updatedata = await myPollModel.findByIdAndUpdate({ _id: req.body.id },
            {
                $set: {
                    q: req.body.q,
                    o1: req.body.o1,
                    o2: req.body.o2,
                    o3: req.body.o3,
                    o4: req.body.o4,
                }
            })
        if (updatedata) {
            res.json({ "msg": true, "data": updatedata })
        } else {
            res.json({ "msg": false, "data": updatedata })
        }
    } catch (error) {
        res.json({ "msg": false, "data": error })
    }
})

app.post("/deletePoll", async (req, res) => {
    try {
        const deletedata = await myPollModel.deleteOne({ _id: req.body.idd })
        if (deletedata) {
            res.json({ "msg": true, "data": deletedata })
        } else {
            res.json({ "msg": false, "data": deletedata })
        }
    } catch (error) {
        res.send(error)
    }
})

app.get("/displayPoll", async (req, res) => {
    try {
        const mydata = await myPollModel.find();
        if (mydata) {
            res.json({ "msg": true, "data": mydata })
        } else {
            res.json({ "msg": false, "reason": "error else" })
        }
    } catch (error) {
        res.json({ "msg": false, "reason": "error catch" })
    }
})

app.post("/displayOnePoll", async (req, res) => {
    try {
        // console.log(req.body.val)
        const mydata = await myPollModel.findOne({ _id: req.body.val });
        res.send(mydata)
    } catch (error) {
        res.send(error)
    }
})

app.post("/updateCount", async (req, res) => {
    try {
        var which_prev_no = 0
        var which_next_no = 0

        if (req.body.r == 1) {
            const which_no = await myPollModel.find({ _id: req.body.id })
            which_prev_no = which_no[0]
            which_prev_no = which_prev_no.co1
            which_next_no = which_prev_no + 1
            const final = await myPollModel.findByIdAndUpdate({ _id: req.body.id }, { $set: { co1: which_next_no } })
        } else if (req.body.r == 2) {
            const which_no = await myPollModel.find({ _id: req.body.id })
            which_prev_no = which_no[0]
            which_prev_no = which_prev_no.co2
            which_next_no = which_prev_no + 1
            const final = await myPollModel.findByIdAndUpdate({ _id: req.body.id }, { $set: { co2: which_next_no } })
        } else if (req.body.r == 3) {
            const which_no = await myPollModel.find({ _id: req.body.id })
            which_prev_no = which_no[0]
            which_prev_no = which_prev_no.co3
            which_next_no = which_prev_no + 1
            const final = await myPollModel.findByIdAndUpdate({ _id: req.body.id }, { $set: { co3: which_next_no } })
        } else if (req.body.r == 4) {
            const which_no = await myPollModel.find({ _id: req.body.id })
            which_prev_no = which_no[0]
            which_prev_no = which_prev_no.co4
            which_next_no = which_prev_no + 1
            const final = await myPollModel.findByIdAndUpdate({ _id: req.body.id }, { $set: { co4: which_next_no } })
        }
        // console.log("pre= " + which_prev_no + "\nnext= " + which_next_no)
        res.send(final)
    } catch (error) {
        res.json({ "msg": false, "data": error })
    }
})

app.listen(4000, (req, res) => {
    console.log("Server is running")
})