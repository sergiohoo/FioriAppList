sap.ui.define([
		"sap/ui/core/mvc/Controller"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller) {
		"use strict";

		return Controller.extend("logaligroup.Lists.controller.ListTypes", {
			onInit: function () {
                var oJSONModel = new sap.ui.model.json.JSONModel();
                oJSONModel.loadData("./localService/mockdata/ListData.json");
                this.getView().setModel(oJSONModel);
            },
            getGroupHeader: function (oGroup) {
                var groupHeaderListItem = new sap.m.GroupHeaderListItem({
                    title : oGroup.key,
                    upperCase : true
                });
                
                return groupHeaderListItem;
            },

            onShowSelectedRow: function () {
                var standardList = this.getView().byId("standardList");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if(selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"), {duration : 20000});
                }
                else {
                    var textMessage = i18nModel.getText("selection");
                    for (var item in selectedItems) {
                        var context = selectedItems[item].getBindingContext();
                        var oContext = context.getObject();
                        textMessage = textMessage + " - " + oContext.Material;
                    }

                    sap.m.MessageToast.show(textMessage, {duration : 20000});
                }
            },

            onDeleteSelectedRow: function () {
                var standardList = this.getView().byId("standardList");
                var selectedItems = standardList.getSelectedItems();

                var i18nModel = this.getView().getModel("i18n").getResourceBundle();

                if(selectedItems.length === 0) {
                    sap.m.MessageToast.show(i18nModel.getText("noSelection"), {duration : 20000});
                }
                else {
                    var textMessage = i18nModel.getText("selection");
                    var model = this.getView().getModel();
                    var products = model.getProperty("/Products");

                    var arrayId = [];

                    for (var item in selectedItems) {
                        var context = selectedItems[item].getBindingContext();
                        var oContext = context.getObject();
                        arrayId.push(oContext.Id);
                        textMessage = textMessage + " - " + oContext.Material;
                    };
                    products = products.filter (
                        function (p) {
                        return !arrayId.includes(p.Id);
                    });
                    model.setProperty("/Products", products);
                    sap.m.MessageToast.show(textMessage, {duration : 20000});
                }
            }
		});
	});
