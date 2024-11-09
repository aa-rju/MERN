
const nodemailer = require('nodemailer');

// Function to send an email
const mailSender = async (email,title, body)=>{//(recipientEmail, subject, message) => {
    try {
        // Create a transporter with SMTP settings
        const transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,  // Using Gmail as an example; replace with your email service
            auth: {
                user: process.env.MAIL_USER,  // Your email address
                pass: process.env.MAIL_PASS,    // Your email password or app password
            }
        });

        // Email options
        let info = await transporter.sendMail({
            from: `"StudyNotion || COdeHelp"`,  // Sender address
            to: `${email}`,  // Recipient's email
            subject: `${title}`,  // Email subject
            text: `${body}`,  // Plain text message
            // You can also send an HTML body using `html: '<h1>Hello World</h1>'`
        });
        console.log(info);
        return info;

        // Send the email
        // const info = await transporter.sendMail(mailOptions);
        // console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ', error);
    }
}




// Call this function from your backend when needed
//sendEmail('recipient@example.com', 'Test Subject', 'This is a test email sent from the backend.');
module.exports={mailSender};