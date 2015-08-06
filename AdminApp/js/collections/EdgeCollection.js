define(function(require) {

	var Backbone = require("backbone");
	var EdgeModel = require("models/EdgeModel");

	var EdgeCollection = Parse.Object.extend("edge",{
		constructorName: "EdgeCollection",
		model: EdgeModel,
		edges:"",


		getEdges: function(edge){
			var query = new Parse.Query("edge");
  			query.find({
    			success: function(results) {
    				edge.edges=results;
    				edge.trigger("edgesReady", edge.edges);
    			 },

   				error: function(error) {
      			// Something went wrong
    		 }
  			});
 	 	}


	});

	return EdgeCollection;
});