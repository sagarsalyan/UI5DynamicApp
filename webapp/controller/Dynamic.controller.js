sap.ui.define([
	"app/DynamicApp/controller/BaseController",
	"sap/uxap/ObjectPageSubSection",
	"sap/uxap/ObjectPageSection",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox",
	"app/DynamicApp/model/fuse",
	"app/DynamicApp/model/formatter",
	"sap/ui/model/Filter"
], function (Controller, ObjectPageSubSection, ObjectPageSection, JSONModel, MessageBox, fuse, formatter, Filter) {
	"use strict";

	return Controller.extend("app.DynamicApp.controller.Dynamic", {
		formatter: formatter,
		onInit: function () {
			debugger;
			//header data
			var header = [];
			for (var key in this.ObjectHeaderData) {
				if (key != 'Workitemid') {
					var obj = {};
					obj.label = key;
					obj.value = this.ObjectHeaderData[key];
					header.push(obj);
				}
			}
			var model = new JSONModel();
			model.setData(header);
			this.getView().setModel(model, "headerData");

			//page section
			var model = new sap.ui.model.json.JSONModel();
			this.getView().setModel(model, "detailView");
			this.getView().getModel("detailView").setProperty("/uploadEnabled", true);
			this.getView().getModel("detailView").refresh();
			this._prepareDetailViewofMDGType(this.data);
		},
		_prepareDetailViewofMDGType: function (path) {
			debugger;
			this.mainData = [];
			this.attachmentData = [];
			this.headerData = [];

			for (var i = 0; i < path.length; i++) {
				if (path[i].Sectionname == 'ATTACHMENTS' || path[i].sectionname == 'ATTACHMENTS') {
					this.attachmentData.push(path[i]);
				}
				// else if (path[i].Sectionname == 'Header') {
				// 	this.headerData.push(path[i]);
				// } 
				else {
					this.mainData.push(path[i]);
				}
			}
			if (this.mainData.length > 0) {
				this._prepareFormData(this.mainData, "sectionsModel")
			}
			if (this.headerData.length > 0) {
				this._prepareFormData(this.headerData, "headerModel")
			}
			var oObjectPage = this.getView().byId("idDetail");
			oObjectPage.destroyHeaderContent();
			oObjectPage.destroySections();
			oObjectPage.destroyHeaderTitle();
			this.getView().getModel("detailView").setProperty("/objectPageTitle", "Dynamic UI");
			var headerTitle = new sap.uxap.ObjectPageDynamicHeaderTitle({
				expandedHeading: new sap.m.Title({
					text: "{detailView>/objectPageTitle}"
				}),
				snappedHeading: new sap.m.Title({
					text: "{detailView>/objectPageTitle}"
				})
			});
			oObjectPage.setHeaderTitle(headerTitle);
			this._addHeaderFragment();

			if (this.mainData.length > 0) {
				this._addDynamicSections(this.getView().getModel("sectionsModel").getData());

				if (this.attachmentData.length > 0) {
					var subSectionAttachment = [];
					for (var i = 0; i < this.attachmentData.length; i++) {
						subSectionAttachment.push(this.attachmentData[i].Subsecname);
					}
					subSectionAttachment = subSectionAttachment.filter(function (x, i, a) {
						return a.indexOf(x) == i;
					});
					var attachmentData = {
						sectionName: 'ATTACHMENTS',
						subSec: []
					}
					var obj = {
						subSecName: "",
						content: []
					}
					for (var j = 0; j < subSectionAttachment.length; j++) {
						var obj = {
							subSecName: subSectionAttachment[j],
							attachmentType: "",
							content: []
						}
						attachmentData.subSec.push(obj);
					}
					for (var l = 0; l < attachmentData.subSec.length; l++) {
						for (var k = 0; k < this.attachmentData.length; k++) {
							if (attachmentData.subSec[l].subSecName == this.attachmentData[k].Subsecname) {
								attachmentData.subSec[l].attachmentType = this.attachmentData[k].Attachmenttype;
								if (this.attachmentData[k].Attachmentid != "") {
									attachmentData.subSec[l].content.push(this.attachmentData[k]);
								};
							}
						}
					}
					var attchmentsModel = new sap.ui.model.json.JSONModel();
					attchmentsModel.setData([]);
					attchmentsModel.setData(attachmentData);
					this.getView().setModel(attchmentsModel, "attchmentsModel");
				}
			}

		},
		_prepareFormData: function (path, modelName) {
			// if (!this._displayDetails) {
			// 	this._displayDetails = sap.ui.xmlfragment(
			// 		"app.DynamicApp.fragment.TableItem",
			// 		this
			// 	);
			// 	this.getView().addDependent(this._displayDetails);
			// }

			var aGroups = [],
				aFlag = [],
				j = 0;
			var aForms = [],
				aFormFlag = [],
				aTableFlag = [],
				k = 0,
				isTableItem = false,
				IsContainerEditable = true;

			for (var iFieldCount = 0; iFieldCount < path.length; iFieldCount++) {
				var oProcessItem = path[iFieldCount];
				if (aFlag[oProcessItem.Subsecname || oProcessItem.subsecname]) {
					switch (oProcessItem.Subsectype || oProcessItem.subsectype) {
					case "F":
						aGroups[j - 1].SectionFormControls.push(oProcessItem);
						break;
					case "T":
						if (parseInt(oProcessItem.Columnno || oProcessItem.columnno) === 1) {
							aGroups[j - 1].SectionTableColumns.push(oProcessItem);
						}
						if (aGroups[j - 1].SectionTableItems.length < parseInt(oProcessItem.Columnno || oProcessItem.columnno)) {
							aGroups[j - 1].SectionTableItems.push({
								SectionTableControls: []
							});
						}
						aGroups[j - 1].SectionTableItems[parseInt(oProcessItem.Columnno || oProcessItem.columnno) - 1].SectionTableControls.push(
							oProcessItem);
						break;
					}
				} else {
					aFlag[oProcessItem.Subsecname || oProcessItem.subsecname] = true;
					switch (oProcessItem.Subsectype || oProcessItem.subsectype) {
					case "F":
						aGroups.push({
							SectionName: oProcessItem.Sectionname || oProcessItem.sectionname,
							GroupHeader: oProcessItem.Subsecname || oProcessItem.subsecname,
							FormId: oProcessItem.Subsecname || oProcessItem.subsecname,
							FormHeader: oProcessItem.Subsecname || oProcessItem.subsecname,
							SectionFormControls: [],
							IsFormVisible: true,
							IsTableVisible: false,
						});
						aGroups[j].SectionFormControls.push(oProcessItem);
						break;
					case "T":
						isTableItem = false;
						aGroups.push({
							SectionName: oProcessItem.Sectionname || oProcessItem.sectionname,
							GroupHeader: oProcessItem.Subsecname || oProcessItem.subsecname,
							FormId: oProcessItem.Subsecname || oProcessItem.subsecname,
							FormHeader: oProcessItem.Subsecname || oProcessItem.subsecname,
							SectionFormControls: [],
							SectionTableColumns: [],
							SectionTableItems: [{
								SectionTableControls: []
							}],
							IsFormVisible: false,
							IsTableVisible: true,
						});
						if (parseInt(oProcessItem.Columnno || oProcessItem.columnno) == 1) {
							aGroups[j].SectionTableColumns.push(oProcessItem);
							aGroups[j].IsTableVisible = true;
						}
						aGroups[j].IsContainerEditable = true;
						aGroups[j].IsTableItem = true;
						aGroups[j].SectionTableItems[parseInt(oProcessItem.Columnno || oProcessItem.columnno) - 1].SectionTableControls.push(
							oProcessItem);
						break;
					}

					j++;
				}
			}

			aGroups.forEach(function (oGroupItem) {
				if (oGroupItem.IsFormVisible) {
					if (aFormFlag[oGroupItem.FormId]) {
						aForms[k - 1].Groups.push(oGroupItem);
					} else {
						aFormFlag[oGroupItem.FormId] = true;
						aForms.push({
							SectionTitle: oGroupItem.SectionName,
							SubSectionTitle: oGroupItem.FormHeader,
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
							IsTableVisible: false,
						});
						aForms[k].Groups.push(oGroupItem);
						k++;
					}
				} else if (oGroupItem.IsTableVisible) {
					if (aTableFlag[oGroupItem.SectionId]) {
						aForms[k - 1].Tables.push(oGroupItem);
					} else {
						aTableFlag[oGroupItem.SectionId] = true;
						aForms.push({
							SectionTitle: oGroupItem.SectionName,
							SubSectionTitle: oGroupItem.FormHeader,
							Tables: [],
							IsFormVisible: false,
							IsTableVisible: true,
						});
						aForms[k].Tables.push(oGroupItem);
						k++;
					}
				}
			});

			for (var i = 0; i < aForms.length; i++) {
				var columnAr = [];
				if (aForms[i].IsFormVisible) {
					for (var j = 0; j < aForms[i].Groups[0].SectionFormControls.length; j++) {
						columnAr.push(aForms[i].Groups[0].SectionFormControls[j].Columnno);
					}

					columnAr = columnAr.filter(function (x, i, a) {
						return a.indexOf(x) == i;
					});

					columnAr.sort();
					var ary = [];
					ary.length = columnAr.length;
					for (var k = 0; k < columnAr.length; k++) {
						ary[k] = {
							SectionFormControls: []
						};
						for (var l = 0; l < aForms[i].Groups[0].SectionFormControls.length; l++) {
							if (aForms[i].Groups[0].IsFormVisible) {
								if (columnAr[k] == aForms[i].Groups[0].SectionFormControls[l].Columnno) {
									ary[k].SectionFormControls.push(aForms[i].Groups[0].SectionFormControls[l]);
								}
							}
						}
					}
					aForms[i].Groups = ary;
				}
			}

			aForms.forEach(function (oFormItem) {
				if (oFormItem.IsFormVisible) {
					var iColumnLen = oFormItem.Groups.length;
					oFormItem.FormLayout.ColumnL = iColumnLen;
					oFormItem.FormLayout.ColumnM = iColumnLen;
					oFormItem.FormLayout.EmptySpanL = 0;
					oFormItem.FormLayout.EmptySpanM = 0;
					oFormItem.FormLayout.LabelSpanL = 12;
					oFormItem.FormLayout.LabelSpanM = 12;
					oFormItem.FormLayout.LabelSpanXL = 12;
				}
			});
			var secAr = [];

			for (var i = 0; i < path.length; i++) {
				secAr.push(path[i].Sectionname || path[i].sectionname);
			}
			secAr = secAr.filter(function (x, i, a) {
				return a.indexOf(x) == i;
			});
			// secAr.sort();

			var mainAr = [];

			for (var i = 0; i < secAr.length; i++) {
				var obj = {
					SectionName: secAr[i],
					subSec: []
				};
				mainAr.push(obj);
				for (var j = 0; j < aForms.length; j++) {
					if (secAr[i] == aForms[j].SectionTitle) {
						mainAr[i].subSec.push(aForms[j]);
					}
				}
			}
			var oOPLModel = new sap.ui.model.json.JSONModel();
			oOPLModel.setData([]);
			oOPLModel.setData(mainAr);
			this.getView().setModel(oOPLModel, modelName);
		},
		_addDynamicSections: function (aForms) {
			var sectionForm = aForms;
			var oObjectPage = this.getView().byId("idDetail");
			for (var i = 0; i < sectionForm.length; i++) {
				var oObjectPageSectionControl = new ObjectPageSection({
					title: "",
					titleUppercase: false
				});
				for (var j = 0; j < sectionForm[i].subSec.length; j++) {
					oObjectPageSectionControl.setTitle(sectionForm[i].SectionName + " (" + sectionForm[i].subSec.length + ")");
					var oObectPageSubSection = new ObjectPageSubSection({
						title: sectionForm[i].subSec[j].SubSectionTitle,
						titleUppercase: false
					});
					if (sectionForm[i].subSec[j].IsFormVisible) {
						var oFragment = sap.ui.xmlfragment("app.DynamicApp.fragment.DynamicForm", this);
						oFragment.bindElement("sectionsModel>/" + i + "/subSec/" + j);
						oObectPageSubSection.addBlock(oFragment);

					} else if (sectionForm[i].subSec[j].IsTableVisible) {
						var oTableBlock = sap.ui.xmlfragment("app.DynamicApp.fragment.DynamicTable", this);
						oTableBlock.bindElement("sectionsModel>/" + i + "/subSec/" + j);
						oObectPageSubSection.addBlock(oTableBlock);
					}
					oObjectPageSectionControl.addSubSection(oObectPageSubSection);
				}
				oObjectPage.addSection(oObjectPageSectionControl);
			}
			this.getView().getModel("sectionsModel").refresh();
			this.getView().getModel("sectionsModel").updateBindings();
		},
		_addAttachmentSection: function (attachmentData) {
			var oObjectPage = this.getView().byId("idDetail");
			var oObjectPageSectionControl = new ObjectPageSection({
				title: attachmentData.sectionName,
				titleUppercase: false
			});
			for (var j = 0; j < attachmentData.subSec.length; j++) {
				oObjectPageSectionControl.setTitle(attachmentData.sectionName + " (" + attachmentData.subSec.length + ")");
				var oObectPageSubSection = new ObjectPageSubSection({
					title: attachmentData.subSec[j].subSecName,
					titleUppercase: false
				});
				var oFragment = sap.ui.xmlfragment("app.DynamicApp.fragment.DynamicAttachmentForm", this);
				oFragment.bindElement("attchmentsModel>/subSec/" + j);
				oObectPageSubSection.addBlock(oFragment);
				oObjectPageSectionControl.addSubSection(oObectPageSubSection);
			}
			oObjectPage.addSection(oObjectPageSectionControl);
			this.getView().getModel("attchmentsModel").refresh();
			this.getView().getModel("attchmentsModel").updateBindings();
		},
		_addHeaderFragment: function () {
			var oObjectPage = this.getView().byId("idDetail");
			var oFragment = sap.ui.xmlfragment("app.DynamicApp.fragment.Header", this);
			oObjectPage.addHeaderContent(oFragment);
		},
		onPressTableItemAdd: function (oEvent) {
			debugger;
			var title = oEvent.getSource().getParent().getParent().getParent().getParent().getTitle(),
				mainData = this.getView().getModel("sectionsModel").getData(),
				columns = [...oEvent.getSource().getParent().getParent().getBindingContext("sectionsModel").getObject().Tables[0].SectionTableItems[
					0].SectionTableControls];
			columns = [...columns.map(item => {
				var itemCopy = Object.assign({}, item);
				itemCopy.Columnno = "";
				itemCopy.Fieldvalue = "";
				return itemCopy

			})];
			var obj = {
				SectionTableControls: columns
			};
			for (var i = 0; i < mainData.length; i++) {
				for (var j = 0; j < mainData[i].subSec.length; j++) {
					if (mainData[i].subSec[j].SubSectionTitle == title) {
						for (var k = 0; k < obj.SectionTableControls.length; k++) {
							obj.SectionTableControls[k].Columnno = (parseInt(mainData[i].subSec[j].Tables[0].SectionTableItems.length) + 1).toString();
							this.data.push(obj.SectionTableControls[k]);
						}
						mainData[i].subSec[j].Tables[0].SectionTableItems.push(obj);
						break;
					}
				}
			}
			this.getView().getModel("sectionsModel").refresh();
		},
		onInputChange: function (oEvent) {
			oEvent.getSource().setValueState("None");
			if (oEvent.getSource().getShowValueHelp()) {
				oEvent.getSource().setValue(oEvent.getSource().getValue().toUpperCase());
			}
			for (var i = 0; i < this.data.length; i++) {
				if (oEvent.getSource().getName() == this.data[i].Fieldname) {
					this.data[i].Fieldvalue = oEvent.getSource().getValue()
				}
			}
		},
		onCheckBoxClick: function (oEvent) {
			debugger;
			for (var i = 0; i < this.data.length; i++) {
				if (oEvent.getSource().getName() == this.data[i].Fieldname) {
					if (oEvent.getSource().getSelected()) {
						this.data[i].Fieldvalue = true;
					} else {
						this.data[i].Fieldvalue = false;
					}
				}
			}
		},
		onInputChangeLiveChange: function (oEvent) {
			oEvent.getSource().setValueState("None");
		},
		onDateChange: function (oEvent) {
			oEvent.getSource().setValueState("None");
			this.date = oEvent.getSource().getValue().split("/")[0] + "" + oEvent.getSource().getValue().split("/")[1] + "" + oEvent.getSource()
				.getDateValue().getFullYear();
		},
		onCheckboxSelect: function (oEvent) {
			oEvent.getSource().setSelected(oEvent.getSource().getSelected());
			oEvent.getSource().setValueState("None");
		},
		onSelectChange: function (oEvent) {
			oEvent.getSource().setValueState("None");
		},
		handleValueHelpRequest: function (oEvent) {
			oEvent.getSource().setValueState("None");
			debugger;
			var data = {};
			for (var i = 0; i < this.data.length; i++) {
				data[this.data[i].Fieldname] = this.data[i].Fieldvalue;
			}
			data = JSON.stringify(data);
			this.getView().getModel("detailView").setProperty("/busy", true);
			this.sInputValue = oEvent.getSource().getValue();
			this.sInput = oEvent.getSource();
			this.sInputName = oEvent.getSource().getName();
			this.sInputLable = oEvent.getSource().getPlaceholder();
			var filter = [],
				fltr = [];
			fltr.push(new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.EQ, this.sInputName));
			fltr.push(new sap.ui.model.Filter("Depend", sap.ui.model.FilterOperator.EQ, data));
			filter.push(new sap.ui.model.Filter({
				filters: fltr,
				and: true
			}));
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment("app.DynamicApp.fragment.Dialog", this);
				this.getView().addDependent(this._valueHelpDialog);
			}
			this._valueHelpDialog.setTitle(this.sInputLable);
			this._valueHelpDialog.open();
			this.getModel("zmdg_dynamic_ui_srv").read("/SearchHelpSet", {
				filters: filter,
				success: function success(oData, oResponse) {
					debugger;
					this.getView().getModel("detailView").setProperty("/busy", false);
					var model = new sap.ui.model.json.JSONModel();
					model.setData(oData.results);
					this.getView().setModel(model, "vhitem");
					this._valueHelpDialog.setTitle(this.sInputLable);
					this._valueHelpDialog.open();
					if (this.sInputValue != "") {
						var firstFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("Skey", sap.ui.model.FilterOperator.Contains, this.sInputValue
							.split(" - ")[0])]);
						var secondFilter = new sap.ui.model.Filter([new sap.ui.model.Filter("Value", sap.ui.model.FilterOperator.Contains, this.sInputValue
							.split(" - ")[0])]);
						var mainFilter = new sap.ui.model.Filter({
							filters: [firstFilter, secondFilter],
							and: false
						});
						this._valueHelpDialog.getBinding("items").filter(mainFilter);
					}
				}.bind(this),
				error: function error(oError) {
					this.getView().getModel("detailView").setProperty("/busy", false);
					this.getErrorDetails(oError);
				}.bind(this)
			});
		},
		closeDlg: function (oEvent) {
			debugger;
			this.oSelectedItem = oEvent.getParameter("selectedItem");
			if (this.oSelectedItem !== undefined) {
				this.value = this.oSelectedItem.getProperty("description");
				this.key = this.oSelectedItem.getProperty("title");

				this.sInput.setValue(this.key.toUpperCase() + " - " + this.value);

			}
		},
		onSave: function (oEvent) {
			for (var j = 0; j < this.getView().byId("idDetail").getSections().length; j++) {
				for (var k = 0; k < this.getView().byId("idDetail").getSections()[j].getSubSections().length; k++) {
					if (this.getView().byId("idDetail").getSections()[j].getSubSections()[k].getBlocks()[0].getMetadata()._sClassName ==
						"sap.ui.layout.form.Form") {
						for (var l = 0; l < this.getView().byId("idDetail").getSections()[j].getSubSections()[k].getBlocks()[0].getFormContainers().length; l++) {
							for (var m = 0; m < this.getView().byId("idDetail").getSections()[j].getSubSections()[k].getBlocks()[0].getFormContainers()[l]
								.getFormElements().length; m++) {
								for (var n = 0; n < this.getView().byId("idDetail").getSections()[j].getSubSections()[k].getBlocks()[0].getFormContainers()[
										l]
									.getFormElements()[m].getFields()[0].getItems().length; n++) {

									if (this.getView().byId("idDetail").getSections()[j].getSubSections()[k].getBlocks()[0].getFormContainers()[l]
										.getFormElements()[m].getFields()[0].getItems()[n].getMetadata()._sClassName === "sap.m.Input" && this.getView().byId(
											"idDetail").getSections()[j].getSubSections()[k].getBlocks()[0].getFormContainers()[l]
										.getFormElements()[m].getFields()[0].getItems()[n].getValue() == "" && this.getView().byId("idDetail").getSections()[j].getSubSections()[
											k].getBlocks()[0].getFormContainers()[l]
										.getFormElements()[m].getFields()[0].getItems()[n].getEditable() && this.getView().byId("idDetail").getSections()[j].getSubSections()[
											k].getBlocks()[0].getFormContainers()[l]
										.getFormElements()[m].getFields()[0].getItems()[n].getRequired() && this.getView().byId("idDetail").getSections()[j].getSubSections()[
											k].getBlocks()[0].getFormContainers()[l]
										.getFormElements()[m].getFields()[0].getItems()[n].getEditable()) {
										this.getView().byId("idDetail").getSections()[j].getSubSections()[k].getBlocks()[0].getFormContainers()[l]
											.getFormElements()[m].getFields()[0].getItems()[n].setValueState('Error');
										sap.m.MessageBox.error(this.getView().byId("idDetail").getSections()[j].getSubSections()[k].getBlocks()[0].getFormContainers()[
												l]
											.getFormElements()[m].getLabel().getText() + " is Mandatory!");
										return;
									}

								}
							}
						}
					}
				}
			}
			for (var i = 0; i < this.data.length; i++) {
				if (this.data[i].Fieldvalue == "" && this.data[i].Ismandatory && this.data[i].Iseditable) {
					this.data[i].ValueState = 'Error';
					sap.m.MessageBox.error(this.data[i].Fieldlabel + " is Mandatory!");
					return;
				}
			}
			for (var i = 0; i < this.data.length; i++) {
				if (this.data[i].Hasf4 == "X" || this.data[i].Hasf4 == true) {
					this.data[i].Fieldvalue = this.data[i].Fieldvalue.split(" - ")[0].toUpperCase();
				}
			}
			sap.m.MessageBox.success("Data Saved", {
				actions: ["Yes", "No"],
				onClose: function (sAction) {
					if (sAction == 'Yes') {
						this._openAttachmentDialog();
					}
				}.bind(this)
			});
		},
		_openAttachmentDialog: function () {
			debugger;
			if (!this.attachmentDialog) {
				this.attachmentDialog = sap.ui.xmlfragment(
					"app.DynamicApp.fragment.AttachmentDialog",
					this
				);
				this.getView().addDependent(this.attachmentDialog);
			}
			var oObjectPage = this.attachmentDialog.getContent()[0],
				attachmentData = this.getView().getModel("attchmentsModel").getData();
			oObjectPage.destroySections();
			var oObjectPageSectionControl = new ObjectPageSection({
				title: attachmentData.sectionName,
				titleUppercase: false
			});
			for (var j = 0; j < attachmentData.subSec.length; j++) {
				var oObectPageSubSection = new ObjectPageSubSection({
					title: attachmentData.subSec[j].subSecName,
					titleUppercase: false
				});
				var oFragment = sap.ui.xmlfragment("app.DynamicApp.fragment.DynamicAttachmentForm", this);
				oFragment.bindElement("attchmentsModel>/subSec/" + j);
				oObectPageSubSection.addBlock(oFragment);
				oObjectPageSectionControl.addSubSection(oObectPageSubSection);
			}
			oObjectPage.addSection(oObjectPageSectionControl);
			this.getView().getModel("attchmentsModel").refresh();
			this.getView().getModel("attchmentsModel").updateBindings();
			this.attachmentDialog.open();
		},
		onOkPress: function () {
			for (var i = 0; i < this.attachmentData.length; i++) {
				if (this.attachmentData[i].Attachmandtry == "X") {
					for (var j = 0; j < this.getView().getModel("attchmentsModel").getData().subSec.length; j++) {
						if (this.attachmentData[i].Subsecname == this.getView().getModel("attchmentsModel").getData().subSec[j].subSecName) {
							if (this.getView().getModel("attchmentsModel").getData().subSec[j].content.length == "0") {
								var a = this.getView().getModel("attchmentsModel").getData().subSec[j].subSecName + " is mandatory";
								sap.m.MessageBox.error(a);
								return;
							}
						}
					}
				}
			}
			this.attachmentDialog.close();
		},
		data: [{

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A1",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "General",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "H",
			"Viewname": "General Data",
			"Viewdespc": "General Data",
			"Secsequenceno": "001",
			"Sectionname": "Header",
			"Subsequenceno": "001",
			"Subsecname": "Header",
			"Fieldname": "ASSET",
			"Fieldlabel": "Main Asset Number",
			"Fieldtype": "CHAR",
			"Fieldlength": "0012",
			"Sequenceno": "001",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "F",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A1",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "General",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "H",
			"Viewname": "General Data",
			"Viewdespc": "General Data",
			"Secsequenceno": "001",
			"Sectionname": "Header",
			"Subsequenceno": "001",
			"Subsecname": "Header",
			"Fieldname": "ASSETCLASS",
			"Fieldlabel": "Asset class",
			"Fieldtype": "CHAR",
			"Fieldlength": "0008",
			"Sequenceno": "002",
			"Ismandatory": true,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "F",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000002",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A1",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "General",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "H",
			"Viewname": "General Data",
			"Viewdespc": "General Data",
			"Secsequenceno": "001",
			"Sectionname": "Header",
			"Subsequenceno": "001",
			"Subsecname": "Header",
			"Fieldname": "SUBNUMBER",
			"Fieldlabel": "Asset Subnumber",
			"Fieldtype": "CHAR",
			"Fieldlength": "0004",
			"Sequenceno": "001",
			"Ismandatory": false,
			"Hasf4": false,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "F",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000003",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A1",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "General",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "H",
			"Viewname": "General Data",
			"Viewdespc": "General Data",
			"Secsequenceno": "001",
			"Sectionname": "Header",
			"Subsequenceno": "001",
			"Subsecname": "Header",
			"Fieldname": "COMPANYCODE",
			"Fieldlabel": "Company Code",
			"Fieldtype": "CHAR",
			"Fieldlength": "0004",
			"Sequenceno": "001",
			"Ismandatory": true,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "F",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A1",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "General",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "H",
			"Viewname": "General Data",
			"Viewdespc": "General Data",
			"Secsequenceno": "002",
			"Sectionname": "General Data",
			"Subsequenceno": "001",
			"Subsecname": "General Data",
			"Fieldname": "DESCRIPT",
			"Fieldlabel": "Asset Description",
			"Fieldtype": "CHAR",
			"Fieldlength": "0050",
			"Sequenceno": "001",
			"Ismandatory": true,
			"Hasf4": false,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "F",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000002",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A1",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "General",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "H",
			"Viewname": "General Data",
			"Viewdespc": "General Data",
			"Secsequenceno": "002",
			"Sectionname": "General Data",
			"Subsequenceno": "001",
			"Subsecname": "General Data",
			"Fieldname": "DESCRIPT2",
			"Fieldlabel": "Additional Asset Description",
			"Fieldtype": "CHAR",
			"Fieldlength": "0050",
			"Sequenceno": "001",
			"Ismandatory": true,
			"Hasf4": false,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "F",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000003",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A1",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "General",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "H",
			"Viewname": "General Data",
			"Viewdespc": "General Data",
			"Secsequenceno": "002",
			"Sectionname": "General Data",
			"Subsequenceno": "001",
			"Subsecname": "General Data",
			"Fieldname": "ACCT_DETRM",
			"Fieldlabel": "Account Determination",
			"Fieldtype": "CHAR",
			"Fieldlength": "0008",
			"Sequenceno": "001",
			"Ismandatory": true,
			"Hasf4": false,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "F",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A2",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Time-Dependent",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "J",
			"Viewname": "Interval",
			"Viewdespc": "Interval",
			"Secsequenceno": "003",
			"Sectionname": "Interval",
			"Subsequenceno": "001",
			"Subsecname": "Interval",
			"Fieldname": "BUS_AREA",
			"Fieldlabel": "Business Area",
			"Fieldtype": "CHAR",
			"Fieldlength": "0004",
			"Sequenceno": "001",
			"Ismandatory": true,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "F",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A2",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Time-Dependent",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "J",
			"Viewname": "Interval",
			"Viewdespc": "Interval",
			"Secsequenceno": "003",
			"Sectionname": "Interval",
			"Subsequenceno": "002",
			"Subsecname": "Interval2",
			"Fieldname": "BUS_AREA",
			"Fieldlabel": "Business Area2",
			"Fieldtype": "CHAR",
			"Fieldlength": "0004",
			"Sequenceno": "001",
			"Ismandatory": true,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "F",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "DEACTIVATE",
			"Fieldlabel": "Indicator: Depreciation Area Is Deactiva",
			"Fieldtype": "CHAR",
			"Fieldlength": "0001",
			"Sequenceno": "001",
			"Ismandatory": false,
			"Hasf4": false,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "CHECKBOX",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "AREA",
			"Fieldlabel": "Real Depreciation Area",
			"Fieldtype": "NUMC",
			"Fieldlength": "0002",
			"Sequenceno": "002",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "DEPDESCRIPT",
			"Fieldlabel": "Short Name for Depreciation Area",
			"Fieldtype": "CHAR",
			"Fieldlength": "0012",
			"Sequenceno": "003",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "DEP_KEY",
			"Fieldlabel": "Depreciation Key",
			"Fieldtype": "CHAR",
			"Fieldlength": "0004",
			"Sequenceno": "004",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "ULIFE_YRS",
			"Fieldlabel": "Planned Useful Life in Years",
			"Fieldtype": "NUMC",
			"Fieldlength": "0003",
			"Sequenceno": "005",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "ULIFE_PRDS",
			"Fieldlabel": "Planned Useful Life in Periods",
			"Fieldtype": "NUMC",
			"Fieldlength": "0003",
			"Sequenceno": "006",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000001",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "ODEP_START_DATE",
			"Fieldlabel": "Depreciation Calculation Start Date",
			"Fieldtype": "DATS",
			"Fieldlength": "0008",
			"Sequenceno": "007",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "DATE",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000002",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "DEACTIVATE",
			"Fieldlabel": "Indicator: Depreciation Area Is Deactiva",
			"Fieldtype": "CHAR",
			"Fieldlength": "0001",
			"Sequenceno": "001",
			"Ismandatory": false,
			"Hasf4": false,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "CHECKBOX",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000002",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "AREA",
			"Fieldlabel": "Real Depreciation Area",
			"Fieldtype": "NUMC",
			"Fieldlength": "0002",
			"Sequenceno": "002",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000002",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "DEPDESCRIPT",
			"Fieldlabel": "Short Name for Depreciation Area",
			"Fieldtype": "CHAR",
			"Fieldlength": "0012",
			"Sequenceno": "003",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000002",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "DEP_KEY",
			"Fieldlabel": "Depreciation Key",
			"Fieldtype": "CHAR",
			"Fieldlength": "0004",
			"Sequenceno": "004",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000002",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "ULIFE_YRS",
			"Fieldlabel": "Planned Useful Life in Years",
			"Fieldtype": "NUMC",
			"Fieldlength": "0003",
			"Sequenceno": "005",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000002",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "ULIFE_PRDS",
			"Fieldlabel": "Planned Useful Life in Periods",
			"Fieldtype": "NUMC",
			"Fieldlength": "0003",
			"Sequenceno": "006",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "INPUT",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000002",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "AM",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "Asset Master",
			"Roleid": "A3",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "Depreciation Area",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "M",
			"Viewname": "Valuation",
			"Viewdespc": "Valuation",
			"Secsequenceno": "004",
			"Sectionname": "Valuation",
			"Subsequenceno": "001",
			"Subsecname": "Valuation",
			"Fieldname": "ODEP_START_DATE",
			"Fieldlabel": "Depreciation Calculation Start Date",
			"Fieldtype": "DATS",
			"Fieldlength": "0008",
			"Sequenceno": "007",
			"Ismandatory": false,
			"Hasf4": true,
			"Iseditable": true,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "DATE",
			"Attachmenttype": "",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "T",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000000",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "",
			"Roleid": "",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "",
			"Viewname": "",
			"Viewdespc": "",
			"Secsequenceno": "019",
			"Sectionname": "ATTACHMENTS",
			"Subsequenceno": "001",
			"Subsecname": "Material Master template",
			"Fieldname": "",
			"Fieldlabel": "",
			"Fieldtype": "",
			"Fieldlength": "0000",
			"Sequenceno": "000",
			"Ismandatory": false,
			"Hasf4": false,
			"Iseditable": false,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "",
			"Attachmenttype": "MTMPT",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}, {

			"Stlan": "",
			"Apprflag": "",
			"Configtype": "",
			"Stlal": "",
			"Asset": "",
			"Columnno": "0000000000",
			"Equnr": "",
			"Forapp": "",
			"Saknr": "",
			"Attachmandtry": "",
			"Fieldvalue": "",
			"Fromstore": "",
			"Reqstatus": "",
			"Tax": "",
			"Mdgtype": "",
			"Tokunnr": "",
			"Tosales": "",
			"Tovendor": "",
			"Companycode": "",
			"Fromsales": "",
			"Fromsdivi": "",
			"Mdgtext": "",
			"Roleid": "",
			"Tocompanycode": "",
			"Todist": "",
			"Todivi": "",
			"Fromsdist": "",
			"Purchaseorg": "",
			"Rolename": "",
			"Matnr": "",
			"Topurchaseorg": "",
			"Maktx": "",
			"Mbrsh": "",
			"Mtart": "",
			"Viewid": "",
			"Viewname": "",
			"Viewdespc": "",
			"Secsequenceno": "019",
			"Sectionname": "ATTACHMENTS",
			"Subsequenceno": "002",
			"Subsecname": "Other documents",
			"Fieldname": "",
			"Fieldlabel": "",
			"Fieldtype": "",
			"Fieldlength": "0000",
			"Sequenceno": "000",
			"Ismandatory": false,
			"Hasf4": false,
			"Iseditable": false,
			"Url": "",
			"Iscritical": false,
			"Fieldproperty": "",
			"Attachmenttype": "OTHER",
			"Attachmentid": "",
			"Attachname": "",
			"Subsectype": "",
			"Message": "",
			"Data": "",
			"Validate": "",
			"Dupcheck": "",
			"Action": "",
			"Reqid": "",
			"Edit": false,
			"Reqtxt": "",
			"Save": "",
			"Lifnr": "",
			"Kunnr": "",
			"Materialto": "",
			"Fromplant": "",
			"Toplant": "",
			"Tostore": ""
		}],
		ObjectHeaderData: {
			"Main Asset Number": "11000",
			"Workitemid": "000000000000",
			"Asset Description": "M",
			"Asset class": "1000",
			"Status": "Error"
		}
	});
});