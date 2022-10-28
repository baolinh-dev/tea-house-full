const Account = require('../src/app/models/Account')    
const Product = require('../src/app/models/Product')  
const { mongooseToObject } = require('../src/util/mogoose');
const { mutipleMongooseToObject } = require('../src/util/mogoose'); 
const { engine } = require('express-handlebars'); 
const express = require('express')  
const morgan = require('morgan')  
const methodOverride = require('method-override');   
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken') 
const path = require('path');
const app = express()
const port = 3000     

// Cookies 
app.use(cookieParser())
// file co ten index thi khong can nap vao
const route = require('./routes') 
// Connect to DB 
const db = require('./config/db'); 
const { time } = require('console');
db.connect() 
// Fix body POST method 
app.use(express.urlencoded({ 
  extended: true
})); 
app.use(express.json());  
// Method Override 
app.use(methodOverride('_method'))
// Static file localhost:3000 -> public  
// public -> Domain name -> public/img/logo.png === Domain name/img/logo.png
app.use(express.static(path.join(__dirname, 'public')))
// HTTP logger resquest
app.use(morgan('combined')) 
// HandleBars 
app.engine('handlebars', engine()); 
app.engine('.hbs', engine( 
  { 
    extname: '.hbs', 
    helpers: {
      sum(a, b) { return a + b },  
      times: function(n, block) { 
        var accum = '';
        for(var i = 0; i < n; ++i)
            accum += block.fn(i);
        return accum;
      }
  } 
  }
));  
app.set('view engine', 'hbs'); 
app.set('views', path.join(__dirname, 'resources', 'views'));   
// Route Init  
route(app)      
// 404 Not Found 
app.use((req, res) => { 
  return res.render('404', { 
    layout: false
  })
})
// Delete Cookies 
app.get('/account/logout',(req, res, next)=>{ 
  res.clearCookie('name')  
  res.clearCookie('token') 
  res.redirect('/account/login')
})

// Nhận vào cổng PORT và chạy app    
app.listen(port, () => {
  console.log(`Example app listening on port ${port} http://localhost:${port}`)
})  

