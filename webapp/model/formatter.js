sap.ui.define([], function () {
	"use strict";

	return {
		/**
		 * Rounds the currency value to 2 digits
		 *
		 * @public
		 * @param {string} sValue value to be formatted
		 * @returns {string} formatted currency value with 2 digits
		 */
		currencyValue: function (sValue) {
			if (!sValue) {
				return "";
			}

			return parseFloat(sValue).toFixed(2);
		},
		setFieldLabel: function (property, label) {
			if (property == 'BUTTON') {
				return " ";
			}
			return label;
		},
		status: function (sState) {
			if (sState === "Ready") {
				return "Success";
			} else if (sState === "Approved") {
				return "Success";
			} else if (sState === "Reject") {
				return "Error";
			} else if (sState === "Complete") {
				return "Success";
			}else if (sState === "Error") {
				return "Error";
			} else if (sState === "In Process") {
				return "Warning";
			} else if (sState === "Mass Upload") {
				return "Warning";
			}else if (sState === "Validated") {
				return "Warning";
			}else if (sState === "Wait") {
				return "Warning";
			}
		},
		// setFormFieldLabel: function (value1, value2) {
		// 	if (value1) {
		// 		return value1;
		// 	}
		// 	if (value2) {
		// 		return value2;
		// 	}
		// },
		setText: function (value, name) {
			if (name == 'DATE') {
				if (value != "" && value != undefined && value != null) {
					debugger;
					if (value.length == 8) {
						var m = value.slice(3, 5);
						var d = value.slice(0, 2);
						var y = value.slice(6, 8);
					} else {
						var m = value.slice(0, 1);
						var d = value.slice(2, 3);
						var y = value.slice(4, 8);
					}

					switch (m) {
					case "1":
						m = "Jan";
						break;
					case "2":
						m = "Feb";
						break;
					case "3":
						m = "Mar";
						break;
					case "4":
						m = "Apr";
						break;
					case "5":
						m = "May";
						break;
					case "6":
						m = "Jun";
						break;
					case "7":
						m = "Jul";
						break;
					case "8":
						m = "Aug";
						break;
					case "9":
						m = "Sep";
						break;
					case "10":
						m = "Oct";
						break;
					case "11":
						m = "Nov";
						break;
					case "12":
						m = "Dec";
						break;
					}
					return d + "." + m + "." + y;
					// return value.slice(0, 2) + "." + value.slice(2, 4) + "." + value.slice(4, 8);
				} else {
					return "";

				}
			} else {
				if (value != undefined && value != null) {
					return value;
				} else {
					return "";
				}
			}
		},
		setStatusText: function (value) {
			// if (value == 'In Process' || value == 'Wait' || value == 'Pending' || value=='Mass Upload' || value=='Wait') {
			// 	return 'Warning';
			// } else if (value == 'Ready' || value == 'Approved' || value == 'Complete' || value == 'Validated') {
			// 	return 'Success';
			// } else if (value == 'Error' || value == 'Reject' || value == 'Rejected') {
			// 	return 'Error';
			// } else {
			// 	return 'None'
			// }
			
			if (value === "Ready") {
				return "Indication05";
			} else if (value === "Approved") {
				return "Success";
			} else if (value === "Reject") {
				return "Error";
			} else if (value === "Complete") {
				return "Information";
			}else if (value === "Error") {
				return "Indication01";
			} else if (value === "In Process") {
				return "Warning";
			} else if (value === "Mass Upload") {
				return "Indication04";
			}
			
			
		},
		setErrorType: function (value) {
			if (value == 'E') {
				return 'Error';
			} else {
				return 'Warning'
			}
		},
		setFieldManagement: function (value) {
			if (value == "") {
				return false;
			} else if (value == 'X') {
				return true;
			} else {
				return value;
			}
		},
		setCheckBoxValue: function (value) {
			if (value == "") {
				return false;
			} else if (value == "X") {
				return true;
			} else if (value == true) {
				return true;
			} else if (value == false) {
				return false;
			}
			return false;
		},
		scoreValue: function (value) {
			var a = parseFloat(value);
			var roundValue = a.toFixed(2);
			var score = roundValue * 100;
			score = parseFloat(score);
			var finalscore = score.toFixed(2);
			finalscore = 100 - finalscore;
			return finalscore;
		},

		scoreColor: function (value) {
			var a = parseFloat(value);
			var roundValue = a.toFixed(2);
			var score = roundValue * 100;
			score = parseFloat(score);
			var finalscore = score.toFixed(2);
			finalscore = 100 - finalscore;
			if (finalscore <= 10) {
				return 'Error';
			} else if (10 <= finalscore && finalscore <= 30) {
				return 'Warning';
			} else if (finalscore > 30) {
				return 'Success';
			}
		},

	};

});