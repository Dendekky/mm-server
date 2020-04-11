import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

exports.sendMail = async (req, res) => {

  try {
    const info =fetch(`http://quotes.rest/qod.json?category=love`)
        .then(response => response.json())
        .catch(err => console.log(err))
    info.then(results => {
        const data = results.contents.quotes.map(result => result.quote)
        // console.log(data)
        let message= "";
        for (let i = 0; i < data.length; i++) {
            message += data[i] + "!  ";
        }

        console.log(message)

        const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.CRON_EMAIL,
            pass: process.env.CRON_PASSWORD,
        },
        });

        smtpTransport.sendMail({ // email options
        from: `Ibrahim <${process.env.CRON_EMAIL}>`,
        to: 'Friend <dendekky@gmail.com>', // receiver
        subject: 'Test Cron Job', // subject
        html: `<div>
                    <p>Hello friend</p>
                    <p>${message}</p>
                    </div>`, // body (var data which we've declared)
        }, (error, response) => { // callback
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent');
            res.status(200).send({ message: 'message sent successfully' });
        }

        smtpTransport.close();
        });
    })
  } catch (err) {
    res.status(400).send(err);
  }
};