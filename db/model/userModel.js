//1 引入mongoose
const mongoose=require('mongoose');

//2创建schema对象
var userSchema=new mongoose.Schema({
    us:{type:String,require:true},
    ps:{type:String,require:true},
    age:Number,
    sex:{type:Number,default:0}
})

//3将schema对象转为数据模型
var User=mongoose.model('user',userSchema);//该数据对象和集合关联('集合名',schema对象)

//暴露集合
module.exports=User;