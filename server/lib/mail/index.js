const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const template = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'template.ejs'), 'utf8'));
const adTemplate = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'adTemplate.ejs'), 'utf8'));

// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(to,code){
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'Gmail', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
          user: 'TronOscar.Official@gmail.com',
          pass: 'Suntec996!',
        }
      });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'TronOscar.Official', // sender address
      to: to, // list of receivers
      subject: 'Tronoscar Binding Code', // Subject line
      text: 'your code is:' + code, // plain text body
      html: await getTemplate(code) // html body
    });
  
    // eslint-disable-next-line no-console
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

async function getTemplate(code){
  let html = template({
    code: code,
  });
  return html;
}

async function sendAdEmails(to){
   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'QQ', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
      user: 'info@tronoscar.pro',
      pass: 'Suntec996!',
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'info@tronoscar.pro', // sender address
    to: to, // list of receivers
    subject: '\'We\'ve only just started\' - OSCAR LAND invites you to Game of Fairness ', // Subject line
    text:  adTemplate(),
    html: adTemplate()
  });

  // eslint-disable-next-line no-console
  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
  
module.exports = {
    sendEmail
};