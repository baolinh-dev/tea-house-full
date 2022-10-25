const Product = require('../models/Product') 
const { mutipleMongooseToObject } = require('../../util/mogoose')  
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken') 
const PAGE_SIZE = 8
class MenuController { 
    // [GET] /menu
    index(req, res, next) {       
        try {            
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')  
            if(ketqua) {  
                var name = req.cookies.name
                var page = parseInt(req.query.page); 
                if (page) {  
                    if (page < 1) { 
                        page = 1
                    }
                    // get page   
                    var soLuongBoQua = (page - 1) * PAGE_SIZE  
                    Product.find({}).skip(soLuongBoQua).limit(PAGE_SIZE) 
                    .then((products) => { 
                        Product.countDocuments({}).then((total)=>{  
                            var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                            res.render('menu', {  
                                name,
                                tongSoPage,
                                products: mutipleMongooseToObject(products),
                            });
                        })
                    }) 
                    .catch(next);
                } else {  
                    // get all
                    Product.find({}).exec() 
                    var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                        .then((products) => { 
                            res.render('menu', { 
                                products: mutipleMongooseToObject(products),
                            });
                        })
                        .catch(next);
                }
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    }   
     // [GET] /menu/tra-hoa-qua
    trahoaqua(req, res, next) {    
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')  
            if(ketqua) {  
                var name = req.cookies.name
                var page = parseInt(req.query.page); 
                if (page) {  
                    if (page < 1) { 
                        page = 1
                    }
                    // get page   
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                Product.find({ category: 'Tra-hoa-qua' }) 
                    .skip(soLuongBoQua) 
                    .limit(PAGE_SIZE) 
                    .then((productsTraHoaQua) => { 
                        Product.countDocuments({category: 'Tra-hoa-qua'}) 
                            .then((total)=>{  
                            var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                            res.render('productDetails/trahoaqua', { 
                                name, 
                                tongSoPage,
                                productsTraHoaQua: mutipleMongooseToObject(productsTraHoaQua),
                            });
                        })
                    })
                    .catch(next); 
                } else {
                Product.find({ category: 'Tra-hoa-qua' }).exec()
                    .then((productsTraHoaQua) => {
                        res.render('productDetails/trahoaqua', {
                            productsTraHoaQua: mutipleMongooseToObject(productsTraHoaQua),
                        });
                    })
                    .catch(next);
                }
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    }  
     // [GET] /menu/smoothies 
    smoothies(req, res, next) {    
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')  
            if(ketqua) {  
                var name = req.cookies.name
                var page = parseInt(req.query.page); 
                if (page) {  
                    if (page < 1) { 
                        page = 1
                    }
                    // get page   
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                Product.find({ category: 'Smoothies' }) 
                    .skip(soLuongBoQua) 
                    .limit(PAGE_SIZE) 
                    .then((productsSmoothies) => {  
                        Product.countDocuments({category: 'Smoothies'}).then((total)=>{  
                            var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                            res.render('productDetails/smoothies', {  
                                name,
                                tongSoPage,
                                productsSmoothies: mutipleMongooseToObject(productsSmoothies),
                            });
                        })
                    })
                    .catch(next); 
                } else {
                Product.find({ category: 'Smoothies' }).exec()
                    .then((productsSmoothies) => {
                        res.render('productDetails/smoothies', {
                            productsSmoothies: mutipleMongooseToObject(productsSmoothies),
                        });
                    })
                    .catch(next);
                }
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    }
     // [GET] /menu/ca-phe 
    caphe(req, res, next) {  
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')  
            if(ketqua) {  
                var name = req.cookies.name
                var page = parseInt(req.query.page); 
                if (page) {  
                    if (page < 1) { 
                        page = 1
                    }
                    // get page   
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                Product.find({ category: 'Ca-phe' }) 
                    .skip(soLuongBoQua) 
                    .limit(PAGE_SIZE) 
                    .then((productsCaphe) => { 
                        Product.countDocuments({category: 'Smoothies'}).then((total)=>{  
                            var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                            res.render('productDetails/caphe', {  
                                name,
                                tongSoPage,
                                productsCaphe: mutipleMongooseToObject(productsCaphe),
                            });
                        })
                    })
                    .catch(next); 
                } else {
                Product.find({ category: 'Ca-phe' }).exec()
                    .then((productsCaphe) => {
                        res.render('productDetails/caphe', {
                            productsCaphe: mutipleMongooseToObject(productsCaphe),
                        });
                    })
                    .catch(next);
                }
            } 
        } catch (error) {
            res.redirect('/account/login')
        }  
    }  
     // [GET] /menu/banh-ngot
    banhngot(req, res, next) {    
        try {            
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')  
            if(ketqua) {  
                var name = req.cookies.name
                var page = parseInt(req.query.page); 
                if (page) {  
                    if (page < 1) { 
                        page = 1
                    }
                    // get page   
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                Product.find({ category: 'Banh-ngot' }) 
                    .skip(soLuongBoQua) 
                    .limit(PAGE_SIZE) 
                    .then((productsBanhngot) => { 
                        Product.countDocuments({category: 'Banh-ngot'}).then((total)=>{  
                            var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                            res.render('productDetails/banhngot', {  
                                name,
                                tongSoPage,
                                productsBanhngot: mutipleMongooseToObject(productsBanhngot),
                            });
                        })
                    })
                    .catch(next); 
                } else {
                Product.find({ category: 'Banh-ngot' }).exec()
                    .then((productsBanhngot) => {
                        res.render('productDetails/banhngot', {
                            productsBanhngot: mutipleMongooseToObject(productsBanhngot),
                        });
                    })
                    .catch(next);
                }
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    }  
} 
module.exports = new MenuController;