import {google} from "googleapis";
import nodemailer from "nodemailer";


const CLIENT_ID='108055340217-eo13uurij80q2rib649k0jhabmpqirgl.apps.googleusercontent.com'
const CLIENT_SECRET='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'
const REDIRECT_URL='https://developers.google.com/oauthplayground'
const REFRESH_TOKEN='1//04rVaLW0x-hbOCgYIARAAGAQSNwF-L9Irk1Qp3BQ6sEwcQNMZ9dA4ywBLieBSnuj8ak6HfhTrnfQFJ-FL7JAKzrPq7eoySAnbktw'

const oAuthClient =  new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET,REDIRECT_URL);
oAuthClient.setCredentials({
    refresh_token: REFRESH_TOKEN
})

export default async function sendMail(data){
    try{
       const {email, token} = data;
       const accessToken = await oAuthClient.getAccessToken();    
       const transport = nodemailer.createTransport({              
        service: "gmail",
        auth: {
            type:'OAuth2',
            user:'yashwanthvishnu14@gmail.com',
            clientId:CLIENT_ID,
            clientSecret:CLIENT_SECRET,
            refreshToken:REFRESH_TOKEN,
            accessToken:accessToken
        }
       })

       const mailOptions = {
          form:'YASHWANTHVISHNU14 <yashwanthvishnu14@gmail.com>',
          to: email,
          subject: "Reset Password",
          text: "Reset Password",
          html:`<h1>Hello,<br><br>Click on given link to reset your password!</h1><br><h1>Link:><a href="http://localhost:${process.env.APP_PORT}/api/v1/users/resetPassword/${token}">click here</a></h1>`
       }

       const result = await transport.sendMail(mailOptions)
       return result;
    }catch{
       throw new Error("failed to send mail")
    } 
}