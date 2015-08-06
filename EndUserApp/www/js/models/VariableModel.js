define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");

	var VariableModel = Backbone.Model.extend({
		constructorName: "VariableModel",
		name:"",
		value:""
		});

	return VariableModel;
});