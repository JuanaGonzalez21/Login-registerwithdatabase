const express = require('express');
const {engine} = require('express-handlebars');
const myconnnection =require('express-myconnection');
const mysql=require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');

const loginRoutes = require('./routes/login');

const app = express()
app.set('port',5000);

app.set('views', __dirname + '/views')
app.engine('.hbs', engine({
    extname: '.hbs',
}));

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

//Conexion bd

app.use(myconnnection(mysql,{
    host:'localhost',
    user:'root',
    password:'',
    port: 3306,
    database: 'loginbd'

}));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.listen(app.get('port'),()=>{
    console.log('Corriendo por el puerto ', app.get('port'));
});

app.use('/', loginRoutes);

app.get('/', (req,res)=>{
    if(req.session.loggedin == true){
        let name = req.session.name;

 		res.render('home', { name });
    }else {
        res.redirect('/login')
    }
})
//Style 
