const Account = require('../models/Account')   
const Product = require('../models/Product')  
const Feedback = require('../models/Feedback') 
const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose');   
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken') 
const PAGE_SIZE = 10;
class AdminController {  
    // [GET] /admin/account 
    account(req, res, next) {   
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')  
            var name = req.cookies.name   
            var avatar = req.cookies.avatar  
            var page = parseInt(req.query.page);   
            if(ketqua) {      
Account.findById(ketqua._id)  
    .then((accounts) => {  
        if(accounts.role == 'admin') {   
                if (page) {   
                    if (page < 1) { page = 1 } 
                    var soLuongBoQua = (page - 1) * PAGE_SIZE   
                    Promise.all([Account.find({}).skip(soLuongBoQua).limit(PAGE_SIZE), Account.countDocumentsDeleted()])  
                        .then(([accounts, deletedCount]) => { 
                            Account.countDocuments({}).then((total)=>{   
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('admin/account', {    
                                    layout: false, 
                                    deletedCount,
                                    tongSoPage, 
                                    avatar,
                                    name,
                                    accounts: mutipleMongooseToObject(accounts),
                                });
                            })
                        }) 
                        .catch(next)
                } else { 
                    Promise.all([Account.find({}), Account.countDocumentsDeleted()])  
                        .then(([accounts, deletedCount]) => { 
                            Account.countDocuments({}).then((total)=>{  
                                var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                res.render('admin/account', {  
                                    layout: false, 
                                    deletedCount,
                                    tongSoPage,  
                                    avatar,
                                    name,
                                    accounts: mutipleMongooseToObject(accounts),
                                });
                            })
                        }) 
                        .catch(next);
                } 
        } else { 
            res.redirect('/')
        }
    })

            }
        } catch (error) {
            res.redirect('/account/login')
        }
    }  
    // [GET] /admin/account/:id/edit
    editAccount(req, res, next) {
        Account.findById(req.params.id)
            .then((accounts) => {
                res.render('admin/editAccount', { 
                    layout: false,
                    accounts: mongooseToObject(accounts),
                });
            })
            .catch(next); 
    }  
    // [PUT] /admin/account/:id
    updateAccount(req, res, next) {
        Account.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/account'))
            .catch(next);  
    }  
    // [DELETE] /admin/account/:id
    destroyAccount(req, res, next) {
        Account.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }  
    // [DELETE] /account/:id/force
    forceDestroyAccount(req, res, next) {
        Account.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }   
    // [GET] /admin/account/trash
    trashAccount(req, res, next) {
        Account.findDeleted()
            .then((accounts) => {
                res.render('admin/trashAccount', { 
                    layout: false,
                    accounts: mutipleMongooseToObject(accounts),
                });
            })
            .catch(next); 
    }  
    // [PATCH] /admin/account/:id/restore  
    restoreAccount(req, res, next) {
        Account.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    } 
    // [GET] /admin/warehouse 
    warehouse(req, res, next) {   
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')   
            var name = req.cookies.name 
            var avatar = req.cookies.avatar
            if(ketqua) {   
                Account.findById(ketqua._id)  
                    .then((accounts) => {  
                        if(accounts.role == 'admin') {   
                        var page = parseInt(req.query.page);   
                        if (page) {   
                            if (page < 1) { page = 1 } 
                            var soLuongBoQua = (page - 1) * PAGE_SIZE   
                            Promise.all([Product.find({}).skip(soLuongBoQua).limit(PAGE_SIZE), Product.countDocumentsDeleted()])  
                                .then(([products, deletedCount]) => { 
                                    Product.countDocuments({}).then((total)=>{  
                                        var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                        res.render('admin/warehouse', {  
                                            layout: false, 
                                            deletedCount,
                                            tongSoPage,  
                                            avatar,
                                            name,
                                            products: mutipleMongooseToObject(products),
                                        });
                                    })
                                }) 
                                .catch(next)
                        } else { 
                            Promise.all([Product.find({}), Product.countDocumentsDeleted()]) 
                                .then(([products, deletedCount]) => { 
                                    Product.countDocuments({}).then((total)=>{  
                                        var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                        res.render('admin/warehouse', {  
                                            layout: false, 
                                            deletedCount,
                                            tongSoPage,   
                                            avatar,
                                            name,
                                            products: mutipleMongooseToObject(products),
                                        });
                                    })
                                }) 
                                .catch(next);
                        }       
                        } else {  
                            res.redirect('/')
                        }
                })
            }
        } catch (error) {
            res.redirect('/account/login')
        }  
    }   
    // [GET] /admin/warehouse/:id/edit
    editWarehouse(req, res, next) {
        Product.findById(req.params.id)
            .then((products) => {
                res.render('admin/editWarehouse', { 
                    layout: false,
                    products: mongooseToObject(products),
                });
            })
            .catch(next); 
    }  
    // [PUT] /admin/warehouse/:id
    updateWarehouse(req, res, next) {
        Product.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/warehouse'))
            .catch(next);  
    }   
    // [DELETE] /admin/warehouse/:id
    destroyWarehouse(req, res, next) {
        Product.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    } 
    // [GET] /admin/warehouse/trash
    trashWarehouse(req, res, next) {
        Product.findDeleted()
            .then((products) => {
                res.render('admin/trashWarehouse', { 
                    layout: false,
                    products: mutipleMongooseToObject(products),
                });
            })
            .catch(next); 
    } 
    // [PATCH] /admin/account/:id/restore  
    restoreWarehouse(req, res, next) {
        Product.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }    
    // [DELETE] /admin/warehouse/:id/force
    forceDestroyWarehouse(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }    
    // [GET] /admin/warehouse/post 
    postWarehouse(req, res, next) {
        Product.find({}).exec()
            .then((products) => {
                res.render('admin/createProduct', { 
                    layout: false,
                    products: mutipleMongooseToObject(products),
                });
            })
            .catch(next);
    }  
    // [POST] /admin/warehouse/create
    createWarehouse(req, res, next) {
        // Tạo mới một Object theo kiểu Constructor
        const product = new Product(req.body);
        product
            .save()  
            .then(() => res.redirect('/admin/warehouse'))
            .catch((error) => {});   
    } 
    // [GET] /admin/feedback
    feedback(req, res, next) {   
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')   
            var name = req.cookies.name 
            var avatar = req.cookies.avatar 
            if(ketqua) {   
                Account.findById(ketqua._id)  
                .then((accounts) => {  
                    if(accounts.role == 'admin') {   
                    var page = parseInt(req.query.page);   
                        if (page) {   
                            if (page < 1) { page = 1 } 
                            var soLuongBoQua = (page - 1) * PAGE_SIZE   
                            Promise.all([Feedback.find({}).skip(soLuongBoQua).limit(PAGE_SIZE), Feedback.countDocumentsDeleted()])  
                                .then(([feedbacks, deletedCount]) => { 
                                    Feedback.countDocuments({}).then((total)=>{  
                                        var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                        res.render('admin/feedback', {  
                                            layout: false, 
                                            deletedCount,
                                            tongSoPage,  
                                            avatar,
                                            name,
                                            feedbacks: mutipleMongooseToObject(feedbacks),
                                        });
                                    })
                                }) 
                                .catch(next)
                        } else { 
                            Promise.all([Feedback.find({}), Feedback.countDocumentsDeleted()])  
                                .then(([feedbacks, deletedCount]) => { 
                                    Feedback.countDocuments({}).then((total)=>{  
                                        var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                        res.render('admin/feedback', {  
                                            layout: false, 
                                            deletedCount,
                                            tongSoPage,  
                                            avatar,
                                            name,
                                            feedbacks: mutipleMongooseToObject(feedbacks),
                                        });
                                    })
                                }) 
                                .catch(next);
                        }
                    } else  {  
                        res.redirect('/')
                    }
                })
            }
        } catch (error) {
            res.redirect('/account/login')
        }
    }   
     // [GET] /admin/feedback/:id/edit
    editFeedback(req, res, next) {
        Feedback.findById(req.params.id)
            .then((feedbacks) => {
                res.render('admin/editFeedback', { 
                    layout: false,
                    feedbacks: mongooseToObject(feedbacks),
                });
            })
            .catch(next); 
    }   
    // [PUT] /admin/feedback/:id
    updateFeedback(req, res, next) {
        Feedback.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/feedback'))
            .catch(next);  
    }    
    // [DELETE] /admin/feedback/:id
    destroyFeedback(req, res, next) {
        Feedback.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }  
    // [GET] /admin/feedback/trash
    trashFeedback(req, res, next) {
        Feedback.findDeleted()
            .then((feedbacks) => {
                res.render('admin/trashFeedback', { 
                    layout: false,
                    feedbacks: mutipleMongooseToObject(feedbacks),
                });
            })
            .catch(next); 
    }   
    // [PATCH] /admin/feedback/:id/restore  
    restoreFeedback(req, res, next) {
        Feedback.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }   
    // [DELETE] /admin/feedback/:id/force
    forceDestroyFeedback(req, res, next) {
        Feedback.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }     
    // [GET] /admin/search
    searchAccount(req, res, next) {    
        var search = req.query.search   
        Promise.all( 
            [Account.find({  
                "$or" : [  
                    {name : new RegExp(search, 'i')}, 
                    {email : new RegExp(search, 'i')}, 
                    {phone : new RegExp(search, 'i')},  
                    {username : new RegExp(search, 'i')}
                ]
            }), Account.countDocumentsDeleted()])
            .then(([accounts, deletedCount]) =>
                res.render('admin/account', { 
                    layout: false,
                    deletedCount,
                    accounts: mutipleMongooseToObject(accounts),
                }),
            )
            .catch(next);  
    }    
    // [GET] /admin/search/trash
    searchAccountTrash(req, res, next) {   
        var search = req.query.search 
        // var filter = req.query.filter
        Promise.all( 
            [Account.findDeleted({  
                "$or" : [  
                    {name : new RegExp(search, 'i')}, 
                    {email : new RegExp(search, 'i')}, 
                    {phone : new RegExp(search, 'i')},  
                    {username : new RegExp(search, 'i')}
                ]
            }),  
        Account.countDocumentsDeleted()])
            .then(([accounts, deletedCount]) =>
                res.render('admin/trashAccount', { 
                    layout: false,
                    deletedCount,
                    accounts: mutipleMongooseToObject(accounts),
                }),
            )
            .catch(next);  
    }   
    // [GET] /admin/search
    searchWarehouse(req, res, next) {   
        var search = req.query.search 
        // var filter = req.query.filter
        Promise.all( 
            [Product.find({  
                "$or" : [  
                    {name : new RegExp(search, 'i')}, 
                    {price : new RegExp(search, 'i')}, 
                    {category : new RegExp(search, 'i')}
                ]
            }),  
            Product.countDocumentsDeleted()])
            .then(([products, deletedCount]) =>
                res.render('admin/warehouse', { 
                    layout: false,
                    deletedCount,
                    products: mutipleMongooseToObject(products),
                }),
            )
            .catch(next);   
    }     
    // [GET] /admin/search/trash
    searchWarehouseTrash(req, res, next) {   
        var search = req.query.search 
        // var filter = req.query.filter
        Promise.all( 
            [Product.findDeleted({  
                "$or" : [  
                    {name : new RegExp(search, 'i')}, 
                    {price : new RegExp(search, 'i')}, 
                    {category : new RegExp(search, 'i')}
                ]
            }), 
            Product.countDocumentsDeleted()])
            .then(([products, deletedCount]) =>
                res.render('admin/trashWarehouse', { 
                    layout: false,
                    deletedCount,
                    products: mutipleMongooseToObject(products),
                }),
            )
            .catch(next);  
    }  
    // [GET] /admin/search
    searchFeedback(req, res, next) {   
        var search = req.query.search 
        // var filter = req.query.filter
        Promise.all( 
            [Feedback.find({  
                "$or" : [  
                    {fullname : new RegExp(search, 'i')}, 
                    {email : new RegExp(search, 'i')}, 
                    {phone : new RegExp(search, 'i')}, 
                    {content : new RegExp(search, 'i')}
                ]
            }),  
            Feedback.countDocumentsDeleted()])
            .then(([feedbacks, deletedCount]) =>
                res.render('admin/feedback', { 
                    layout: false,
                    deletedCount,
                    feedbacks: mutipleMongooseToObject(feedbacks),
                }),
            )
            .catch(next);   
    }    
    // [GET] /admin/search/trash
    searchFeedbackTrash(req, res, next) {   
        var search = req.query.search 
        // var filter = req.query.filter
        Promise.all( 
            [Feedback.findDeleted({  
                "$or" : [  
                    {fullname : new RegExp(search, 'i')}, 
                    {email : new RegExp(search, 'i')}, 
                    {phone : new RegExp(search, 'i')}, 
                    {content : new RegExp(search, 'i')}
                ]
            }),  
            Feedback.countDocumentsDeleted()])
            .then(([feedbacks, deletedCount]) =>
                res.render('admin/trashFeedback', { 
                    layout: false,
                    deletedCount,
                    feedbacks: mutipleMongooseToObject(feedbacks),
                }),
            )
            .catch(next);  
    }  
}  
module.exports = new AdminController; 