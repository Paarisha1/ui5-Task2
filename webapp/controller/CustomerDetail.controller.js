sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {

  "use strict"; 

  return Controller.extend("odata.controller.CustomerDetail", {
   

    onInit: function () {
     
      var oRouter = this.getOwnerComponent().getRouter(); // Get app router
      oRouter
        .getRoute("CustomerDetail") // Access 'CustomerDetail' route
        .attachPatternMatched(this._onObjectMatched, this); // Call function when route matches
    },

    _onObjectMatched: function (oEvent) {
      // Triggered by matched route
      var sCustomerId = oEvent.getParameter("arguments").customerId; // Get customerId from URL
      this.getView().bindElement({
        // Bind view to OData path
        path: "/Customers('" + sCustomerId + "')", // Bind to specific customer
      });
    },

    onOrdersPress: function () {
      // When 'Show Orders' button clicked
      var sCustomerId = this.getView() // Access current view
        .getBindingContext() // Get data context
        .getProperty("CustomerID"); // Get customer ID from data
      this.getOwnerComponent().getRouter().navTo("CustomerOrders", {
        // Navigate to 'CustomerOrders' view
        customerId: sCustomerId, // Pass customerId
      });
    },

    onNavBack: function () {
      // When back button is pressed
      history.go(-1); // Go back one page in browser history
    },
  });
});
