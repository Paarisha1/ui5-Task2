
sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/UIComponent"],

  function (Controller, UIComponent) {
    "use strict"; 


    return Controller.extend("odata.controller.CountryChart", {
      
      onInit: function () {

        const oMainModel = this.getOwnerComponent().getModel();

     
        const that = this;

       
        oMainModel.read("/Customers", {
         
          success: function (oData) {
            
            const aCustomers = oData.results;

      
            const mCountryCount = {};

            
            aCustomers.forEach((oCustomer) => {
              const sCountry = oCustomer.Country || "Unknown"; 
              mCountryCount[sCountry] = (mCountryCount[sCountry] || 0) + 1;
            });

            
            const aChartData = Object.keys(mCountryCount).map((sCountry) => ({
              Country: sCountry, // Country name
              Count: mCountryCount[sCountry], // Number of customers
            }));

           
            const oChartModel = new sap.ui.model.json.JSONModel({
              CountryData: aChartData,
            });

       
            that.getView().setModel(oChartModel);
          },

          
          error: function () {
            sap.m.MessageToast.show("Failed to load customer data.");
          },
        });
      },

      onNavBack: function () {
        
        const oRouter = UIComponent.getRouterFor(this);

  
        oRouter.navTo("odata");
      },
    });
  }
);
