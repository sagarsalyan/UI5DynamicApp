/*global history */
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/uxap/ObjectPageSubSection",
	"sap/uxap/ObjectPageSection",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History"
], function (Controller, ObjectPageSubSection, ObjectPageSection, JSONModel, History) {
	"use strict";

	return Controller.extend("app.DynamicApp.controller.BaseController", {
		/**
		 * Convenience method for accessing the router in every controller of the application.
		 * @public
		 * @returns {sap.ui.core.routing.Router} the router for this component
		 */
		getRouter: function () {
			return this.getOwnerComponent().getRouter();
		},

		/**
		 * Convenience method for getting the view model by name in every controller of the application.
		 * @public
		 * @param {string} sName the model name
		 * @returns {sap.ui.model.Model} the model instance
		 */
		getModel: function (sName) {
			return this.getView().getModel(sName);
		},

		/**
		 * Convenience method for setting the view model in every controller of the application.
		 * @public
		 * @param {sap.ui.model.Model} oModel the model instance
		 * @param {string} sName the model name
		 * @returns {sap.ui.mvc.View} the view instance
		 */
		setModel: function (oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},

		/**
		 * Convenience method for getting the resource bundle.
		 * @public
		 * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
		 */
		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		/**
		 * Event handler for navigating back.
		 * It there is a history entry we go one step back in the browser history
		 * If not, it will replace the current entry of the browser history with the master route.
		 * @public
		 */
		onNavBack: function () {
			var sPreviousHash = History.getInstance().getPreviousHash();

			if (sPreviousHash !== undefined) {
				history.go(-1);
			} else {
				this.getRouter().navTo("master", {}, true);
			}
		},
		// _prepareFormData: function (path, scope, modelName) {

		// 	var aGroups = [],
		// 		aFlag = [],
		// 		j = 0;
		// 	var aForms = [],
		// 		aFormFlag = [],
		// 		aTableFlag = [],
		// 		k = 0,
		// 		isTableItem = false,
		// 		IsContainerEditable = true;

		// 	for (var iFieldCount = 0; iFieldCount < path.length; iFieldCount++) {
		// 		var oProcessItem = path[iFieldCount];
		// 		if (aFlag[oProcessItem.Subsecname]) {
		// 			switch (oProcessItem.Subsectype) {
		// 			case "F":
		// 				aGroups[j - 1].SectionFormControls.push(oProcessItem);
		// 				break;
		// 			case "T":
		// 				if (parseInt(oProcessItem.Columnno) === 1) {
		// 					aGroups[j - 1].SectionTableColumns.push(oProcessItem);
		// 				}
		// 				if (aGroups[j - 1].SectionTableItems.length < parseInt(oProcessItem.Columnno)) {
		// 					aGroups[j - 1].SectionTableItems.push({
		// 						SectionTableControls: []
		// 					});
		// 				}
		// 				aGroups[j - 1].SectionTableItems[parseInt(oProcessItem.Columnno) - 1].SectionTableControls.push(oProcessItem);
		// 				break;
		// 			}
		// 		} else {
		// 			aFlag[oProcessItem.Subsecname] = true;
		// 			switch (oProcessItem.Subsectype) {
		// 			case "F":
		// 				aGroups.push({
		// 					SectionName: oProcessItem.Secname || oProcessItem.Sectionname,
		// 					GroupHeader: oProcessItem.Subsecname,
		// 					FormId: oProcessItem.Subsecname,
		// 					FormHeader: oProcessItem.Subsecname,
		// 					SectionFormControls: [],
		// 					IsFormVisible: true,
		// 					IsTableVisible: false,
		// 				});
		// 				aGroups[j].SectionFormControls.push(oProcessItem);
		// 				break;
		// 			case "T":
		// 				isTableItem = false;
		// 				aGroups.push({
		// 					SectionName: oProcessItem.Secname || oProcessItem.Sectionname,
		// 					GroupHeader: oProcessItem.Subsecname,
		// 					FormId: oProcessItem.Subsecname,
		// 					FormHeader: oProcessItem.Subsecname,
		// 					SectionFormControls: [],
		// 					SectionTableColumns: [],
		// 					SectionTableItems: [{
		// 						SectionTableControls: []
		// 					}],
		// 					IsFormVisible: false,
		// 					IsTableVisible: true,
		// 				});
		// 				if (parseInt(oProcessItem.Columnno) == 1) {
		// 					aGroups[j].SectionTableColumns.push(oProcessItem);
		// 					aGroups[j].IsTableVisible = true;
		// 				}
		// 				aGroups[j].IsContainerEditable = true;
		// 				aGroups[j].IsTableItem = true;
		// 				aGroups[j].SectionTableItems[parseInt(oProcessItem.Columnno) - 1].SectionTableControls.push(oProcessItem);
		// 				break;
		// 			}

		// 			j++;
		// 		}

		// 		// if (aFlag[oProcessItem.Subsecname]) {
		// 		// 	aGroups[j - 1].SectionFormControls.push(oProcessItem);
		// 		// } else {
		// 		// 	aFlag[oProcessItem.Subsecname] = true;
		// 		// 	aGroups.push({
		// 		// 		SectionName: oProcessItem.Secname || oProcessItem.Sectionname,
		// 		// 		GroupHeader: oProcessItem.Subsecname,
		// 		// 		FormId: oProcessItem.Subsecname,
		// 		// 		FormHeader: oProcessItem.Subsecname,
		// 		// 		SectionFormControls: []
		// 		// 	});
		// 		// 	aGroups[j].SectionFormControls.push(oProcessItem);

		// 		// 	j++;
		// 		// }
		// 	}

		// 	aGroups.forEach(function (oGroupItem) {
		// 		if (oGroupItem.IsFormVisible) {
		// 			if (aFormFlag[oGroupItem.FormId]) {
		// 				aForms[k - 1].Groups.push(oGroupItem);
		// 			} else {
		// 				aFormFlag[oGroupItem.FormId] = true;
		// 				aForms.push({
		// 					SectionTitle: oGroupItem.SectionName,
		// 					SubSectionTitle: oGroupItem.FormHeader,
		// 					FormLayout: {
		// 						ColumnL: "",
		// 						ColumnM: "",
		// 						EmptySpanL: "",
		// 						EmptySpanM: "",
		// 						LabelSpanL: "",
		// 						labelSpanM: "",
		// 						labelSpanXL: ""
		// 					},
		// 					Groups: [],
		// 					IsFormVisible: true,
		// 					IsTableVisible: false,
		// 				});
		// 				aForms[k].Groups.push(oGroupItem);
		// 				k++;
		// 			}
		// 		} else if (oGroupItem.IsTableVisible) {
		// 			if (aTableFlag[oGroupItem.SectionId]) {
		// 				aForms[k - 1].Tables.push(oGroupItem);
		// 			} else {
		// 				aTableFlag[oGroupItem.SectionId] = true;
		// 				aForms.push({
		// 					SectionTitle: oGroupItem.SectionName,
		// 					SubSectionTitle: oGroupItem.FormHeader,
		// 					Tables: [],
		// 					IsFormVisible: false,
		// 					IsTableVisible: true,
		// 				});
		// 				aForms[k].Tables.push(oGroupItem);
		// 				k++;
		// 			}
		// 		}
		// 	});

		// 	for (var i = 0; i < aForms.length; i++) {
		// 		var columnAr = [];
		// 		if (aForms[i].IsFormVisible) {
		// 			for (var j = 0; j < aForms[i].Groups[0].SectionFormControls.length; j++) {
		// 				columnAr.push(aForms[i].Groups[0].SectionFormControls[j].Columnno);
		// 			}

		// 			columnAr = columnAr.filter(function (x, i, a) {
		// 				return a.indexOf(x) == i;
		// 			});

		// 			columnAr.sort();
		// 			var ary = [];
		// 			ary.length = columnAr.length;
		// 			for (var k = 0; k < columnAr.length; k++) {
		// 				ary[k] = {
		// 					SectionFormControls: []
		// 				};
		// 				for (var l = 0; l < aForms[i].Groups[0].SectionFormControls.length; l++) {
		// 					if (aForms[i].Groups[0].IsFormVisible) {
		// 						if (columnAr[k] == aForms[i].Groups[0].SectionFormControls[l].Columnno) {
		// 							ary[k].SectionFormControls.push(aForms[i].Groups[0].SectionFormControls[l]);
		// 						}
		// 					}
		// 				}
		// 			}
		// 			aForms[i].Groups = ary;
		// 		}
		// 	}

		// 	aForms.forEach(function (oFormItem) {
		// 		if (oFormItem.IsFormVisible) {
		// 			var iColumnLen = oFormItem.Groups.length;
		// 			oFormItem.FormLayout.ColumnL = iColumnLen;
		// 			oFormItem.FormLayout.ColumnM = iColumnLen;
		// 			oFormItem.FormLayout.EmptySpanL = 0;
		// 			oFormItem.FormLayout.EmptySpanM = 0;
		// 			oFormItem.FormLayout.LabelSpanL = 12;
		// 			oFormItem.FormLayout.LabelSpanM = 12;
		// 			oFormItem.FormLayout.LabelSpanXL = 12;
		// 		}
		// 	});
		// 	var secAr = [];

		// 	for (var i = 0; i < path.length; i++) {
		// 		secAr.push(path[i].Secname || path[i].Sectionname);
		// 	}
		// 	secAr = secAr.filter(function (x, i, a) {
		// 		return a.indexOf(x) == i;
		// 	});
		// 	// secAr.sort();

		// 	var mainAr = [];

		// 	for (var i = 0; i < secAr.length; i++) {
		// 		var obj = {
		// 			SectionName: secAr[i],
		// 			subSec: []
		// 		};
		// 		mainAr.push(obj);
		// 		for (var j = 0; j < aForms.length; j++) {
		// 			if (secAr[i] == aForms[j].SectionTitle) {
		// 				mainAr[i].subSec.push(aForms[j]);
		// 			}
		// 		}
		// 	}
		// 	var oOPLModel = new sap.ui.model.json.JSONModel();
		// 	oOPLModel.setData([]);
		// 	oOPLModel.setData(mainAr);
		// 	scope.getView().setModel(oOPLModel, modelName);
		// },
		// _PrepareDynamicForm: function (path, scope, objectPageId, mode, type, state) {
		// 	debugger;
		// 	scope.mainData = [];
		// 	scope.attachmentData = [];
		// 	scope.headerData = [];

		// 	for (var i = 0; i < path.length; i++) {
		// 		if ((path[i].Secname || path[i].Sectionname) == 'ATTACHMENTS') {
		// 			scope.attachmentData.push(path[i]);
		// 		} else if ((path[i].Secname || path[i].Sectionname) == 'Header') {
		// 			scope.headerData.push(path[i]);
		// 		} else {
		// 			scope.mainData.push(path[i]);
		// 		}
		// 	}
		// 	scope._prepareFormData(scope.mainData, scope, "sectionsModel")
		// 	if (scope.headerData.length > 0) {
		// 		scope._prepareFormData(scope.headerData, scope, "headerModel")
		// 	}
		// 	if (scope.attachmentData.length > 0) {
		// 		var subSectionAttachment = [];
		// 		for (var i = 0; i < scope.attachmentData.length; i++) {
		// 			subSectionAttachment.push(scope.attachmentData[i].Subsecname);
		// 		}
		// 		subSectionAttachment = subSectionAttachment.filter(function (x, i, a) {
		// 			return a.indexOf(x) == i;
		// 		});
		// 		var attachmentData = {
		// 			sectionName: 'ATTACHMENTS',
		// 			subSec: []
		// 		}
		// 		var obj = {
		// 			subSecName: "",
		// 			content: []
		// 		}
		// 		for (var j = 0; j < subSectionAttachment.length; j++) {
		// 			var obj = {
		// 				subSecName: subSectionAttachment[j],
		// 				attachmentType: "",
		// 				content: []
		// 			}
		// 			attachmentData.subSec.push(obj);
		// 		}
		// 		for (var l = 0; l < attachmentData.subSec.length; l++) {
		// 			for (var k = 0; k < scope.attachmentData.length; k++) {
		// 				if (attachmentData.subSec[l].subSecName == scope.attachmentData[k].Subsecname) {
		// 					attachmentData.subSec[l].attachmentType = scope.attachmentData[k].Attachmenttype;
		// 					if (scope.attachmentData[k].Attachmentid != "") {
		// 						attachmentData.subSec[l].content.push(scope.attachmentData[k]);
		// 					};
		// 				}
		// 			}
		// 		}
		// 		var attchmentsModel = new sap.ui.model.json.JSONModel();
		// 		attchmentsModel.setData([]);
		// 		attchmentsModel.setData(attachmentData);
		// 		scope.getView().setModel(attchmentsModel, "attchmentsModel");
		// 	}
		// 	var oObjectPage = scope.byId(objectPageId);
		// 	oObjectPage.destroySections();
		// 	if (mode == 'C') {
		// 		oObjectPage.destroyHeaderContent();
		// 		if (scope.headerData.length > 0) {
		// 			scope._addHeaderFragment(scope.getView().getModel("headerModel").getData(), scope, objectPageId);
		// 		}
		// 	}
		// 	if (scope.mainData.length > 0) {
		// 		scope._addDynamicSections(scope.getView().getModel("sectionsModel").getData(), scope, objectPageId);
		// 	}
		// 	// if (mode == 'D' || mode == 'E') {
		// 	// 	if (type == 'VM' && state == 'Ready') {
		// 	// 		oObjectPage.destroyHeaderContent();
		// 	// 		this.getOwnerComponent().getModel("dynamicView").setProperty("/headerFieldEditable", false);
		// 	// 		this.getOwnerComponent().getModel("dynamicView").setProperty("/fieldEditable", true);
		// 	// 		this.getOwnerComponent().getModel("dynamicView").setProperty("/createButtonEnabled", true);
		// 	// 		this.getOwnerComponent().getModel("dynamicView").setProperty("/validateButtonEnabled", false);
		// 	// 		this.getOwnerComponent().getModel("dynamicView").setProperty("/headerSectionEnabled", false);
		// 	// 	} else if(type == 'VM' && state == 'Error'){
		// 	// 		oObjectPage.destroyHeaderContent();
		// 	// 		this.getOwnerComponent().getModel("dynamicView").setProperty("/headerFieldEditable", false);
		// 	// 		this.getOwnerComponent().getModel("dynamicView").setProperty("/fieldEditable", true);
		// 	// 		this.getOwnerComponent().getModel("dynamicView").setProperty("/createButtonEnabled", false);
		// 	// 		this.getOwnerComponent().getModel("dynamicView").setProperty("/validateButtonEnabled", true);
		// 	// 		this.getOwnerComponent().getModel("dynamicView").setProperty("/headerSectionEnabled", false);
		// 	// 	}
		// 	// }
		// 	if(mode == 'D'){
		// 		scope._addAttachmentSection(attachmentData, scope, objectPageId);
		// 	}
		// },
		// _addHeaderFragment: function (headerData, scope, objectPageId) {
		// 	debugger;
		// 	var oObjectPage = scope.byId(objectPageId);
		// 	for (var j = 0; j < headerData[0].subSec.length; j++) {
		// 		var oFragment = sap.ui.xmlfragment("app.DynamicApp.fragment.Header", scope);
		// 		oFragment.bindElement("headerModel>/0/subSec/" + j);
		// 		oObjectPage.addHeaderContent(oFragment);
		// 	}
		// },
		// _addDynamicSections: function (aForms, scope, objectPageId) {
		// 	var sectionForm = aForms;
		// 	var oObjectPage = scope.byId(objectPageId);
		// 	for (var i = 0; i < sectionForm.length; i++) {
		// 		var oObjectPageSectionControl = new ObjectPageSection({
		// 			title: "",
		// 			titleUppercase: false
		// 		});
		// 		for (var j = 0; j < sectionForm[i].subSec.length; j++) {
		// 			oObjectPageSectionControl.setTitle(sectionForm[i].SectionName + " (" + sectionForm[i].subSec.length + ")");
		// 			var oObectPageSubSection = new ObjectPageSubSection({
		// 				title: sectionForm[i].subSec[j].SubSectionTitle,
		// 				titleUppercase: false
		// 			});
		// 			if (sectionForm[i].subSec[j].IsFormVisible) {
		// 				var oFragment = sap.ui.xmlfragment("app.DynamicApp.fragment.DynamicForm", scope);
		// 				oFragment.bindElement("sectionsModel>/" + i + "/subSec/" + j);
		// 				oObectPageSubSection.addBlock(oFragment);

		// 			} else if (sectionForm[i].subSec[j].IsTableVisible) {
		// 				var oTableBlock = sap.ui.xmlfragment("app.DynamicApp.fragment.DynamicTable", this);
		// 				oTableBlock.bindElement("sectionsModel>/" + i + "/subSec/" + j);
		// 				oObectPageSubSection.addBlock(oTableBlock);
		// 			}
		// 			oObjectPageSectionControl.addSubSection(oObectPageSubSection);
		// 		}
		// 		oObjectPage.addSection(oObjectPageSectionControl);
		// 	}
		// 	scope.getView().getModel("sectionsModel").refresh();
		// 	scope.getView().getModel("sectionsModel").updateBindings();
		// },
		// _addAttachmentSection: function (attachmentData, scope, objectPageId) {
		// 	var oObjectPage = scope.byId(objectPageId);
		// 	var oObjectPageSectionControl = new ObjectPageSection({
		// 		title: attachmentData.sectionName,
		// 		titleUppercase: false
		// 	});
		// 	for (var j = 0; j < attachmentData.subSec.length; j++) {
		// 		oObjectPageSectionControl.setTitle(attachmentData.sectionName + " (" + attachmentData.subSec.length + ")");
		// 		var oObectPageSubSection = new ObjectPageSubSection({
		// 			title: attachmentData.subSec[j].subSecName,
		// 			titleUppercase: false
		// 		});
		// 		var oFragment = sap.ui.xmlfragment("app.DynamicApp.fragment.DynamicAttachmentForm", scope);
		// 		oFragment.bindElement("attchmentsModel>/subSec/" + j);
		// 		oObectPageSubSection.addBlock(oFragment);
		// 		oObjectPageSectionControl.addSubSection(oObectPageSubSection);
		// 	}
		// 	// scope.getOwnerComponent().getModel("dynamicView").setProperty("/busy", false);
		// 	oObjectPage.addSection(oObjectPageSectionControl);
		// 	scope.getView().getModel("attchmentsModel").refresh();
		// 	scope.getView().getModel("attchmentsModel").updateBindings();
		// }

	});

});