
	  var app = app || {};


	var  NodeModel =  Parse.Object.extend("node",{
		constructorName: "NodeModel",
		tree:"",

	createRootNode: function(tree, treeModel){
			var rootnode=new NodeModel();
			rootnode.set("tree", tree);
      rootnode.set("name", [{english: "root node"}]);
      rootnode.set("additionalInfo", [{english: "the additional information"}]);
      rootnode.set("question", [{english: "write here the question"}]);
			var that=this;
      alert("here");
			rootnode.save({
				
				success: function(node){
          console.log("funziona");
					var nod=$.parseJSON(JSON.stringify(node));
					treeModel.updateRootNode(nod);
				},
				error:function(){}
			});

		},

		updateNodeName: function(id, name){
  		  var query = new Parse.Query("node");
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
    updateNodeAdditionalInfo: function(id, additionalInfo){
      var query = new Parse.Query("node");
      query.equalTo("objectId", id);
      var that=this;
      query.first({
          success: function(results) {
            var guard= false;
            var result = $.parseJSON(JSON.stringify(results));
            for(var i=0;i<result.additionalInfo.length; i++){
              var add=$.parseJSON(JSON.stringify(result.additionalInfo[i]));
                if(Object.keys(add)[0]===Object.keys(additionalInfo)[0]){
                    guard=true;
                    results.remove("additionalInfo", add);   
                    results.save({          
                      success: function(results) {
                                results.addUnique("additionalInfo",additionalInfo);  
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
              results.addUnique("additionalInfo", additionalInfo);  
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
    updateNodeQuestion: function(id, question){
      var query = new Parse.Query("node");
      query.equalTo("objectId", id);
      var that=this;
      query.first({
          success: function(results) {
            var guard= false;
            var result = $.parseJSON(JSON.stringify(results));
            for(var i=0;i<result.question.length; i++){
              var q=$.parseJSON(JSON.stringify(result.question[i]));
                if(Object.keys(q)[0]===Object.keys(question)[0]){
                    guard=true;
                    results.remove("question", q);   
                    results.save({          
                      success: function(results) {
                                results.addUnique("question",question);  
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
              results.addUnique("question", question);  
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

    deleteNode: function(id){
      console.log("aaaa - deleteNode");
      var query = new Parse.Query("node");
      query.equalTo("objectId", id);
      var that=this;
      query.first({
          success: function(result) {
              result.destroy();
              result.save();
              console.log("succ - node deleted successfully");
              that.trigger("saved");
            // Iterate over results and grab the lat/long coordinates
           },
          error: function(error) {
            // Something went wrong
         }
        });
    },
    createNode: function(tree){
      var query = new Parse.Query("tree");
      query.equalTo("objectId", tree);
      var that=this;

      query.first({
          success: function(result) {
           var n=Parse.Object.extend("node");
            node=new n();
            node.set("name", [{english: "new node"}]);
            node.set("additionalInfo", [{english: "the additional information"}]);
            node.set("question", [{english: "write here the question"}]);
            node.set("tree",result);
            node.save({
              success:function(node){
                  that.trigger("saved");
              },
              error: function(){}
            });
         
          },
          error: function(error) {
            // Something went wrong
         }
        });
      
  
  },



		
		



	});

	app.Node= new NodeModel();
