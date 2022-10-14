const nodemailer = require("nodemailer");

const email = '';
const password = '';
const receiver = '';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: password,
    }
});

function send(message) {
    var options = {
        from: email,
        to: receiver,
        subject: 'Lab №6 task-3',
        text: message
    };

    transporter.sendMail(options, (err, info) => {
        err ? console.log(err):console.log('Email sent')
    });
};

module.exports = send;