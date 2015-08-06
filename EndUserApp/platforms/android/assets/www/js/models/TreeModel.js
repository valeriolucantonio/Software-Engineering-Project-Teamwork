define(function(require) {

	var Backbone = require("backbone");
	var Parse= require("parse");
	var NodeModel=require("models/NodeModel");

	var TreeModel = Parse.Object.extend("tree",{
		constructorName: "TreeModel",
		name: "",
		rootNode: "",
		languages:"",

  
	createTree: function(){
		var tre=Parse.Object.extend("tree");
		tree=new tre();
		tree.set("languages",["english"]);
    var that=this;
		tree.save({
			success:function(tree){
				console.log(tree);
        //console.log(tree.objectId);
				var rootNode= new NodeModel();
				rootNode.createRootNode(tree, that);
			},
			error: function(){}
		});
		


	},
	updateRootNode: function(node){
		console.log(node.objectId);
    var query = new Parse.Query("tree");
    console.log(node.tree.objectId);
    query.equalTo("objectId", node.tree.objectId);
    query.first({
          success: function(result) {
              console.log(result);
              var rootNode= new NodeModel(node);
              result.set("rootNode",rootNode);
              result.save();
            // Iterate over results and grab the lat/long coordinates
           },
          error: function(error) {
            // Something went wrong
         }
        });

	},
  
	getTrees: function(){

		var query = new Parse.Query("tree");
  		query.find({
    			success: function(results) {
    				for (var i = 0; i < results.length; i++) { 
    				  	var object = $.parseJSON(JSON.stringify(results[i]));
    				  	for (var j = 0; j < object.name.length; j++) { 
    				  		//convert and print field "name" in json 
    				  		var x=$.parseJSON(JSON.stringify(object.name[j]));
    				  		console.log(x);

    				  		//print the language of name  
    				  		console.log(Object.keys(x)[0]);


    				  		for(var k=0; k<object.languages.length; k++){
    				  			console.log("in");
    				  				if(object.languages[k]===Object.keys(x)[0]){
    				  					console.log("the language of tree and tree name");}
    				  		}

							
						}
					}   								 
        		// Iterate over results and grab the lat/long coordinates
    			 },

   				error: function(error) {
      			// Something went wrong
    		 }
  			});
  	},
  	addLanguage: function(id, language){
  		var query = new Parse.Query("tree");
		  query.equalTo("objectId", id);
 	  	query.first({
    			success: function(result) {
    				  result.addUnique("languages", language);
    				  result.save();
        		// Iterate over results and grab the lat/long coordinates
    			 },
   				error: function(error) {
      			// Something went wrong
    		 }
  			});
  	},

    /*
      get the tree with id : id
    */
  	getTree: function(id){
  		var query = new Parse.Query("tree");
		  query.equalTo("objectId", id);
 	  	query.first({
    			success: function(result) {
    				  console.log(result);
        		// Iterate over results and grab the lat/long coordinates
    			 },
   				error: function(error) {
      			// Something went wrong
    		 }
  			});
  	},
    /*
      Get the name of the tree with id: id from the collectino of trees: trees in the language selected by tehe user: language
    */
    getTreeName: function(id,trees,language){
      
      var name="";
       for(var j=0; j<trees.length; j++){
         var object = $.parseJSON(JSON.stringify(trees[j]));
         if(object.objectId===id){
            for(var k=0; k<object.name.length; k++){
                var x=$.parseJSON(JSON.stringify(object.name[k]));
                console.log(x);
          if(Object.keys(x)[0]===language){
              name=object.name[k][language];
          }
            }
                
         }
      }
      return name;

    },

    getTree: function(id, trees){

     for(var j=0; j<trees.length; j++){
         var object = $.parseJSON(JSON.stringify(trees[j]));
         console.log(object);
         if(object.objectId===id){
                return object;
         }
      }
    },
    /*
      Get root node of the tree with id: id, from the collection of trees : trees
    */
    getRootNodeId: function(id, trees){

     for(var j=0; j<trees.length; j++){
         var object = $.parseJSON(JSON.stringify(trees[j]));
         if(object.objectId===id){
          
          if(object.rootNode===undefined) {
            
            return null;}
          else {
           
            var root= $.parseJSON(JSON.stringify(object.rootNode));
            console.log(root);
            if(root.objectId==="undefined") {
              return null;
            }
              else{
            return root.objectId;
          }
          }
         }
      }
      return null;
    },
		
  	


	});

	return TreeModel;
});