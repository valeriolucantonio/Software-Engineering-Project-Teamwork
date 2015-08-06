
  var app = app || {};

	var TreeModel = Parse.Object.extend("tree",{
		constructorName: "TreeModel",
		name: "",
		rootNode: "",
		languages:"",
    objectId:"",


	createTree: function(){
		var tre=Parse.Object.extend("tree");
		tree=new tre();
		tree.set("languages",["english"]);
    tree.set("name", [{english: "newTree"}]);
    tree.set("description", [{english: "the description of a newTree"}]);

    var that=this;
		tree.save({
			success:function(tree){
          that.trigger("treeCreated", tree);

			},
			error: function(){}
		});
	
	},
  deleteTree: function(id){
    var query = new Parse.Query("tree");
      query.equalTo("objectId", id);
      var that=this;
      query.first({
          success: function(result) {
              result.destroy();
              result.save();
              that.trigger("saved");
            // Iterate over results and grab the lat/long coordinates
           },
          error: function(error) {
            // Something went wrong
         }
        });
  },

	updateRootNode: function(node){
    var query = new Parse.Query("tree");
    console.log(node.tree.objectId);
    query.equalTo("objectId", node.tree.objectId);
    var that=this;
    console.log(that);
    query.first({
          success: function(result) {
              console.log(result);
              var rootNode= new NodeModel(node);
              result.set("rootNode",rootNode);
              result.save();
              that.trigger("saved");
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
      var that=this;
 	  	query.first({
    			success: function(result) {
    				  result.addUnique("languages", language);
    				  result.save();
              console.log("added");
              that.trigger("saved");
        		// Iterate over results and grab the lat/long coordinates
    			 },
   				error: function(error) {
      			// Something went wrong
    		 }
  			});
  	},
    deleteLanguage: function(id, language){
      console.log("eccolo");
      var query = new Parse.Query("tree");
      query.equalTo("objectId", id);
      var that=this;

      query.first({

          success: function(results) {
            console.log(results);
             var result = $.parseJSON(JSON.stringify(results));
             for(var i=0;i<result.languages.length; i++){
              console.log(result.languages[i]);
                if(result.languages[i]===language){
                  console.log("removed");
                   results.remove("languages", language);   
                   results.save();
                   that.trigger("saved");
                 }
              }

        
           },
          error: function(error) {
            // Something went wrong
         }
        });
      },

  	updateTreeName: function(id, name){
  		var query = new Parse.Query("tree");
		  query.equalTo("objectId", id);
      var that=this;
 		  query.first({
    			success: function(results) {
            var guard= false;
            var result = $.parseJSON(JSON.stringify(results));
            for(var i=0;i<result.name.length; i++){
              var nam=$.parseJSON(JSON.stringify(result.name[i]));
                if(Object.keys(nam)[0]===Object.keys(name)[0]){
                    guard=true;
                    results.remove("name", nam);   
                    results.save({          
                      success: function(results) {
                                results.addUnique("name", name);  
                                results.save();
                                that.trigger("saved");

                      },           
                      error: function(error) {
                             // Something went wrong
                      }
                    });
                }

            }
            if(guard==false){
              results.addUnique("name", name);  
              results.save();
              that.trigger("saved");


            }
    				
        		// Iterate over results and grab the lat/long coordinates
    			 },
   				error: function(error) {
      			// Something went wrong
    		 }
  			});
  	},
    updateTreeDescription: function(id, description){
      var query = new Parse.Query("tree");
      query.equalTo("objectId", id);
      var that=this;
      query.first({
          success: function(results) {
            var guard= false;
            var result = $.parseJSON(JSON.stringify(results));
            for(var i=0;i<result.description.length; i++){
              var des=$.parseJSON(JSON.stringify(result.description[i]));
                if(Object.keys(des)[0]===Object.keys(description)[0]){
                    guard=true;
                    results.remove("description", des);   
                    results.save({          
                      success: function(results) {
                                results.addUnique("description", description);  
                                results.save();
                                that.trigger("saved");
                      },           
                      error: function(error) {
                             // Something went wrong
                      }
                    });
                }

            }
            if(guard==false){
              results.addUnique("description", description);  
              results.save();
              that.trigger("saved");


            }
            
            // Iterate over results and grab the lat/long coordinates
           },
          error: function(error) {
            // Something went wrong
         }
        });
    },
    
		
  	

	});
  app.Tree = new TreeModel();
