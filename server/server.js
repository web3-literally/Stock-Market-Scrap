// const functions = require('firebase-functions');
let express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT||3000;
const server = app.listen(PORT, function () {
    console.log('Server is running on PORT:', PORT);
});

const bodyParser = require('body-parser')
const axios = require('axios');

app.use(cors())



app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: "500mb", extended: true, parameterLimit: 50000}));

///////////////////////////////////////////////////////////////////////////////////////////
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const db_url = process.env.DB_URL;


app.get('/', function (req, res) {
    res.status(200).send('testing api12');
});

let settings = {}

MongoClient.connect(db_url, {useNewUrlParser: true, useUnifiedTopology: true}, async (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    const db = client.db(process.env.DB_NAME||"stock_db")
    console.log('connected db')
    let UserController=require('./Controller/UserController')
    let user_controller=new UserController(db)
    let ScrapController=require('./Controller/ScrapController')
    let scrapController=new ScrapController(db)

    app.post("/signup", async (req, res) => {
        res.send(await user_controller.SignUp(req))
    })
    app.post("/signin", async (req, res) => {
        res.send(await user_controller.SignIn(req))
    })
    app.post("/CheckLogin", async (req, res) => {
        res.send(await user_controller.CheckLogin(req.body))
    })
    app.post("/companies/read", async (req, res) => {
        res.send(await scrapController.ReadCompanies(req.body))
    })
    app.post("/companies/getAnalysis", async (req, res) => {
        res.send(await scrapController.GetAnalysis(req.body))
    })
    app.post("/companies/GetAnalysisByDate", async (req, res) => {
        res.send(await scrapController.GetAnalysisByDate(req.body.company_id))
    })

})
