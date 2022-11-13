const Product = require('../models/Product')  
const Comment = require('../models/Comment')  
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
            var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            } 
            if(ketqua) {  
                var name = req.cookies.name 
                var avatar = req.cookies.avatar 
                var page = parseInt(req.query.page); 
                if (page) {  
                    // Get Page bằng pagination 
                    var soLuongBoQua = (page - 1) * PAGE_SIZE  
                    Product.find({}).skip(soLuongBoQua).limit(PAGE_SIZE) 
                    .then((products) => { 
                        Product.countDocuments({}).then((total)=>{  
                            var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                            res.render('menu', {   
                                avatar, name, tongSoPage, 
                                quantityCart,
                                products: mutipleMongooseToObject(products),
                            });
                        })
                    }) 
                    .catch(next);
                } else {  
                    // Get ALL
                    Product.find({}).exec() 
                        .then((products) => {   
                            Product.countDocuments({}).then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('menu', {   
                                    avatar,  
                                    name, 
                                    tongSoPage,  
                                    quantityCart,
                                    products: mutipleMongooseToObject(products),
                                });
                            })
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
            var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            } 
            if(ketqua) {  
                var name = req.cookies.name 
                var avatar = req.cookies.avatar 
                var page = parseInt(req.query.page); 
                if (page) {  
                    // Get Page bằng pagination 
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                    Product.find({ category: 'Tra-hoa-qua' }) 
                        .skip(soLuongBoQua) 
                        .limit(PAGE_SIZE) 
                        .then((productsTraHoaQua) => { 
                            Product.countDocuments({category: 'Tra-hoa-qua'}) 
                                .then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE)  
                                res.render('productDetails/trahoaqua', {  
                                    avatar, 
                                    name, 
                                    tongSoPage,  
                                    quantityCart,
                                    productsTraHoaQua: mutipleMongooseToObject(productsTraHoaQua),
                                });
                            })
                        })
                        .catch(next); 
                } else { 
                // Get All 
                Product.find({ category: 'Tra-hoa-qua' }).exec()
                    .then((productsTraHoaQua) => {   
                        Product.find({ category: 'Tra-hoa-qua' }).countDocuments({}) 
                        .then((total)=>{  
                            var tongSoPage = Math.ceil(total / PAGE_SIZE)  
                            res.render('productDetails/trahoaqua', {   
                                avatar,  
                                name, 
                                tongSoPage,  
                                quantityCart,
                                productsTraHoaQua: mutipleMongooseToObject(productsTraHoaQua),
                            });
                        })
                    })
                    .catch(next);
                }
            } 
        } catch (error) {
            res.redirect('/account/login')
        }
    }   
    // [GET] /menu/tra-hoa-qua/tra-vai 
    travai(req, res, next) {  
        var name = req.cookies.name  
        var avatar = req.cookies.avatar 
        var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            }
        Comment.find({}) 
            .then((comments) => { 
                res.render('detail/travai', {  
                    name, avatar, quantityCart,
                    comments: mutipleMongooseToObject(comments)
                })
            }) 
            .catch(next)
    } 
    travaiComment(req, res, next) {    
        var name = req.cookies.name  
        var avatar = req.cookies.avatar   
        var comment = req.body.comment  
        
        Comment.create( 
            { name: name, avatar: avatar, comment: comment},  
        );   
        res.redirect('/menu/tra-vai')
    }
     // [GET] /menu/smoothies 
    smoothies(req, res, next) {    
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')   
            var quantityCart
                if(typeof req.session.cart == "undefined") { 
                    quantityCart = 0
                } else { 
                    quantityCart = req.session.cart.length
                }
            if(ketqua) {  
                var name = req.cookies.name  
                var avatar = req.cookies.avatar 
                var page = parseInt(req.query.page); 
                if (page) {  
                    // Get Page bằng pagination 
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                    Product.find({ category: 'Smoothies' }) 
                        .skip(soLuongBoQua) 
                        .limit(PAGE_SIZE) 
                        .then((productsSmoothies) => {  
                            Product.countDocuments({category: 'Smoothies'}).then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/smoothies', {   
                                    avatar, 
                                    name,
                                    tongSoPage, 
                                    quantityCart,
                                    productsSmoothies: mutipleMongooseToObject(productsSmoothies),
                                });
                            })
                        })
                        .catch(next); 
                } else {  
                    // Get All
                    Product.find({ category: 'Smoothies' }).exec()
                        .then((productsSmoothies) => {   
                            Product.find({ category: 'Smoothies' }).countDocuments({}) 
                            .then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/smoothies', {   
                                    avatar, 
                                    name,
                                    tongSoPage,  
                                    quantityCart,
                                    productsSmoothies: mutipleMongooseToObject(productsSmoothies),
                                });
                            })
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
            var quantityCart
            if(typeof req.session.cart == "undefined") { 
                quantityCart = 0
            } else { 
                quantityCart = req.session.cart.length
            }
            if(ketqua) {  
                var name = req.cookies.name 
                var avatar = req.cookies.avatar 
                var page = parseInt(req.query.page); 
                if (page) {  
                    // Get Page bằng pagination 
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                    Product.find({ category: 'Ca-phe' }) 
                        .skip(soLuongBoQua) 
                        .limit(PAGE_SIZE) 
                        .then((productsCaphe) => { 
                            Product.countDocuments({category: 'Smoothies'}).then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/caphe', {   
                                    avatar, 
                                    name,
                                    tongSoPage, 
                                    quantityCart,
                                    productsCaphe: mutipleMongooseToObject(productsCaphe),
                                });
                            })
                        })
                        .catch(next); 
                } else { 
                // Get All
                    Product.find({ category: 'Ca-phe' }).exec()
                        .then((productsCaphe) => {   
                            Product.find({ category: 'Ca-phe' }).countDocuments({}) 
                            .then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/caphe', {   
                                    avatar, 
                                    name,
                                    tongSoPage,  
                                    quantityCart,
                                    productsCaphe: mutipleMongooseToObject(productsCaphe),
                                });
                            })
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
                var avatar = req.cookies.avatar 
                var page = parseInt(req.query.page); 
                if (page) {  
                    // Get Page bằng pagination   
                    var soLuongBoQua = (page - 1) * PAGE_SIZE
                    Product.find({ category: 'Banh-ngot' }) 
                        .skip(soLuongBoQua) 
                        .limit(PAGE_SIZE) 
                        .then((productsBanhngot) => { 
                            Product.countDocuments({category: 'Banh-ngot'}).then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/banhngot', {   
                                    avatar, 
                                    name,
                                    tongSoPage,
                                    productsBanhngot: mutipleMongooseToObject(productsBanhngot),
                                });
                            })
                        })
                        .catch(next); 
                } else { 
                    // Get All
                    Product.find({ category: 'Banh-ngot' }).exec()
                        .then((productsBanhngot) => {   
                            Product.find({ category: 'Banh-ngot' }).countDocuments({}) 
                            .then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('productDetails/banhngot', {   
                                    avatar,  
                                    name,
                                    tongSoPage, 
                                    productsBanhngot: mutipleMongooseToObject(productsBanhngot),
                                });
                            })
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