//1引入express
const express=require('express');

//2 实例化express.Router()为router
const router=express.Router();

//3 引入数据库中的集合 User:Schema对象
const User=require('../db/model/userModel');

//4引入mail对象  带有封装好的send方法
const Mail=require('../mail/Mail');

//5 通过内存保存验证码
let codes=[];


/**
 * @api {post} /user/reg 用户注册
 * @apiName  用户注册
 * @apiGroup User
 *
 * @apiParam {String} us  user
 * @apiParam {String} ps  password
 * @apiParam {String} code 验证码
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/reg',(req,res)=>{
    //验证接口可以用
    // res.send('test ok');
    let {us,ps,code}=req.body;
    console.log(us,ps,codes.us,codes,code)
    //判断是否存在us和ps和code
    if(!us||!ps||!code){return res.send({err:'-1',msg:'us或ps或code不存在,请重新输入'})};
    if(codes.us!=code){ return res.send({err:'-1',msg:'验证码不正确,请重试'})};
    //判断us是否存在 存在则可以注册
    User.find({us})
        .then((data)=>{
            // console.log(data) data 数据解构是个空数组
            if(data.length===0){
              return  User.insertMany({us,ps})
            }else{
               return res.send({err:1,msg:'用户名已存在,请更换用户名'})
            }
        })
        .then(()=>{
            res.send({err:0,msg:'恭喜你 注册成功'});
        })
        .catch((err)=>{
            res.send({err:-1,mag:'注册err'})
        })
})



/**
 * @api {post} /user/login 用户登录
 * @apiName  用户登录
 * @apiGroup User
 *
 * @apiParam {String} us  user
 * @apiParam {String} ps  password
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/login',(req,res)=>{
    //验证接口是否可用
    // res.send('test ok')
    let {us,ps}=req.body;
    if(!us||!ps){return res.send({err:'2',msg:'用户名或密码不存在'})}
    //查询数据库
    User.find({us,ps})
        .then((data)=>{
            // res.send(data)
            if(data.length===0){
                res.send({err:2,msg:'用户名或密码错误'})
            }else{
                res.send({err:0,msg:'登录成功'})
            }
        })
        .catch(()=>{
            res.send({err:3,msg:'登录err'})
        })
})

//发送邮件验证码
/**
 * @api {post} /user/getMailCode 发送邮箱验证码
 * @apiName  发送邮箱验证码
 * @apiGroup User
 *
 * @apiParam {String} mail  邮箱
 * @apiParam {String} us  用户名
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getMailCode',(req,res)=>{
    // res.send('test ok');
    let {mail,us}=req.body;
    let code=parseInt(Math.random()*10000);//产生验证码
    Mail.send(mail,code)
        .then(()=>{
            codes.us=code;
            console.log(codes.us);
            console.log(codes);
            //将邮箱和邮箱撇配的验证码保存到缓存中
            res.send({err:0,msg:'验证码发送OK'})
        })
        .catch(()=>{
            res.send({err:-1,msg:'验证码发送 no OK'})
        })
})

//暴露router
module.exports=router;