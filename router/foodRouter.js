//1引入express
const express=require('express');

//2 实例化express.Router()为router
const router=express.Router();

//3 引入数据库中的集合 Food:Schema对象
const foodModel=require('../db/model/foodModel');

/**
 * @api {post} /food/add 添加菜品
 * @apiName 添加菜品
 * @apiGroup Food
 *
 * @apiParam {String} name 用户名
 * @apiParam {String} price 用户密码
 * @apiParam {String} desc  商品描述
 * @apiParam {String} typename 商品种类
 * @apiParam {Number} typeId   商品ID
 * @apiParam {String} img   商品图片
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */


router.post('/add',(req,res)=>{
    // res.send('test ok')
    // 假数据 向模拟 可以在使用真数据
    // let data={
    //     name:'火山飘雪',
    //     price:'9999',
    //     desc:'超好吃',
    //     typename:'凉菜',
    //     typeId:1,
    //     img:'//public/image/1.png'  //不要插入域名(防止端口号改变 图片就找不到了)  前端到时候直接拼接url就号了
    // }
    let {name,price,desc,typename,typeId,img}=req.body;
    //判断参数是否OK
    foodModel.insertMany({name,price,desc,typename,typeId,img})
        .then((data)=>{
            res.send({err:0,msg:'添加成功'})
        })
        .catch(()=>{
            console.log(err);
            res.send({err:-1,msg:'添加失败'})
        })
})

/**
 * @api {post} /food/getInfoByType 分类查询
 * @apiName 分类查询
 * @apiGroup Food
 *
 * @apiParam {Number}   typename

 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
 router.post('/getInfoByType',(req,res)=>{
     // res.send('test ok')
     // let {typeId}=4; mock数据监测是否可以用
     let {typename}=req.body;
     foodModel.find({typename})
         .then((data)=>{
             if(data.length===0){
                 res.send({err:0,msg:'商品id不存在'})
             }else(
                 res.send({err:0,msg:'商品Id存在',list:data})
             )
         })
         .catch(()=>{
             return res.send({err:-1,msg:'查询出错'})
         })
 })

/**
 * @api {post} /food/getInfoByKw 关键字查询
 * @apiName 关键字查询
 * @apiGroup Food
 *
 * @apiParam {Number} Kw   商品ID
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getInfoByKw',(req,res)=>{
    //$set $gte $or $and $regex regexp
   ;
    let {Kw}=req.body;
    console.log(Kw);
    let reg=new RegExp(Kw);//创建一个正则表达式 匹配关键字
    // foodModel.find({name:{$regex:reg}})
    foodModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})
        .then((data)=>{
            if(data.length===0){
                res.send({err:0,msg:'商品id不存在'})
            }else(
                res.send({err:0,msg:'商品Id存在',list:data})
            )
        })
        .catch(()=>{
            return res.send({err:-1,msg:'查询出错'})
        })
})


/**
 * @api {post} /food/getInfoById _id查询
 * @apiName _id查询
 * @apiGroup Food
 *
 * @apiParam {Number} Id   _id
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/getInfoById',(req,res)=>{
    //$set $gte $or $and $regex regexp
    let {_id}=req.body;;
    console.log(_id);
    let reg=new RegExp(_id);//创建一个正则表达式 匹配关键字
    foodModel.findOne({"_id":_id})
        .then((data)=>{
            res.send({err:0,msg:'查询成功',data});
        })
        .catch((err)=>{
            console.log(err)
            return res.send({err:-1,msg:'查询出错'})
        })
})

/**
 * @api {post} /food/del 删除
 * @apiName 删除
 * @apiGroup Food
 *
 * @apiParam {Number} _id   商品ID
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/del',(req,res)=>{
    let {_id}=req.body;
    //单项删除
    foodModel.remove({_id})
        .then(()=>{
            res.send({err:0,msg:'删除成功'})
        })
        .catch(()=>{
            res.send({err:-1,msg:'删除失败'})
        })
    //多项删除将 foodModel.remove({_id:[_id1,_id2,_id3})
});

/**
 * @api {post} /food/update 修改
 * @apiName 修改
 * @apiGroup Food
 *
 * @apiParam {Number} _id   商品ID
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/update',(req,res)=>{
    let {name,price,desc,typename,typeId,img,_id}=req.body;
    foodModel.updateOne({_id},{name,price,desc,typename,typeId,img})
        .then((data)=>{
            console.log(data)
            res.send({err:0,msg:'修改成功',list:data})
        })
        .catch(()=>{
            res.send({err:-1,msg:'修改失败'})
        })
});


/**
 * @api {post} /food/getInfoByPage 分页查询
 * @apiName 分页查询
 * @apiGroup Food
 *
 * @apiParam {Number} pageSize  每页数据条数
 * @apiParam {Number} page  那一页
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.post('/getInfoByPage',(req,res)=>{
    let pageSize=req.body.pageSize || 2 ;//不传设为默认值
    let page=req.body.page||1 ;
    let count=0;
    foodModel.find()
        .then((list)=>{
            count=list.length; //总数据条数
            //mongodb  limit(number)读取指定数量的数据  skip()跳过数据的条数
            return foodModel.find().limit(Number(pageSize)).skip(Number(page-1)*pageSize)
        })
        .then((data)=>{
            // res.send({err:0,msg:'分页成功',list:data});
            let allpage=Math.ceil(count/pageSize);
            return res.send({err:0,msg:'分页成功',info:{list:data,count:count,allpage:allpage}})
        })
        .catch(()=>{
            res.send({err:0,msg:'分页成功'})
        })
})
//暴露router
module.exports=router;