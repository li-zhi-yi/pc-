//1引入express
const express=require('express');
//引入path模块
const path=require('path');
//2实例化express
const app=express();

//静态化目录
app.use('/public',express.static(path.join(process.cwd(),'./api文档')));
app.use('/filename',express.static(path.join(process.cwd(),'./uploads')));
//4中间件 bodyparser
const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));//extended 设置为true的时候 返回值可以是任何形式,设置为false则为String或Array
app.use(bodyparser.json());//解析json数据格式
//cors跨域
var cors = require('cors');
app.use(cors());
//5引入路由模块
const userRouter=require('./router/userRouter');
const foodRouter=require('./router/foodRouter');
const fileRouter=require('./router/fileRouter');
//拦截'/user' 的post 的请求
app.use('/user',userRouter);
app.use('/food',foodRouter);
app.use('/file',fileRouter);

//6引入mongoose并创建schema对象
const db=require('./db/connect');

//7引入Mail对象  带有封装好的send方法
const Mail=require('./mail/Mail');
//3监听端口号
app.listen(3000,()=>{
    console.log('sever start && listen at 3000')
})