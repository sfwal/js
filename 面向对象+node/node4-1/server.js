const express = require("express");
const mysql = require("mysql");
const consolidate = require("consolidate");
const ejs = require("ejs");
const expressStatic = require("express-static");
const public = require("./libs/public");


//连接池
const db = mysql.createPool({host:'localhost',user:'root',password:'root',database:'blog'});

var server = express();
server.listen(8080);

//配置模板引擎
//输出什么东西？
server.set('view engine','html');
//模板文件放在哪里？
server.set('views','./template');
//哪一种模板引擎
server.engine('html',consolidate.ejs);

server.get("/",(req,res,next) => {
  //查询banner表
  db.query('SELECT * FROM banner',(err,data) => {
    if(err){
      res.status(500).send("error").end();
    }else{
      res.banners = data;
      // res.render('index.ejs',{banners:data})
      next();
    }
  })
})
//查询文章
server.get("/",(req,res,next) => {
  db.query('SELECT * FROM articel',(err,data) => {
    if(err){
      res.send("error");
    }else{
      res.article = data;
      next();
    }
  })
})
server.get("/",(req,res) => {
  res.render("index.ejs",{banners:res.banners,article:res.article});
})

server.get("/article",(req,res) => {
  console.log(req.query.id)
  if(req.query.id){
    db.query(`SELECT * FROM articel WHERE ID = ${req.query.id}`,(err,data) => {
      if(err){
        res.send("error");
      }else{
        var articleData = data[0];
        articleData.newtime = public.time2date(articleData.time);
        articleData.content = articleData.content.replace(/^/gm,'<p>').replace(/$/gm,'</p>');
        res.render("conText.ejs",{content:articleData})
      }
    })
  }

})

server.use(expressStatic("./www"))
