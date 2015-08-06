define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");

	var SummaryModel = Backbone.Model.extend({
		constructorName: "SummaryModel",
		question:"",
		answer:"", 
		number:"",
		nextId:""
		});

	return SummaryModel;
});


