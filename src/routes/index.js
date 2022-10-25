
const homeRouter = require('./home')   
const cartRouter = require('./cart')  
const menuRouter = require('./menu') 
const accountRouter = require('./account')  
const adminRouter = require('./admin')   
const sitesRouter = require('./sites')  
function route(app) {  
    app.use('/', homeRouter)  
    app.use('/cart', cartRouter) 
    app.use('/menu', menuRouter)
    app.use('/account', accountRouter)
    app.use('/admin', adminRouter)  
    app.use('/sites', sitesRouter) 
} 
module.exports = route;