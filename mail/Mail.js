//严格模式
"use strict";
//引入nodemailer插件
const nodemailer = require("nodemailer");
//创建发送邮件的对象
let transporter=nodemailer.createTransport({
    host:'smtp.qq.com',//发送方邮箱
    port:465,//端口号
    secureConnection:true,//安全校验 true for 465, false for other ports
    auth:{
        user:'1296755703',//发送方邮箱
        pass:'uyrlecfpupihjfjj'//smtp验证码
    }
})

    function send(mail,code){
        // 邮件信息
        let  mailobj={
            from: '"今天天气不错" <1296755703@qq.com>', // sender address
            to: mail, // list of receivers
            subject: "爱你呦", // Subject line
            text: `您的验证码是${code}，有效期五分钟`, // plain text body
            //html: "<b>Hello world?</b>" // html body
        }
        return new Promise((resolve,reject)=>{
            transporter.sendMail(mailobj,(err,data)=>{
                //  console.log(err)
                //  console.log(data)
                if(err){
                    // console.log(err);
                    reject()
                }else{
                    // console.log(data);
                    resolve()
                }
            });
        })
}

module.exports={send}