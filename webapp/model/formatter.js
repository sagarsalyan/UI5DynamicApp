sap.ui.define([], function () {
	"use strict";
	return {
		ddmmyyyy: function (e) {
			if (e !== undefined || e !== null) {
				if (isNaN(parseInt(e)) == false) {
					var r = e.slice(0, 4);
					var t = e.slice(4, 6);
					var n = e.slice(6, 8);
					return n + "." + t + "." + r
				} else {
					return ""
				}
			}
		},
		opositeofddmmyyyy: function (e) {
			if (e !== undefined || e !== null) {
				if (isNaN(parseInt(e)) == false) {
					var r = e.slice(0, 2);
					var t = e.slice(3, 5);
					var n = e.slice(6, 10);
					return n + t + r
				} else {
					return ""
				}
			}
		},
		setWordWraping: function (e) {
			if (e.length > 20) {
				return e.substr(0, 18) + "..."
			} else {
				return e
			}
		},
		valuFormatter: function (e) {
			if (e !== "-") {
				return e.split("-")[0]
			}
			return ""
		},
		status: function (e) {
			if (e === "COMPLETED") {
				return "Success"
			} else if (e === "REJECTED") {
				return "Error"
			} else {
				return "Warning"
			}
		},
		tableFieldLength: function (e, r) {
			if (e === "Z504") {
				if (r.toLowerCase().includes("action")) {
					return "4rem"
				} else if (r.toLowerCase().includes("s.no")) {
					return "3rem"
				}
			} else {
				if (r.toLowerCase().includes("action")) {
					return "4rem"
				}
			}
		},
		fieldLength: function (e) {
			return Number(e)
		},
		_statusformat: function (e) {
			var r = "";
			if (e === "Initiated") {
				r = '<p style="color:blue;">' + e + "</p>"
			} else if (e === "Pending") {
				r = '<p style="color:orange;">' + e + "</p>"
			} else if (e === "Waiting") {
				r = '<p style="color:orange;">' + e + "</p>"
			} else if (e === "Rejected") {
				r = '<p style="color:red;">' + e + "</p>"
			} else {
				r = '<p style="color:green;">' + e + "</p>"
			}
			return r
		},
		linkLegth: function (e) {
			return "20rem"
		},
		RoleFormatter: function (e) {
			return "Error"
		},
		minDateValidation: function (e, r) {
			var t = (new Date).getDate();
			var n = (new Date).getMonth();
			var i = (new Date).getFullYear()
		},
		maxDateValidation: function (e, r) {
			var t = (new Date).getDate();
			var n = (new Date).getMonth();
			var i = (new Date).getFullYear();
			if (e === "Z504") {
				if (r === "ZDATEOF_APPLICATION") {
					return new Date
				}
			}
		},
		fieldLabelText: function (e, r, t) {
			if (e === "Z508") {
				if (r === "DR_ON_PENSION") {
					return "I have not resigned from Government service to take up appointment in another Department of State Government / Central Government or under a Body corporate owned or controlled by the State or Central Government"
				} else if (r === "DECLAR_TEXT1") {
					return "I hereby undertake that no appeal shall be preferred by me against my dismissal/removal/compulsory retirement/invalidation"
				} else if (r === "DECLAR_TEXT2") {
					return "I hereby under take to refund any excess payment arising out clerical error in the settlement of GPF claim"
				} else {
					return t
				}
			} else {
				return t
			}
		},
		dateFormat: function (e) {
			if (e !== undefined || e !== null) {
				if (isNaN(parseInt(e)) == false) {
					var r = e.slice(0, 4);
					var t = e.slice(4, 6);
					var n = e.slice(6, 8);
					return n + "." + t + "." + r
				} else {
					return ""
				}
			}
		}
	}
});