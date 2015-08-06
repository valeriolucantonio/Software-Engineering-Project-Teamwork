
	  var app = app || {};


	var  EdgeModel =  Parse.Object.extend("edge",{
		constructorName: "NodeModel",
		tree:"",

		

		updateEdgeText: function(id, text){
  		  	var query = new Parse.Query("edge");
		  	query.equalTo("objectId", id);
     	  	var that=this;
 		  	query.first({
    			success: function(results) {
            		var guard= false;
            		var result = $.parseJSON(JSON.stringify(results));
            		for(var i=0;i<result.text.length; i++){
              			var tex=$.parseJSON(JSON.stringify(result.text[i]));
                		if(Object.keys(tex)[0]===Object.keys(text)[0]){
		                    guard=true;
		                    results.remove("text", tex);   
		                    results.save({          
		                      success: function(results) {
                                results.addUnique("text", text);  
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
              results.addUnique("text", text);  
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
    updateEdgeResponse: function(id, response){
      var query = new Parse.Query("edge");
      query.equalTo("objectId", id);
      var that=this;
      query.first({
          success: function(results) {
            var guard= false;
            var result = $.parseJSON(JSON.stringify(results));
            for(var i=0;i<result.response.length; i++){
              var res=$.parseJSON(JSON.stringify(result.response[i]));
                if(Object.keys(res)[0]===Object.keys(response)[0]){
                    guard=true;
                    results.remove("response", res);   
                    results.save({          
                      success: function(results) {
                                results.addUnique("response",response);  
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
              results.addUnique("response", response);  
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
    updateEdgeValue: function(id, value){
      var query = new Parse.Query("edge");
      query.equalTo("objectId", id);
      var that=this;
      query.first({
          success: function(results) {
            results.set("value",value);  
            results.save();
           that.trigger("saved");
          },
           error: function(error) {
            // Something went wrong
         }
        });
    },
    updateEdgeNextNode: function(edge, node){
      var query = new Parse.Query("node");
      query.equalTo("objectId", node);
      query.first({
            success: function(result) {
                var query = new Parse.Query("edge");
                query.equalTo("objectId", edge);
                query.first({
                  success: function(resul) {
                    resul.set("nextNode", result);
                    resul.save();
                  },
                  

                  error: function(error) {}
                });


              // Iterate over results and grab the lat/long coordinates
             },
            error: function(error) {
              // Something went wrong
           }
          });

  },

    deleteEdge: function(id){
      var query = new Parse.Query("edge");
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
    createEdge: function(node){
      var query = new Parse.Query("node");
      query.equalTo("objectId", node);
      var that=this;

      query.first({
          success: function(result) {
           var e=Parse.Object.extend("edge");
            edge=new e();
            edge.set("text", [{english: "new edge"}]);
            edge.set("response", [{english: "here the response"}]);
            edge.set("belongsTo",result);
            edge.save({
              success:function(edge){
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

	app.Edge= new EdgeModel();
