const async = require('async');
const mailer = require('nodemailer');
const {mailFormatValidation} = require('../validations/mail.validation');

let createMailData = (id, email, token) => {

    const url = 'localhost:8000';
    const text = `            Hi,
            Thank you for registering!
            Please click on the below link to confirm mail and activate your account\n.
           
            http://${url}/user/activate?token=${token}&id=${id}
            `;
    return {
        from: "prashanthjangam1@gmail.com",
        to: email,
        subject: "Account Registration",
        text: text,
    };
};

let activateSendMail = (id, mail, token, cb) => {
    async.waterfall([
        (next) => {
            mailFormatValidation(mail, (isTrue) => {
                if (!isTrue) {
                    next({
                        success: false
                    });
                } else {
                    next(null);
                }
            })
        },
        (next) => {
            let mailData = createMailData(id, mail, token);
            let transporter = mailer.createTransport({
                series: "Gmail",
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: "prashanthjangam1@gmail.com",
                    pass: "badripavani12345",
                },
            });

            transporter.sendMail(mailData, (error, result) => {
                if (error) {
                    next({
                        success: false
                    });
                } else {
                    next(null, {
                        success: true,
                        result
                    });
                }
            });
        }
    ], cb)

};

const orderSendMail = (order, email, cb) => {
    text = `Your order is successfull \n
        ${order}`;
    mailData = {
        from: "prashanthjangam1@gmail.com",
        to: email,
        subject: "Order confirmed",
        text: text,
    };
    let transporter = mailer.createTransport({
        series: "Gmail",
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "prashanthjangam1@gmail.com",
            pass: "badripavani12345",
        },
    });

    transporter.sendMail(mailData, (error, result) => {
        if (error) {
            cb(error)
        } else {
            cb(null)
        }
    })

};

module.exports = {
    activateSendMail,
    orderSendMail,
};