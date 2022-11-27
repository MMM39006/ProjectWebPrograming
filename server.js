const express = require('express');
const app = express();
const fs = require('fs');
const hostname = 'localhost';
const port = 3000;
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql');
const { count, Console } = require('console');
const { resolve } = require('path');
const { privateEncrypt } = require('crypto');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Markk.11251125",
    port: 3306,
    database: "computershop"
})

con.connect(err => {
    if(err) throw(err);
    else{
        console.log("MySQL connected");
    }
})

const queryDB = (sql) => {
    return new Promise((resolve,reject) => {
        // query method
        con.query(sql, (err,result, fields) => {
            if (err) reject(err);
            else
                resolve(result)
        })
    })
}

app.post('/registerDB', async (req,res) => {
    let sql = "CREATE TABLE IF NOT EXISTS user (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255), email VARCHAR(200), username VARCHAR(200), password VARCHAR(200))";
    let result = await queryDB(sql);

    if(req.body.password == req.body.Retypepassword){
        sql = `INSERT INTO user (firstname, lastname, email, username, password) VALUES ("${req.body.firstname}","${req.body.lastname}","${req.body.email}","${req.body.username}","${req.body.password}")`;
        result = queryDB(sql);
        console.log("New record create seccessfull");
        return res.redirect('login.html');
    }

    else{
        return res.redirect('register.html?error=1');
    }
})

app.get('/logout', (req,res) => {
    res.clearCookie('username');
    res.clearCookie('img');
    return res.redirect('login.html');
})

app.post('/loginDB',async (req,res) => {
    // ถ้าเช็คแล้ว username และ password ถูกต้อง
    // return res.redirect('feed.html');
    // ถ้าเช็คแล้ว username และ password ไม่ถูกต้อง
    // return res.redirect('login.html?error=1')
    
    let tablename = "user";
    let usernameLogin = req.body.username;
    let passwordLogin = req.body.password;

    let sql = `SELECT username, password FROM ${tablename}`
    let result = await queryDB(sql);
    result = Object.assign({},result);

    let userKeys = Object.keys(result);
    console.log(Object.keys(result).length);

    let Checklogin = false;

    for(var i = 0;i<Object.keys(result).length;i++){
        let usernameDB = result[userKeys[i]].username;
        let passwordDB = result[userKeys[i]].password;
        // let node =result[userKeys[i]];

        if(usernameLogin == usernameDB && passwordLogin == passwordDB){
            res.cookie('username',usernameDB);
            // res.cookie('img',node.img)
            Checklogin = true;
        }
    }
    
    if(Checklogin == true){
        let sql = "CREATE TABLE IF NOT EXISTS productdata (id int AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), type VARCHAR(255), price int,  img VARCHAR(255))";
        let result = await queryDB(sql);
        return res.redirect("home.html");
    }
    else{
        return res.redirect('login.html?error=1');
    }

})

app.get('/readPost', async (req,res) => {
    tablename = "productdata";

    sql = `SELECT * FROM ${tablename}`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})

app.get('/readDataCpu', async (req,res) => {
    tablename = "productdata";

    sql = `SELECT * FROM ${tablename} WHERE type = 'cpu'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})

app.get('/readDataMainboard', async (req,res) => {
    tablename = "productdata";

    sql = `SELECT * FROM ${tablename} WHERE type = 'mainboard'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})

app.get('/readDataVGA', async (req,res) => {
    tablename = "productdata";

    sql = `SELECT * FROM ${tablename} WHERE type = 'vga'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})

app.get('/readDataMenory', async (req,res) => {
    tablename = "productdata";

    sql = `SELECT * FROM ${tablename} WHERE type = 'ram'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})

app.get('/readDataHarddisk', async (req,res) => {
    tablename = "productdata";

    sql = `SELECT * FROM ${tablename} WHERE type = 'hdd'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})

app.get('/readDataPowerSuply', async (req,res) => {
    tablename = "productdata";

    sql = `SELECT * FROM ${tablename} WHERE type = 'pw'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})

app.get('/readDataCase', async (req,res) => {
    tablename = "productdata";

    sql = `SELECT * FROM ${tablename} WHERE type = 'case'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})


// app.get('/Cart', async (req,res) => {
//     // const queryString = window.location.search;

//     // console.log(queryString);
//     return res.redirect('Cart.html');
//     // return render_template('Cart.html');
// })

app.get('/GetCartData', async (req,res) => {
    tablename = "cart";

    sql = `SELECT * FROM ${tablename} WHERE customer = '${req.cookies.username}'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})


app.get('/Getquanity', async (req,res) => {
    tablename = "Cart";

    sql = `SELECT * FROM ${tablename} WHERE customer = '${req.cookies.username}'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})

app.get('/GetinfoUser', async (req,res) => {
    tablename = "user";

    sql = `SELECT * FROM ${tablename} WHERE username = '${req.cookies.username}'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    // console.log(req.cookies.username);
    res.json(result);
})

app.get('/GetCartPrice', async (req,res) => {
    tablename = "cart";

    sql = `SELECT * FROM ${tablename} WHERE customer = '${req.cookies.username}'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);
    res.json(result);
})

app.post('/AddItemToCart',async (req,res) => {
    let name = req.body.name;
    // console.log(name);

    tablename = "cart";
    let createsql = "CREATE TABLE IF NOT EXISTS cart (id int AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), price int,  img VARCHAR(255), quantity int, customer VARCHAR(255))";
    let resultcreate = await queryDB(createsql);

    const DataNameAddToCart = await req.body.name;
    
    // console.log(DataNameAddToCart);

    selectsql = `SELECT * FROM cart WHERE customer = '${req.cookies.username}'`;
    let resultselect = await queryDB(selectsql);
    resultselect = Object.assign({},resultselect);

    let ProductKeys = Object.keys(resultselect);
    // console.log("length : " + Object.keys(resultselect).length);

    if(Object.keys(resultselect).length == 0){
        // console.log("iiiiii");
        console.log("Insert=0");
        sql = `INSERT INTO cart (name, price, img, quantity, customer) VALUES ("${req.body.name}","${req.body.price}","${req.body.img}","${1}","${req.cookies.username}")`;
        result = await queryDB(sql);
        return res.redirect('Shopping.html');
    }
    if(Object.keys(resultselect).length > 0){
        // console.log("AAAAA");
        // console.log(Object.keys(result).length);

        for(var i = 0;i<Object.keys(resultselect).length;i++){
            // console.log(resultselect[ProductKeys[i]].name);
            // console.log(DataNameAddToCart);

            let iteminCart = resultselect[ProductKeys[i]].name;
            // console.log(iteminCart);
            // console.log(DataNameAddToCart);
            if(DataNameAddToCart == iteminCart){
                var quantity = 1;
                // console.log("update");
                quantity += resultselect[ProductKeys[i]].quantity;
                // console.log(quantity);
                sql = `UPDATE cart SET quantity = '${quantity}' WHERE name = '${iteminCart}' AND customer = '${req.cookies.username}'`;
                result = await queryDB(sql);

                sql = `SELECT name, price, img, quantity, price*quantity AS total_price FROM cart WHERE name = '${req.body.name}' AND customer = '${req.cookies.username}'`;
                result = await queryDB(sql);
                result = Object.assign({},result);
                // console.log(result);
                return res.redirect('Shopping.html');

                // return;
            }
            // * FROM ${tablename}
        }
        sql = `INSERT INTO cart (name, price, img, quantity, customer) VALUES ("${req.body.name}","${req.body.price}","${req.body.img}","${1}","${req.cookies.username}")`;
        result = await queryDB(sql)
        // console.log("Insert>1");

        sql = `SELECT name, price, img, quantity, price*quantity AS total_price FROM cart WHERE name = '${req.body.name}' AND customer = '${req.cookies.username}'`;
        // sql = `SELECT * FROM ${tablename}`;
        result = await queryDB(sql);
        result = Object.assign({},result);
        // console.log(result);
        return res.redirect('Shopping.html');

        // return;
        
    }
    // console.log(Object.keys(result).length);
    // console.log(result);
    // return res.redirect('Cart.html');
    res.json(result);
})

app.post('/removeitem',async (req,res) => {
    let name = req.body.name;
    // console.log(name);

    let sql = `DELETE FROM cart WHERE name = '${req.body.name}' AND customer = '${req.cookies.username}'`;
    result = await queryDB(sql);
    return res.redirect('Cart.html');
    // res.json(result);
})

app.get('/checkout', async (req,res) => {
    let sql = `DELETE FROM cart WHERE customer = '${req.cookies.username}'`;
    result = await queryDB(sql);
    result = Object.assign({},result);
    // console.log(result);\
    return res.redirect('Thankyou.html');
})

app.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/register.html`);
});
