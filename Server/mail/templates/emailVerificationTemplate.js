const otpTemplate =(otp)=>{
        `<!DOCTYPE html>
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
            <div class="message">OTP verification Email</div>
            <div class="body">
                <p>Hey </p>
                <p>Thankyou for registering XYZ. To complete your registration, please use the following  (One-Time Password) to verify your account:</p>
                <h2 class="highlight">${otp}</h2>
                <p>This OTP is valid for 5 minutes. If you did not request this verification , please disregard.
                    Once your account is verified , you will have access to our platform and its features.
                </p>
            </div>
            <div class="support">If you have any questions or need any further assistance, please feel free to reach us at 
                <a href="mailto:xyz@gmail.com">info@code.com</a> We are here to help!
            </div>

        </div>
    </body>
    </html>`;
};


module.exports=otpTemplate;
