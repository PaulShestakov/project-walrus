import * as nodeMailer from 'nodemailer';
import * as EmailTemplate from 'email-templates';
import * as config from 'config';

class Mailer {

    private transporter;

    constructor() {
        this.transporter = nodeMailer.createTransport({
                service: 'gmail',
                auth: {
                    user: config.get('mail.senderEmail'),
                    pass: config.get('mail.senderPassword')
                }
            }
        );
        this.transporter.verify(function(error, success) {
            if (error) {
                if (error.responseCode === 535) {
                    console.log("Mailer invalid password");
                } else {
                    console.log(error);
                }
            } else {
                 console.log('Server is ready to take our messages');
            }
         });
    }

    sendEmail(messageOptions) {
        this.transporter.sendMail(messageOptions, function(error, response){  //callback
            if(error){
                console.log(error);
            }else{
                console.log("Message was sent");
            }
        });
    }

}

export default new Mailer();