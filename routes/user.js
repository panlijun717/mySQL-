const express=require("express");
const router=express.Router();
const mysql=require("mysql");

const pool = mysql.createPool({
    host: 'localhost',   //主机名
    user: 'root',		//用户名
    password: 'ddykD1p-PvOs',	//密码
    database: 'user',	//数据库名
    port: 3306			//端口号
})

router.use("/pan",function(req,res){
    var user = req.body.user;
    var pass = req.body.pass;
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(`SELECT * FROM list`, function (err, rows) {
            if (err) throw err;
            console.log(rows);
            if (rows.length == 0) {
                connection.query(`INSERT INTO list (user,pass) VALUES ('${user}','${pass}')`, function (err, rows) {
                    if (err) throw err;
                    res.send('注册成功')
                })
            } else {
                res.send('已注册')
            }
            connection.release();  //释放连接池
        })

    })
})

router.use("/login",function(req,res){
    var user = req.body.user;
    var pass = req.body.pass; 
    pool.getConnection(function(err,connection){
        if(err) throw err;
        connection.query(`SELECT * FROM list`,function(err,rows){
            if(err) throw err;
            for( i in rows){
                if(rows[i].user==user&&rows[i].pass==pass){
                    res.send("登录成功")
                    return;
                }
            }
            res.send("账号错误")
        })
    })
})

module.exports=router;