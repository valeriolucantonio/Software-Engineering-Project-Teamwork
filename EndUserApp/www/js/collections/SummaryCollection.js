define(function(require) {

	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var SummaryModel = require("models/SummaryModel");

	var SummaryCollection = Backbone.Collection.extend({
		constructorName: "SummaryCollection",
		model: SummaryModel
	});

	return SummaryCollection;
});