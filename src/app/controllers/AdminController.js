const Account = require('../models/Account')   
const Product = require('../models/Product')  
const Feedback = require('../models/Feedback')  
const Comment = require('../models/Comment') 
const Order = require('../models/Order') 
const { mongooseToObject } = require('../../util/mogoose');
const { mutipleMongooseToObject } = require('../../util/mogoose');   
const cookieParser = require('cookie-parser') 
const jwt = require('jsonwebtoken') 
const PAGE_SIZE = 8;
class AdminController {  
    // [GET] /admin/account 
    account(req, res, next) {   
        try {
            var token = req.cookies.token
            var ketqua = jwt.verify(token, 'matkhau')  
            var name = req.cookies.name  
            console.log(name);  
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
        var name = req.cookies.name 
        var avatar = req.cookies.avatar 
        Account.findById(req.params.id)
            .then((accounts) => {
                res.render('admin/editAccount', { 
                    layout: false, 
                    name, avatar, 
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
        var name = req.cookies.name   
        var avatar = req.cookies.avatar  
        Account.findDeleted()
            .then((accounts) => {
                res.render('admin/trashAccount', {  
                    name, avatar, 
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
        var name = req.cookies.name 
        var avatar = req.cookies.avatar 
        Product.findById(req.params.id)
            .then((products) => {
                res.render('admin/editWarehouse', {  
                    name, avatar, 
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
        var name = req.cookies.name 
        var avatar = req.cookies.avatar
        Product.findDeleted()
            .then((products) => {
                res.render('admin/trashWarehouse', {  
                    name, avatar, 
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
    // [GET] /admin/comment 
    comment(req, res, next) {   
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
                            Promise.all([Comment.find({}).skip(soLuongBoQua).limit(PAGE_SIZE), Comment.countDocumentsDeleted()])  
                                .then(([comments, deletedCount]) => { 
                                    Comment.countDocuments({}).then((total)=>{  
                                        var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                        res.render('admin/comment', {  
                                            layout: false, 
                                            deletedCount,
                                            tongSoPage,  
                                            avatar,
                                            name,
                                            comments: mutipleMongooseToObject(comments),
                                        });
                                    })
                                }) 
                                .catch(next)
                        } else { 
                            Promise.all([Comment.find({}), Comment.countDocumentsDeleted()])  
                                .then(([comments, deletedCount]) => { 
                                    Comment.countDocuments({}).then((total)=>{  
                                        var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                        res.render('admin/comment', {  
                                            layout: false, 
                                            deletedCount,
                                            tongSoPage,  
                                            avatar,
                                            name,
                                            comments: mutipleMongooseToObject(comments),
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
    // [GET] /admin/order 
    order(req, res, next) {   
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
                            Promise.all([Order.find({}).skip(soLuongBoQua).limit(PAGE_SIZE), Order.countDocumentsDeleted()])  
                                .then(([orders, deletedCount]) => { 
                                    Order.countDocuments({}).then((total)=>{  
                                        var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                        res.render('admin/order', {  
                                            layout: false, 
                                            deletedCount,
                                            tongSoPage,  
                                            avatar,
                                            name,
                                            orders: mutipleMongooseToObject(orders),
                                        });
                                    })
                                }) 
                                .catch(next)
                        } else { 
                            Promise.all([Order.find({}), Order.countDocumentsDeleted()])  
                                .then(([orders, deletedCount]) => { 
                                    Order.countDocuments({}).then((total)=>{  
                                        var tongSoPage = Math.ceil(total / PAGE_SIZE) 
                                        res.render('admin/order', {  
                                            layout: false, 
                                            deletedCount,
                                            tongSoPage,  
                                            avatar,
                                            name,
                                            orders: mutipleMongooseToObject(orders),
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
        var name = req.cookies.name 
        var avatar = req.cookies.avatar 
        Feedback.findById(req.params.id)
            .then((feedbacks) => {
                res.render('admin/editFeedback', {  
                    name, avatar, 
                    layout: false,
                    feedbacks: mongooseToObject(feedbacks),
                });
            })
            .catch(next); 
    }   
    // [GET] /admin/comment/:id/edit
    editComment(req, res, next) { 
        var name = req.cookies.name 
        var avatar = req.cookies.avatar  
        Comment.findById(req.params.id)
            .then((comments) => {
                res.render('admin/editComment', {  
                    name, avatar, 
                    layout: false,
                    comments: mongooseToObject(comments),
                });
            })
            .catch(next); 
    }   
    // [GET] /admin/order/:id/edit
    editOrder(req, res, next) { 
        var name = req.cookies.name 
        var avatar = req.cookies.avatar 
        Order.findById(req.params.id)
            .then((orders) => {
                res.render('admin/editOrder', {  
                    name, avatar, 
                    layout: false,
                    orders: mongooseToObject(orders),
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
    // [PUT] /admin/comment/:id
    updateComment(req, res, next) {
        Comment.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/comment'))
            .catch(next);  
    }    
    // [PUT] /admin/order/:id
    updateOrder(req, res, next) {
        Order.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/order'))
            .catch(next);  
    }    
    // [DELETE] /admin/feedback/:id
    destroyFeedback(req, res, next) {
        Feedback.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }  
    // [DELETE] /admin/comment/:id
    destroyComment(req, res, next) {
        Comment.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }  
    // [DELETE] /admin/order/:id
    destroyOrder(req, res, next) {
        Order.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }  
    // [GET] /admin/feedback/trash
    trashFeedback(req, res, next) { 
        var name = req.cookies.name 
        var avatar = req.cookies.avatar 
        Feedback.findDeleted()
            .then((feedbacks) => {
                res.render('admin/trashFeedback', {  
                    name, avatar, 
                    layout: false,
                    feedbacks: mutipleMongooseToObject(feedbacks),
                });
            })
            .catch(next); 
    }   
    // [GET] /admin/comment/trash
    trashComment(req, res, next) { 
        var name = req.cookies.name 
        var avatar = req.cookies.avatar
        Comment.findDeleted()
            .then((comments) => {
                res.render('admin/trashComment', {  
                    name, avatar, 
                    layout: false,
                    comments: mutipleMongooseToObject(comments),
                });
            })
            .catch(next); 
    }   
    // [GET] /admin/order/trash
    trashOrder(req, res, next) { 
        var name = req.cookies.name 
        var avatar = req.cookies.avatar
        Order.findDeleted()
            .then((orders) => {
                res.render('admin/trashOrder', {  
                    name, avatar, 
                    layout: false,
                    orders: mutipleMongooseToObject(orders),
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
    // [PATCH] /admin/comment/:id/restore  
    restoreComment(req, res, next) {
        Comment.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }   
    // [PATCH] /admin/order/:id/restore  
    restoreOrder(req, res, next) {
        Order.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }   
    // [DELETE] /admin/feedback/:id/force
    forceDestroyFeedback(req, res, next) {
        Feedback.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }     
    // [DELETE] /admin/comment/:id/force
    forceDestroyComment(req, res, next) {
        Comment.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }     
    // [DELETE] /admin/order/:id/force
    forceDestroyOrder(req, res, next) {
        Order.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }     
    // [GET] /admin/search
    searchAccount(req, res, next) {     
        var name = req.cookies.name   
        var avatar = req.cookies.avatar   
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
                    name, avatar, 
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
        var name = req.cookies.name   
        var avatar = req.cookies.avatar
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
                    name,  
                    avatar,
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
    // [GET] /admin/comment/search
    searchComment(req, res, next) {    
        var name = req.cookies.name 
        var avatar = req.cookies.avatar 
        var search = req.query.search 
        Promise.all( 
            [Comment.find({  
                "$or" : [  
                    {name : new RegExp(search, 'i')}, 
                    {comment : new RegExp(search, 'i')}, 
                ]
            }),  
            Comment.countDocumentsDeleted()])
                .then(([comments, deletedCount]) =>
                    res.render('admin/comment', {  
                        name, avatar, 
                        layout: false,
                        deletedCount,
                        comments: mutipleMongooseToObject(comments),
                    }),
                )
            .catch(next);   
    }    
    // [GET] /admin/ỏdẻ/search
    searchOrder(req, res, next) {    
        var name = req.cookies.name 
        var avatar = req.cookies.avatar 
        var search = req.query.search 
        Promise.all( 
            [Order.find({  
                "$or" : [  
                    {name : new RegExp(search, 'i')},    
                    {phone : new RegExp(search, 'i')}, 
                    {email : new RegExp(search, 'i')}, 
                    {address : new RegExp(search, 'i')}, 
                    {dateOrder : new RegExp(search, 'i')}
                ]
            }),  
            Order.countDocumentsDeleted()])
                .then(([orders, deletedCount]) =>
                    res.render('admin/order', {  
                        name, avatar, 
                        layout: false,
                        deletedCount,
                        orders: mutipleMongooseToObject(orders),
                    }),
                )
            .catch(next);   
    }    
    // [GET] /admin/feedback/search/trash
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
    // [GET] /admin/comment/trash/search
    searchCommentTrash(req, res, next) {    
        var name = req.cookies.name 
        var avatar = req.cookies.avatar
        var search = req.query.search 
        // var filter = req.query.filter
        Promise.all( 
            [Comment.findDeleted({  
                "$or" : [  
                    {name : new RegExp(search, 'i')}, 
                    {comment : new RegExp(search, 'i')}, 
                ]
            }),  
            Comment.countDocumentsDeleted()])
            .then(([comments, deletedCount]) =>
                res.render('admin/trashComment', {  
                    name, avatar, 
                    layout: false,
                    deletedCount,
                    comments: mutipleMongooseToObject(comments),
                }),
            )
            .catch(next);  
    }    
    // [GET] /admin/order/trash/search
    searchOrderOrder(req, res, next) {    
        var name = req.cookies.name 
        var avatar = req.cookies.avatar
        var search = req.query.search 
        // var filter = req.query.filter
        Promise.all( 
            [Order.findDeleted({  
                "$or" : [  
                    {name : new RegExp(search, 'i')},  
                ]
            }),  
            Order.countDocumentsDeleted()])
            .then(([orders, deletedCount]) =>
                res.render('admin/trashOrder', {  
                    name, avatar, 
                    layout: false,
                    deletedCount,
                    orders: mutipleMongooseToObject(orders),
                }),
            )
            .catch(next);  
    }    
    renderDashBoard(req, res, next)  {  
  var name = req.cookies.name
  var avatar = req.cookies.avatar   
      Promise.all( 
        [Account.countDocuments(),  
        Product.countDocuments(),  
        Comment.countDocuments(),  
        Feedback.countDocuments(),  
        Order.countDocuments(), 
        Order.aggregate([ 
            {$group : {_id : null, sumaryOrder: { $sum: "$sumary" }}}
        ]), 
        Product.countDocuments({ category: 'Trà hoa quả'}), 
        Product.countDocuments({ category: 'Cà phê'}), 
        Product.countDocuments({ category: 'Smoothies'}), 
        Product.countDocuments({ category: 'Bánh ngọt'}), 
        Order.aggregate([ 
            {$group : {_id : "$dateOrder", sumaryByDate: { $sum: "$sumary" }}}, 
            {$sort:{"sumaryByDate": 1}}
        ]) 
      ])   
      .then(([numberAccount, numberProduct, numberComment, numberFeedback, numberOrder, sumaryOrderList, quantityTraHoaQua, quantitySmoothies, quantityCaPhe, quantityBanhngot, listSumaryByDate]) => {    
    var resultData = [] 
    var resultLabels = [] 
    var sumaryOrder = sumaryOrderList[0].sumaryOrder
    for(var i = 0; i < listSumaryByDate.length; i++) { 
        resultData.push(listSumaryByDate[i].sumaryByDate)
        resultLabels.push(listSumaryByDate[i]._id) 
    }   
          res.render('admin/dashBoard', {    
            numberProduct,
            numberAccount, 
            numberComment,   
            numberFeedback,  
            numberOrder, 
            sumaryOrder,
            quantityTraHoaQua, 
            quantitySmoothies, 
            quantityCaPhe, 
            quantityBanhngot,   
            resultLabels, 
            resultData,
            layout: false, name, avatar,  
          })  
        }) 
}
}  
module.exports = new AdminController; 