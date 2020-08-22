var bcrypt = require('bcryptjs');
const ObjectId = require('mongodb').ObjectID;
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mikebrown10140513@gmail.com',
        pass: 'kmk19990513'
    }
});
class UserController {
    constructor(db) {
        this.db = db;
    }

    async SignUp(req) {
        let email = req.body.email;
        let user = await this.db.collection('users').findOne({'info.email': email});
        //console.log(user)
        if (user) {
            return {
                state: -1,
                error: "Email duplicated, Please use another email"
            }
        } else {
            let password = bcrypt.hashSync(req.body.password);
            let first_name = req.body.first_name;
            let last_name = req.body.last_name;
            let phone = req.body.phone;
            let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
            let created_at = new Date().toISOString();
            let emailVerified = false;
            let apiToken = ObjectId().toString();
            let uid = ObjectId().toString();
            let level = 0
            let isEnable = true
            let result = await this.db.collection('users').insertOne({
                _id: ObjectId().toString(),
                info: {
                    email,
                    first_name,
                    last_name,
                    photoUrl: "",
                    phone,
                },
                auth: {
                    uid,
                    apiToken,
                    email,
                    password,
                    isEnable,
                    created_at,
                    emailVerified,
                    ip,
                    level: 0,
                    provider: []
                }

            })
            this.db.collection('login_history').insertOne({
                uid,
                created_at: new Date().toISOString(),
                ip: req.ip,
                apiToken,
                level,
                isEnable,
                metadata: []
            })
            return {
                state: 1,
                msg: "We created your account successfully",
                data: result.ops[0]
            }
        }
    }

    async SignIn(req) {
        console.log('signin', req.body)
        let email = req.body.email;
        let password = req.body.password;
        let user = await this.db.collection('users').findOne({'auth.email': email});

        if (user === null) {
            return {
                state: -1,
                error: "Does not exist your account."
            }
        }
        console.log(user.auth.isEnable, user.auth.level)
        if (user.auth.isEnable === false) {
            return {
                state: -2,
                error: "Your account has been closed."
            }
        }
        if (user.auth.level != 0) {
            return {
                state: -2,
                error: "Does not exist your account."
            }
        }
        let isCheck = bcrypt.compareSync(password, user.auth.password);
        //console.log(password,isCheck)
        if (!isCheck) {
            return {
                state: -3,
                error: "Does not match email and password."
            }
        }
        let apiToken = ObjectId().toString();
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        await this.db.collection('login_history').insertOne({
            uid: user.auth.uid,
            apiToken: apiToken,
            created_at: new Date().toISOString(),
            ip
        })
        await this.db.collection('users').updateOne({"auth.uid": user.auth.uid}, {$set: {"auth.apiToken": apiToken}})
        user = await this.db.collection('users').findOne({'auth.email': email}, {_id: 0});
        return {
            state: 1,
            msg: 'good',
            data: user
        }
    }

    async GetUser(req) {
        let uid = req.body.uid;
        let user = await this.db.collection('users').findOne({'auth.uid': uid});
        if (user == null) {
            return {
                state: -1,
                notify: {
                    title: "account error",
                    color: "danger",
                    text: "Dose not exist your account,"
                },
            }
        }
        let settings = await this.db.collection('settings').findOne({_id: "site_setting"})
        let rate = await this.db.collection('settings').findOne({_id: "exchange_rate"})
        //let sports_menu = await this.GetSportsMenu()
        let notifications = await this.GetUserNotify(uid)
        return {
            state: 1,
            // msg:"We created your account successfully",
            result: user,
            settings,
            //sports_menu,
            notifications,
            rate
        }
    }
    async CheckLogin({uid, apiToken}) {
        let isCheck = await this.db.collection('login_history').find({uid, apiToken}).toArray();
        let user=await this.db.collection("users").findOne({"auth.uid":uid})
        if (isCheck.length == 0) {
            return {
                state:-1
            }
        } else {
            return {
                state:0,
                result:user
            }
        }
    }

    async ResetPassword(req) {
        let password = req.body.password
        let uid = req.body.uid
        let user = await this.db.collection('users').findOne({'auth.uid': uid});
        if (user === null) {
            return {
                state: -2,
                notify: {
                    text: "Does not exist your account.",
                    title: "Reset Password",
                    color: "warning"
                }
            }
        }
        let isCheck = bcrypt.compareSync(password.op, user.auth.password);
        //console.log(password,isCheck)
        if (!isCheck) {
            return {
                state: -3,
                notify: {
                    text: "Does not match email and password.",
                    title: "Reset Password",
                    color: "warning"
                }
            }
        }
        await this.db.collection('users').updateOne({"auth.uid": uid}, {$set: {"auth.password": bcrypt.hashSync(password.np)}})
        return {
            state: 0,
            notify: {
                text: "Reset your password successfully",
                title: "Reset Password",
                color: "success"
            }
        }
    }

    async ResetPasswordByToken(req) {
        let password = req.body.password
        let email = req.body.email
        let token = req.body.token
        let user = await this.db.collection('users').findOne({'auth.reset_password_token': token});
        if (user === null) {
            return {
                state: -1,
                notify: {
                    text: "You are not authorized",
                    title: "Reset Password",
                    color: "warning"
                }
            }
        }
        console.log('password',email,password,user)
        await this.db.collection('users').updateOne({"auth.uid": user.auth.uid}, {
            $set: {
                "auth.password": bcrypt.hashSync(password),
                'auth.reset_password_token': ""
            }
        })
        return {
            state: 1,
            notify: {
                text: "Reset your password successfully",
                title: "Reset Password",
                color: "success"
            }
        }
    }

    async SendOtpToEmail(to_email,from_email,subject){
        let code = Math.floor(10000 + Math.random() * 90000)
        var mailOptions = {
            from: from_email,
            to: to_email,
            subject: subject,
            html: `
                <h1>Verification Code</h1>
                <code>${code}</code>
                    `
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return code
    }

}

module.exports = UserController
