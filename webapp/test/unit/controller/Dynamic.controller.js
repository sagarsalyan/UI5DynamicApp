/*global QUnit*/

sap.ui.define([
	"app/DynamicApp/controller/Dynamic.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Dynamic Controller");

	QUnit.test("I should test the Dynamic controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});