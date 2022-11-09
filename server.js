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
        return res.redirect("home.html");
    }
    else{
        return res.redirect('login.html?error=1');
    }

})

app.listen(port, hostname, () => {
    console.log(`Server running at   http://${hostname}:${port}/register.html`);
});
