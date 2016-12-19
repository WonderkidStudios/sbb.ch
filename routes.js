var routes = {};
var config = require('./config/settings.js');
routes.authManager = require('./lib/auth.manager.js');
routes.trips =  require('./trips/trips.js');
//routing scheme
module.exports = function(app, passport) {
  
  app.post('/authenticate', routes.authManager.authPost());
  app.get('/authenticate', passport.authenticate('jwt', { session: false }), routes.authManager.authGet());

  app.get( config.subdir+'/trips', routes.trips.getTrips());
  /*
  app.get('/', routes.root.getIndex(models));

  app.post('/login', routes.loginModule.login());
  app.post('/loginfail', routes.loginModule.loginFail());

  //useraccout
  app.get('/useraccount', passport.authenticate('basic', { session: false }), routes.userAccount.getAllUserAccounts());
  app.post('/useraccount', passport.authenticate('basic', { session: false }), routes.userAccount.createUserAccount());
  app.put('/useraccount', passport.authenticate('basic', { session: false }), routes.userAccount.updateUserAccount());
  app.get(/^\/useraccount\/(.+)?$/, passport.authenticate('basic', { session: false }), routes.userAccount.getUserAccount());
  app.delete(/^\/useraccount\/(.+)?$/, passport.authenticate('basic', { session: false }), routes.userAccount.deleteUserAccount());

  //vendor
  app.get('/vendor', passport.authenticate('basic', { session: false }), routes.vendor.getAllVendors());
  app.post('/vendor', passport.authenticate('basic', { session: false }), routes.vendor.createVendor());
  app.put('/vendor', passport.authenticate('basic', { session: false }), routes.vendor.updateVendor());
  app.get(/^\/vendor\/(.+)?$/, passport.authenticate('basic', { session: false }), routes.vendor.getVendor());
  app.delete(/^\/vendor\/(.+)?$/, passport.authenticate('basic', { session: false }), routes.vendor.deleteVendor());

  //category
  app.get('/category', passport.authenticate('basic', { session: false }), routes.category.getAllCategories());
  app.post('/category', passport.authenticate('basic', { session: false }), routes.category.createCategory());
  app.put('/category', passport.authenticate('basic', { session: false }), routes.category.updateCategory());
  app.get(/^\/category\/(.+)?$/, passport.authenticate('basic', { session: false }), routes.category.getCategory());
  app.delete(/^\/category\/(.+)?$/, passport.authenticate('basic', { session: false }), routes.category.deleteCategory());

  //units of measure
  app.get('/uom', passport.authenticate('basic', { session: false }), routes.uom.getAllUnitsOfMeasure());
  app.post('/uom', passport.authenticate('basic', { session: false }), routes.uom.createUnitOfMeasure());
  app.put('/uom', passport.authenticate('basic', { session: false }), routes.uom.updateUnitOfMeasure());
  app.get(/^\/uom\/(.+)?$/, passport.authenticate('basic', { session: false }), routes.uom.getUnitOfMeasure());
  app.delete(/^\/uom\/(.+)?$/, passport.authenticate('basic', { session: false }), routes.uom.deleteUnitOfMeasure());
  */

};