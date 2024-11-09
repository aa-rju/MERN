exports.courseEnrollmentEmail =(courseName,name)=>{
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>

            body{
                background-color:#ffffff;
                font-family:Arial,sans-serif;
                font-size: 16px;
                line-height:1.4;
                color:#333333;
                margin:0;
                padding:0;
            }
            .container{
                max-width:600px;
                margin:0 auto;
                padding:20px;
                text-align: center;
            }
            .logo{
                max-width:200px;
                margin-bottom:20px;
            }
            .message{
                font-size:18px;
                font-weight:bold;
                margin-bottom:20px;
            }
            .body{
                font-size:16px;
                margin-bottom:20px;
            }
            .support{
                font-size:14px;
                color: #999999;
                margin-top:20px;
            }
            .highlight{
                font-weight:bold;
            }
        </style>
    </head>
    <body>
        <div class ="container">
            <a href=""><img class="logo"
                src="" alt=""></a>
            <div class="message">Course Registration Confirmation</div>
            <div class="body">
                <p>Dear ${name},</p>
                <p>You have successfully registered for the course <span class="highlight">"${courseName}"</span>We are excited to have you as a participant!</p>
                <p>Please login to your learning dashboard to access the course materials and start your learning Journey!</p>
                <a class="cta" href="https://xyz-edtech-project.vercel.app/dashboard">Go to Dashboard</a>
            </div>
            <div class="support">If you have any questions or need any further assistance, please feel free to reach us at 
                <a href="mailto:xyz@gmail.com">info@code.com</a> We are here to help!
            </div>

        </div>
    </body>
    </html>`;
}; 