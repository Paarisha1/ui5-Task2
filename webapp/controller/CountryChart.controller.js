
sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/ui/core/UIComponent"],

  function (Controller, UIComponent) {
    "use strict"; 


    return Controller.extend("odata.controller.CountryChart", {
      
      onInit: function () {
        // Get the main OData model from the component
        const oMainModel = this.getOwnerComponent().getModel();

        // Save reference to the controller instance
        const that = this;

        // Read all customers from backend
        oMainModel.read("/Customers", {
          // If data is received successfully
          success: function (oData) {
            // Store customer list
            const aCustomers = oData.results;

            // Object to count customers per country
            const mCountryCount = {};

            // Loop over customers and count by country
            aCustomers.forEach((oCustomer) => {
              const sCountry = oCustomer.Country || "Unknown"; // fallback if no country
              mCountryCount[sCountry] = (mCountryCount[sCountry] || 0) + 1;
            });

            // Convert counted data into array format
            const aChartData = Object.keys(mCountryCount).map((sCountry) => ({
              Country: sCountry, // Country name
              Count: mCountryCount[sCountry], // Number of customers
            }));

            // Create JSON model with chart data
            const oChartModel = new sap.ui.model.json.JSONModel({
              CountryData: aChartData,
            });

            // Set the model to the view so chart can use it
            that.getView().setModel(oChartModel);
          },

          // If there’s an error while fetching data
          error: function () {
            sap.m.MessageToast.show("Failed to load customer data.");
          },
        });
      },

      // When back button is clicked
      onNavBack: function () {
        // Get the router instance
        const oRouter = UIComponent.getRouterFor(this);

        // Navigate to the customer list view
        oRouter.navTo("odata");
      },
    });
  }
);
