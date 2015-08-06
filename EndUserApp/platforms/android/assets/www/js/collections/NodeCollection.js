define(function(require) {

	var Backbone = require("backbone");
	var NodeModel = require("models/NodeModel");

	var NodeCollection =Parse.Object.extend("node",{
		constructorName: "NodeCollection",
		model: NodeModel,
		nodes:"",

		
		getNodes: function(node){
			var query = new Parse.Query("node");
  			query.find({
    			success: function(results) {
    				node.nodes=results;
    				node.trigger("nodesReady", node.nodes);
    			 },

   				error: function(error) {
      			// Something went wrong
    		 }
  			});
 	 	}

	});

	return NodeCollection;
});