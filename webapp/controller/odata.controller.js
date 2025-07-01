sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (Controller, UIComponent, Filter, FilterOperator) {
    "use strict";

    return Controller.extend("odata.controller.odata", {
      onCustomerPress: function (oEvent) {
        const oCtx = oEvent.getParameter("listItem").getBindingContext();
        if (oCtx) {
          const sCustomerID = oCtx.getProperty("CustomerID");
          const oRouter = UIComponent.getRouterFor(this);
          oRouter.navTo("CustomerDetail", { customerId: sCustomerID });
        }
      },

      onSearch: function (oEvent) {
        const sQuery = oEvent.getParameter("newValue").trim();
        const oList = this.byId("customerList");
        const oBinding = oList.getBinding("items");

        if (sQuery) {
          const oFilter = new Filter(
            "Country",
            FilterOperator.Contains,
            sQuery
          );
          oBinding.filter([oFilter]);
        } else {
          oBinding.filter([]);
        }
      },

     
      onShowChart: function () {
        const oRouter = UIComponent.getRouterFor(this);
        oRouter.navTo("CountryChart");
      },
    });
  }
);
