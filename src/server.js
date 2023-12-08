const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const userModel = require('./schemas/user.schema')
const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Server is online!')
})

app.listen(1000)

async function connectDatabase() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test')
        console.log('Database connected!');
        await startRouters()
    } catch (error) {
        console.error(error);
    }
}
connectDatabase()


async function startRouters() {
    app.post('/create/user', async function (req, res) {
        try {
            const userModelInstance = new userModel(req.body)
            let savedRes = await userModelInstance.save();
            console.log(savedRes);
            res.send({status_code: 200, message: "User created successfully!"})
        } catch (error) {
            console.error(error);
            res.send({status_code: 400, message: "Error! Failed to create user"})
        }
    })

    app.get('/fetch/user', async function (req, res) {
        try {
            let fetchedRes = await userModel.find({ name: req.query.name });
            if(fetchedRes.length > 0) {
                res.send({status_code: 200, message: "Users found!", result: fetchedRes })
            } else {
                res.send({status_code: 200, message: "User not found!"})
            }
        } catch (error) {
            console.error(error);
            res.send({status_code: 400, message: "Error! Failed to fetch user"})
        }
    })
}