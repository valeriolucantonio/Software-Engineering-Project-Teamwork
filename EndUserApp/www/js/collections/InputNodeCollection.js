define(function(require) {

	var Backbone = require("backbone");
	var InputNodeModel = require("models/InputNodeModel");

var InputNodeCollection = Parse.Object.extend("inputnode",{
	constructorName:"InputNodeCollection",
	model: InputNodeModel,
	inputnodes:"",
	getInputNodes:function (inputnode){
		var query = new Parse.Query("inputnode");
  			query.find({
    			success: function(results) {
    			inputnode.inputnodes=results;
    			inputnode.trigger("inputNodesReady", inputnode.inputnodes);
    			 },

   				error: function(error) {
      			// Something went wrong
      			console.log("error");
    		 }
		});

	}

	});
  return InputNodeCollection;
});