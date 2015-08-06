define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var VariableModel = require("models/VariableModel");

	var VariableCollection = Backbone.Collection.extend({
		constructorName: "VariableCollection",
		model: VariableModel
	});

	return VariableCollection;
});