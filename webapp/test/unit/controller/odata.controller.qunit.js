/*global QUnit*/

sap.ui.define(["odata/controller/odata.controller"], function (Controller) {
  "use strict";

  QUnit.module("odata.controller");

  QUnit.test("Should create the controller instance", function (assert) {
    const oController = new Controller();
    assert.ok(oController, "Controller instance created successfully");
  });

  QUnit.test("Should filter correctly on search", function (assert) {
    const oController = new Controller();

  
    const oFakeBinding = {
      filter: function (aFilters) {
        this.lastFilter = aFilters;
      },
    };

    const oFakeList = {
      getBinding: function () {
        return oFakeBinding;
      },
    };

 
    oController.byId = function (sId) {
      if (sId === "customerList") {
        return oFakeList;
      }
    };


    const oFakeEvent = {
      getParameter: function () {
        return "Germany";
      },
    };

    oController.onSearch(oFakeEvent);

    assert.strictEqual(
      oFakeBinding.lastFilter[0].oValue1,
      "Germany",
      "Search filter applied correctly"
    );
  });
});
