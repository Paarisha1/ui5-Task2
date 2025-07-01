sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("odata.controller.CustomerOrders", {
    onInit: function () {
      var oRouter = this.getOwnerComponent().getRouter();
      oRouter
        .getRoute("CustomerOrders")
        .attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function (oEvent) {
      var sCustomerId = oEvent.getParameter("arguments").customerId;
      var oView = this.getView();

      oView.bindElement({
        path: "/Customers('" + sCustomerId + "')",
        parameters: {
          expand: "Orders",
        },
      });
    },

    onNavBack: function () {
      history.go(-1);
    },
  });
});
