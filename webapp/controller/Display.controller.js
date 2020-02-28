sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/uxap/ObjectPageSubSection", "sap/uxap/ObjectPageSection","App/DynamicApp/model/formatter"
], function (Controller,l,a,t) {
	"use strict";

	return Controller.extend("App.DynamicApp.controller.Display", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf App.DynamicApp.view.Display
		 */
		formatter: t,
		onInit: function () {
			debugger;
			// this.controls = new sap.ui.model.json.JSONModel("model/Controls.json");
			
			this.controls = {
				"controls": [
					{
						"Blockid": "",
						"Blocksequence": "000",
						"Blocktitle": "",
						"Description": "",
						"Fieldcontainer": "FORM",
						"Fieldcontroltype": "F4HELP",
						"Fieldhasvaluehelp": true,
						"Fieldlabel": "Requested on",
						"Fieldlength": "040",
						"Fieldname": "REQ_DATE",
						"Fieldtypekind": "",
						"Fieldvalue": "",
						"Hidden": false,
						"IsContainerEditable": "",
						"Mandatory": false,
						"Objectkey": null,
						"Processevent": "0000",
						"Processid": "ZHRPA_MEDICAL_REIMB",
						"Processreferencenumber": "",
						"Readonly": false,
						"Recordindex": 1,
						"Relid": "Z466",
						"SectionId": "1_MEDICAL",
						"SectionSequence": "000",
						"SectionTitle": "Medical Reimbursement",
						"SubSecFieldSequence": "001",
						"SubSectionId": "1_MEDICAL",
						"SubSectionSequence": "001",
						"SubSectionTitle": "",
						"Subprocessid": "",
						"TextFieldName": "",
						"VHMappingField": "",
						"ValuehelpID": "",
						"Valuehelpparentfields": ""
					},
					{
						"Blockid": "",
						"Blocksequence": "000",
						"Blocktitle": "",
						"Description": "",
						"Fieldcontainer": "FORM",
						"Fieldcontroltype": "INPUT",
						"Fieldhasvaluehelp": true,
						"Fieldlabel": "Name",
						"Fieldlength": "040",
						"Fieldname": "NAME",
						"Fieldtypekind": "",
						"Fieldvalue": "Sagar",
						"Hidden": false,
						"IsContainerEditable": "",
						"Mandatory": false,
						"Objectkey": null,
						"Processevent": "0000",
						"Processid": "ZHRPA_MEDICAL_REIMB",
						"Processreferencenumber": "",
						"Readonly": false,
						"Recordindex": 1,
						"Relid": "Z466",
						"SectionId": "1_MEDICAL",
						"SectionSequence": "000",
						"SectionTitle": "Medical Reimbursement",
						"SubSecFieldSequence": "002",
						"SubSectionId": "1_MEDICAL",
						"SubSectionSequence": "001",
						"SubSectionTitle": "",
						"Subprocessid": "",
						"TextFieldName": "",
						"VHMappingField": "",
						"ValuehelpID": "",
						"Valuehelpparentfields": ""
					},
					{
						"Blockid": "",
						"Blocksequence": "000",
						"Blocktitle": "",
						"Description": "",
						"Fieldcontainer": "FORM",
						"Fieldcontroltype": "DATE",
						"Fieldhasvaluehelp": false,
						"Fieldlabel": "Name",
						"Fieldlength": "040",
						"Fieldname": "DOB",
						"Fieldtypekind": "",
						"Fieldvalue": "",
						"Hidden": false,
						"IsContainerEditable": "",
						"Mandatory": false,
						"Objectkey": null,
						"Processevent": "0000",
						"Processid": "ZHRPA_MEDICAL_REIMB",
						"Processreferencenumber": "",
						"Readonly": false,
						"Recordindex": 1,
						"Relid": "Z466",
						"SectionId": "1_MEDICAL",
						"SectionSequence": "000",
						"SectionTitle": "Medical Reimbursement",
						"SubSecFieldSequence": "001",
						"SubSectionId": "2_MEDICAL",
						"SubSectionSequence": "002",
						"SubSectionTitle": "",
						"Subprocessid": "",
						"TextFieldName": "",
						"VHMappingField": "",
						"ValuehelpID": "",
						"Valuehelpparentfields": ""
					},
					{
						"Blockid": "",
						"Blocksequence": "000",
						"Blocktitle": "",
						"Description": "",
						"Fieldcontainer": "FORM",
						"Fieldcontroltype": "INPUT",
						"Fieldhasvaluehelp": false,
						"Fieldlabel": "Hobbies",
						"Fieldlength": "040",
						"Fieldname": "HOB",
						"Fieldtypekind": "",
						"Fieldvalue": "",
						"Hidden": false,
						"IsContainerEditable": "",
						"Mandatory": false,
						"Objectkey": null,
						"Processevent": "0000",
						"Processid": "ZHRPA_MEDICAL_REIMB",
						"Processreferencenumber": "",
						"Readonly": false,
						"Recordindex": 1,
						"Relid": "Z466",
						"SectionId": "2_PERSONAL",
						"SectionSequence": "002",
						"SectionTitle": "Personal",
						"SubSecFieldSequence": "001",
						"SubSectionId": "1_PERSONAL",
						"SubSectionSequence": "001",
						"SubSectionTitle": "",
						"Subprocessid": "",
						"TextFieldName": "",
						"VHMappingField": "",
						"ValuehelpID": "",
						"Valuehelpparentfields": ""
					}
				]
			};
			
			this.prepareDynamicForm();
			// this.addDynamicSection();
			// this.bCreate = false;
			// this.bDisplay = false;
			// this.begDate = "";
			// this.endDate = "";
			// var e = {
			// 	bSwitchActive: false,
			// 	bCheckBoxActive: false,
			// 	bCheckListSelectAllActive: false
			// };
			// this.oCheckListModel = new sap.ui.model.json.JSONModel;
			// this.oCheckListModel.setData(e);
			// this.getOwnerComponent().setModel(this.oCheckListModel, "CheckListSelectedAllModel");
			// this.busyInd = new sap.m.BusyDialog;
			// this.busyDialog = new sap.m.BusyDialog;
			// this.oAttModel = new sap.ui.model.json.JSONModel;
			// this.oFieldModel = new sap.ui.model.json.JSONModel;
			// var t = {
			// 	visible: false
			// };
			// this.oFieldModel.setData(t);
			// this.getOwnerComponent().setModel(this.oFieldModel, "FieldModel");
			// this.getOwnerComponent().getModel("FieldModel").refresh();
			// this.bStatus = false;
			// this.bCrossAppNavActive = false;
			// var o = {
			// 	vis: false
			// };
			// var i = new sap.ui.model.json.JSONModel;
			// i.setData(o);
			// this.getOwnerComponent().setModel(i, "statusmodel");
			// var s = {
			// 	name: "Approver List",
			// 	appbtnVisible: false
			// };
			// var l = new sap.ui.model.json.JSONModel;
			// l.setData(s);
			// this.getOwnerComponent().setModel(l, "btnmodel");
			// var a = {
			// 	pastyr: (new Date).getFullYear() - 1,
			// 	curryr: (new Date).getFullYear(),
			// 	nxtyr: (new Date).getFullYear() + 1
			// };
			// var r = new sap.ui.model.json.JSONModel;
			// r.setData(a);
			// this.getOwnerComponent().setModel(r, "selectmodel");
			// this.getOwnerComponent().getModel("selectmodel").refresh();
			// this.getOwnerComponent().getRouter().getRoute("display").attachPatternMatched(this._onRouteMatched, this);
			// var n = new sap.ui.model.json.JSONModel;
			// n.setData({
			// 	visible: false,
			// 	hideEditBtn: false,
			// 	hideSaveBtn: false,
			// 	hideUploadBtn: true,
			// 	cheklistEnabled: false,
			// 	visibleActionSheet: false,
			// 	fieldVisible: false,
			// 	editable: false,
			// 	createButtonVis: true,
			// 	createBtnVis: true
			// });
			// this.getOwnerComponent().setModel(n, "visibleModel")
			
		},
		
		onApproverList : function(){
			debugger;
		},
		
		prepareDynamicForm : function(){
			debugger;
			
			var e = this;
			var t = [],
				o = [],
				i = 0;
			var s = [],
				l = [],
				a = [],
				r = 0,
				n = false,
				d;
			var u = [];
			if (this.RelationId === "Z147") {
				d = false
			} else {
				d = true
			}
			
			var h = this.controls.controls;
			for (var c = 0; c < h.length; c++) {
				var p = h[c];
				if (p.Fieldcontainer === "FORM" || p.Fieldcontainer === "TABLE") {
					if (o[p.SubSectionId]) {
						switch (p.Fieldcontainer) {
						case "FORM":
							t[i - 1].SectionFormControls.push(p);
							break;
						case "TABLE":
							if (p.Recordindex === 1) {
								t[i - 1].SectionTableColumns.push(p)
							}
							if (t[i - 1].SectionTableItems.length < p.Recordindex) {
								t[i - 1].SectionTableItems.push({
									SectionTableControls: []
								})
							}
							t[i - 1].SectionTableItems[p.Recordindex - 1].SectionTableControls.push(p);
							break
						}
					} else {
						o[p.SubSectionId] = true;
						switch (p.Fieldcontainer) {
						case "FORM":
							t.push({
								GroupHeader: p.SubSectionTitle,
								GroupId: p.SubSectionId,
								FormId: p.SectionId,
								FormHeader: p.SectionTitle,
								SectionFormControls: [],
								IsFormVisible: true,
								IsTableVisible: false
							});
							t[i].SectionFormControls.push(p);
							break;
						case "TABLE":
							n = false;
							t.push({
								SubSectionTitle: p.SubSectionTitle,
								SubSectionId: p.SubSectionId,
								SectionId: p.SectionId,
								SectionTitle: p.SectionTitle,
								SectionTableColumns: [],
								SectionTableItems: [{
									SectionTableControls: []
								}],
								IsFormVisible: false,
								IsTableVisible: true,
								IsTableItem: false,
								IsContainerEditable: d
							});
							if (p.Recordindex === 1) {
								t[i].SectionTableColumns.push(p);
								t[i].IsTableVisible = true
							}
							t[i].IsTableItem = true;
							t[i].SectionTableItems[p.Recordindex - 1].SectionTableControls.push(p);
							break
						}
						if (p.Fieldcontainer === "FORM" || p.Fieldcontainer === "TABLE") {
							i++
						}
					}
				}
			}
			
			t.forEach(function (e) {
				if (e.IsFormVisible) {
					if (l[e.FormId]) {
						s[r - 1].Groups.push(e)
					} else {
						l[e.FormId] = true;
						s.push({
							SectionTitle: e.FormHeader,
							SectionId: e.FormId,
							FormLayout: {
								ColumnL: "",
								ColumnM: "",
								EmptySpanL: "",
								EmptySpanM: "",
								LabelSpanL: "",
								labelSpanM: "",
								labelSpanXL: ""
							},
							Groups: [],
							IsFormVisible: true,
							IsTableVisible: false
						});
						s[r].Groups.push(e);
						r++
					}
				} else if (e.IsTableVisible) {
					if (a[e.SectionId]) {
						s[r - 1].Tables.push(e)
					} else {
						a[e.SectionId] = true;
						s.push({
							SectionTitle: e.SectionTitle,
							Tables: [],
							IsFormVisible: false,
							IsTableVisible: true
						});
						s[r].Tables.push(e);
						r++
					}
				}
			}.bind(this));
			
			s.forEach(function (e) {
				if (e.IsFormVisible) {
					var t = e.Groups.length;
					if (t > 1) {
						e.FormLayout.ColumnL = 2;
						e.FormLayout.ColumnM = 2;
						e.FormLayout.EmptySpanL = 0;
						e.FormLayout.EmptySpanM = 0
					} else {
						e.FormLayout.ColumnL = 1;
						e.FormLayout.ColumnM = 1;
						e.FormLayout.EmptySpanL = 4;
						e.FormLayout.EmptySpanM = 4
					}
					e.FormLayout.LabelSpanL = 4;
					e.FormLayout.LabelSpanM = 4;
					e.FormLayout.LabelSpanXL = 4
				} else {}
			}.bind(this));
			var m = new sap.ui.model.json.JSONModel;
			m.setData([]);
			m.setData(s);
			if (s.length > 0) {
				this.getView().setModel(m, "sectionsModel");
				this.addDynamicSections(s);
				// this._prepareDynamicComment();
				// if (this.bCreate === true || this.bDisplay === true) {
				// 	this.addStaticSections()
				// }
			}
			// if (e.Useraction === "" || e.Useraction.includes("DISPLAY")) {
			// 	this.getImageForHeader()
			// }
			// jQuery.sap.delayedCall(0, Controller, function () {
			// 	Controller.busyDialog.close()
			// })
			
			
		},
		
		addDynamicSections : function(e){
			debugger;
			
			var t = e;
			var o = this.byId("idDetail");
			o.destroySections();
			for (var i = 0; i < t.length; i++) {
				var s = true;
				if (t[i].IsFormVisible && t[i].SectionId === "HIDE") {
					s = false
				}
				var r = new a({
					title: t[i].SectionTitle,
					titleUppercase: false,
					visible: s
				});
				var n = new l;
				if (t[i].IsFormVisible) {
					var d = sap.ui.xmlfragment("App.DynamicApp.fragment.DynamicForm", this);
					d.bindElement("sectionsModel>/" + i + "");
					n.addBlock(d)
				} else if (t[i].IsTableVisible) {
					var u = sap.ui.xmlfragment("App.DynamicApp.fragment.DynamicTable", this);
					if (this.relId === "Z503" || this.RelationId === "Z504") {
						if (this.bCreate === true) {
							u.getContent()[0].getHeaderToolbar().getContent()[1].setText(null);
							u.getContent()[0].getHeaderToolbar().getContent()[1].setEnabled(false);
							u.getContent()[0].getHeaderToolbar().getContent()[1].setVisible(false)
						} else if (this.bDisplay === true) {
							u.getContent()[0].setHeaderToolbar(null)
						} else {
							u.getContent()[0].getHeaderToolbar().getContent()[2].setIcon(null);
							u.getContent()[0].getHeaderToolbar().getContent()[2].setEnabled(false);
							u.getContent()[0].getHeaderToolbar().getContent()[2].setVisible(false)
						}
					} else {
						if (this.bCreate === true || this.bDisplay === true) {
							u.getContent()[0].setHeaderToolbar(null)
						} else {
							u.getContent()[0].getHeaderToolbar().getContent()[2].setIcon(null);
							u.getContent()[0].getHeaderToolbar().getContent()[2].setEnabled(false);
							u.getContent()[0].getHeaderToolbar().getContent()[2].setVisible(false)
						}
					}
					u.bindElement("sectionsModel>/" + i + "");
					n.addBlock(u)
				}
				r.removeAllSubSections();
				r.addSubSection(n);
				o.addSection(r)
			}
			// if (this.bCreate === true) {
			// 	for (var h = 0; h < 1; h++) {
			// 		for (var i = 0; i < o.getSections()[h].getSubSections()[0].getBlocks()[0].getFormContainers().length; i++) {
			// 			for (var c = 0; c < o.getSections()[h].getSubSections()[0].getBlocks()[0].getFormContainers()[i].getFormElements().length; c++) {
			// 				if (o.getSections()[h].getSubSections()[0].getBlocks()[0].getFormContainers()[i].getFormElements()[c].getFields()[0].getItems()[
			// 						2].getMetadata().getName() == "sap.m.DatePicker") {
			// 					if (o.getSections()[h].getSubSections()[0].getBlocks()[0].getFormContainers()[i].getFormElements()[c].getFields()[0].getItems()[
			// 							2].getId().includes("picker")) {
			// 						this._manuallyDisabledDatePicker(o.getSections()[h].getSubSections()[0].getBlocks()[0].getFormContainers()[i].getFormElements()[
			// 							c].getFields()[0].getItems()[2]);
			// 						if (o.getSections()[h].getSubSections()[0].getBlocks()[0].getFormContainers()[i].getFormElements()[c].getFields()[0].getItems()[
			// 								2].getName().includes("BEGDA") || o.getSections()[h].getSubSections()[0].getBlocks()[0].getFormContainers()[i].getFormElements()[
			// 								c].getFields()[0].getItems()[2].getName().includes("ENDDA") || o.getSections()[h].getSubSections()[0].getBlocks()[0].getFormContainers()[
			// 								i].getFormElements()[c].getFields()[0].getItems()[2].getName().includes("DATE") || o.getSections()[h].getSubSections()[0].getBlocks()[
			// 								0].getFormContainers()[i].getFormElements()[c].getFields()[0].getItems()[2].getName().includes("ABBEG") || o.getSections()[
			// 								h].getSubSections()[0].getBlocks()[0].getFormContainers()[i].getFormElements()[c].getFields()[0].getItems()[2].getName().includes(
			// 								"ABEND") || o.getSections()[h].getSubSections()[0].getBlocks()[0].getFormContainers()[i].getFormElements()[c].getFields()[0]
			// 							.getItems()[2].getName().includes("DOB")) {
			// 							this.dateRestriction(o.getSections()[h].getSubSections()[0].getBlocks()[0].getFormContainers()[i].getFormElements()[c].getFields()[
			// 								0].getItems()[2], this.RelationId)
			// 						}
			// 					}
			// 				}
			// 			}
			// 		}
			// 	}
			// }
			// if (this.bCreate === true) {
			// 	if (this.RelationId === "Z504") {
			// 		for (var h = 0; h < o.getSections()[1].getSubSections()[0].getBlocks()[0].getContent()[0].getItems().length; h++) {
			// 			if (o.getSections()[1].getSubSections()[0].getBlocks()[0].getContent()[0].getItems()[h].getCells()[4].getItems()[4].getMetadata()
			// 				.getName().includes("Picker")) {
			// 				this.dateRestriction(o.getSections()[1].getSubSections()[0].getBlocks()[0].getContent()[0].getItems()[h].getCells()[4].getItems()[
			// 					4], this.RelationId)
			// 			}
			// 		}
			// 	}
			// }
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf App.DynamicApp.view.Display
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf App.DynamicApp.view.Display
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf App.DynamicApp.view.Display
		 */
		//	onExit: function() {
		//
		//	}

	});

});