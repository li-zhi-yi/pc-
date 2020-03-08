//1 引入mongoose
const mongoose=require('mongoose');

//2创建schema对象
var foodSchema=new mongoose.Schema({
    name:{type:String,require:true},
    price:{type:String,require:true},
    desc:{type:String,require:true},
    typename:{type:String,require:true},
    typeId:{type:Number,require:true},
    img:{type:String,require:true}
})

//3将schema对象转为数据模型
var Food=mongoose.model('food',foodSchema);//该数据对象和集合关联('集合名',schema对象)

//暴露集合
module.exports=Food;

//javascript 小数0.1+0.2=0.30000000000000004
// 为了解决这种情况 (a*10000+b*10000)/10000  保留四位小数