//1 引入mongoose
const mongoose=require('mongoose');

//2 开启数据库
mongoose.connect('mongodb://localhost/LZY',{ useUnifiedTopology: true });

//3链接数据库
var db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open', function() {
    console.log('db ok')
});