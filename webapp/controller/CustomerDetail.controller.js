sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {

  "use strict"; 

  return Controller.extend("odata.controller.CustomerDetail", {
   

    onInit: function () {
     
      var oRouter = this.getOwnerComponent().getRouter(); 
      oRouter
        .getRoute("CustomerDetail") 
        .attachPatternMatched(this._onObjectMatched, this); 
    },

    _onObjectMatched: function (oEvent) {
    
      var sCustomerId = oEvent.getParameter("arguments").customerId; 
      this.getView().bindElement({
       
        path: "/Customers('" + sCustomerId + "')", 
      });
    },

    onOrdersPress: function () {
     
      var sCustomerId = this.getView()
        .getBindingContext() 
        .getProperty("CustomerID"); 
      this.getOwnerComponent().getRouter().navTo("CustomerOrders", {
      
        customerId: sCustomerId,
      });
    },

    onNavBack: function () {

      history.go(-1);
    },
  });
});
