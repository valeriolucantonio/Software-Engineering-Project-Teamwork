define(function(require) {

	var Backbone = require("backbone");
	var Parse= require("parse");
	var TreeModel = require("models/TreeModel");

	var TreeCollection = Parse.Object.extend("tree",{
		constructorName: "TreeCollection",
		model: TreeModel,
		trees:"",
		treesNames:"",

	//method for getting all the trees in the database. 
	getTrees: function(tree){
		var query = new Parse.Query("tree");
  		query.find({
    			success: function(results) {
    				tree.trees=results;
    				tree.trigger("treesReady", tree.trees);
    			 },
   				error: function(error) {
      			// Something went wrong
    		 }
  			});
  	},
  	
  	//method for getting an array of trees' names. dependent from getTree
  	getTreesNames: function(tree){
  		this.treeNames= new Array();
      console.log(tree);
  		for(var i=0; i<this.trees.length; i++){
  			var object = $.parseJSON(JSON.stringify(tree.trees[i]));
  			console.log(tree.trees[i]);
  			for(var j=0; j<object.name.length; j++){
  				var x=$.parseJSON(JSON.stringify(object.name[j]));
  				if(Object.keys(x)[0]==="english"){
  					console.log("inside");
					console.log(x.english);
				}
  			}
  		}
  		return tree.treesNames;
  	}

	});

	return TreeCollection;
});