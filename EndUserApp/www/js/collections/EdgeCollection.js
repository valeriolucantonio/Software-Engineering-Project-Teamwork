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
 	 	},
 	 	/*
			Get a list of answers corresponding to the node id 
			The first argument, node is the node id of the question whose answers we are looking for 
			The second argument, edges is the collection of edges corresponding to the tree that is selected
 	 	*/
 	 	getAnswersFromNode: function(node, edges){
 	 		var answers= new Array();
 	 		var count=0;
 	 		 for (var i = 0; i < edges.length; i++) {
 	 		 	  var object = $.parseJSON(JSON.stringify(edges[i]));
 	 		 	  var question= $.parseJSON(JSON.stringify(object.belongsTo));
 	 		 	  if(question.objectId===node){
 	 		 	  	answers[count]=object;
 	 		 	  	count++;
 	 		 	  }


 	 		 }
 	 		 return  $.parseJSON(JSON.stringify(answers));


 	 	}


	});

	return EdgeCollection;
});