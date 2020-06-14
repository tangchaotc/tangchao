/*
 * @Descripttion: 
 * @version: 
 * @Author: 唐超
 * @Date: 2020-06-11 15:02:13
 * @LastEditors: 唐超
 * @LastEditTime: 2020-06-14 21:23:22
 */
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var mysql = require('mysql');

// 解决跨域
app.all('*', function (req, res, next) {
    // 设置允许跨域到域名,*代表任意
    res.header('Access-Control-Allow-Origin', '*');
    // 允许的header的类型
    res.header('Access-Control-Allow-Headers', 'content-type');
    // 允许跨域到请求方式
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    if (req.method.toLowerCase() == 'options') {
        // 让options请求快速结束
        res.send(200);
    } else {
        next();
    }
})

// 以json数据返回
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'ry'
});
connection.connect();

//查询所有
app.get('/api/craft', (req, res) => {
    const sql = 'select * from craft'
    connection.query(sql, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log('查询成功')
        res.json(result)
    })
})

// 条件查询
app.get('/api/crafts', (req, res) => {
    var sql = 'select * from craft where id= ? or serial_number=? or order_number=?';
    var params = req.query;
    console.log(params);
    connection.query(sql, [params.id,params.serial_number,params.order_number], (err, result)=> {
        if (err) {
            console.log(err);
        }
        if (result) {
            res.json(result);
        }
    })
});


//删除
app.delete('/api/craft/:id', (req, res) => {
    const sql = 'delete from craft where id= ?'
    const data = [req.params.id]
    connection.query(sql, data, (result) => {
        console.log('删除成功')
        res.json(result)
    })
})

//插入一条数据
app.post('/api/craft', (req, res) => {
    const param = req.body;
    const sql = 'insert into craft set ?';
    const data = {
        order_number: param.order_number,
        name: param.name,
        serial_number: param.serial_number,
        product_model: param.product_model,
        structure: param.structure,
        build_line: param.build_line,
        line_speed: param.line_speed,
        isEnabled: param.isEnabled,
    }
    connection.query(sql, data, (result) => {
        console.log('添加成功');
        res.json(result);
    })
})

//修改
app.put('/api/craft/:id', (req, res) => {
    const sql = 'update craft set order_number= ?,name= ?,serial_number= ?,product_model= ?,structure= ?,build_line= ?,line_speed= ?,isEnabled= ? where id= ?'
    const data = [req.body.order_number, req.body.name, req.body.serial_number, req.body.product_model, req.body.structure, req.body.build_line, req.body.line_speed, req.body.isEnabled, req.body.id]
    connection.query(sql, data, (results) => {
        console.log('修改成功');
        res.json(results)
    })
})


// 监听端口
app.listen(3000)
console.log('启动成功:端口号3000')