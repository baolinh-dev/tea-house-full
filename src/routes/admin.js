const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');
// Admin Account
router.get('/account', adminController.account); 
router.get('/account/:id/edit', adminController.editAccount); 
router.put('/account/:id', adminController.updateAccount); 
router.delete('/account/:id', adminController.destroyAccount);  
router.get('/account/trash', adminController.trashAccount);  
router.delete('/account/:id/force', adminController.forceDestroyAccount);
router.patch('/account/:id/restore', adminController.restoreAccount); 
router.get('/account/search', adminController.searchAccount); 
router.get('/account/trash/search', adminController.searchAccountTrash); 
// Admin Warehouse
router.get('/warehouse', adminController.warehouse); 
router.get('/warehouse/:id/edit', adminController.editWarehouse);  
router.put('/warehouse/:id', adminController.updateWarehouse);  
router.delete('/warehouse/:id', adminController.destroyWarehouse);  
router.get('/warehouse/trash', adminController.trashWarehouse);   
router.delete('/warehouse/:id/force', adminController.forceDestroyWarehouse);
router.patch('/warehouse/:id/restore', adminController.restoreWarehouse);
router.get('/warehouse/post', adminController.postWarehouse);   
router.post('/warehouse/create', adminController.createWarehouse);   
router.get('/warehouse/search', adminController.searchWarehouse);   
router.get('/warehouse/trash/search', adminController.searchWarehouseTrash); 
// Admin Feedback
router.get('/feedback', adminController.feedback);  
router.get('/feedback/:id/edit', adminController.editFeedback);  
router.put('/feedback/:id', adminController.updateFeedback);  
router.delete('/feedback/:id', adminController.destroyFeedback);  
router.get('/feedback/trash', adminController.trashFeedback);      
router.delete('/feedback/:id/force', adminController.forceDestroyFeedback);
router.patch('/feedback/:id/restore', adminController.restoreFeedback);  
router.get('/feedback/search', adminController.searchFeedback);  
router.get('/feedback/trash/search', adminController.searchFeedbackTrash);  
// Admin Comment
router.get('/comment', adminController.comment); 
router.get('/comment/:id/edit', adminController.editComment);    
router.put('/comment/:id', adminController.updateComment); 
router.delete('/comment/:id', adminController.destroyComment);  
router.get('/comment/trash', adminController.trashComment); 
router.delete('/comment/:id/force', adminController.forceDestroyComment); 
router.patch('/comment/:id/restore', adminController.restoreComment);    
router.get('/comment/search', adminController.searchComment);  
router.get('/comment/trash/search', adminController.searchCommentTrash);    
// Admin Order 
router.get('/order', adminController.order); 
router.get('/order/:id/edit', adminController.editOrder);      
router.put('/order/:id', adminController.updateOrder);  
router.delete('/order/:id', adminController.destroyOrder);   
router.get('/order/trash', adminController.trashOrder);  
router.delete('/order/:id/force', adminController.forceDestroyOrder); 
router.patch('/order/:id/restore', adminController.restoreOrder);   
router.get('/order/search', adminController.searchOrder);  
router.get('/order/trash/search', adminController.searchOrderOrder);   
// Admin DashBoard
router.get('/dashboard', adminController.renderDashBoard);    



module.exports = router;
