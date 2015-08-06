
  var app = app || {};

	var InputNode = Parse.Object.extend("inputnode",{
		constructorName:"InputNode",
		text: "",
		name: "",
		calculation:{},
    	nextInputNode:{},
    	objectid:'',
    	createInputNode: function (){
    		var inode=Parse.Object.extend("inputnode");
    		inode.set("name",name);
    		inode.set("text",text);
    		inode.set("calculation",calculation);
    		inode.set("nextInputNode", nextInputNode);
    		inode.save({
			success:function(inputnode){
				console.log(inputnode);
         	 //that.trigger("inputNodeCreated", inputnode);

			},
			error: function(){}
			});

    	},
    	updateText: function(id, text){
    		var query = new Parse.Query("inputnode");
    	    query.equalTo("objectId", id);
    	  var that=this;
    	  query.first({
          success: function(results) {
            var guard= false;
            var result = $.parseJSON(JSON.stringify(results));
            for(var i=0;i<result.text.length; i++){
              var q=$.parseJSON(JSON.stringify(result.text[i]));
                if(Object.keys(q)[0]===Object.keys(text)[0]){
                    guard=true;
                    results.remove("text", q);   
                    results.save({          
                      success: function(results) {
                                results.addUnique("text",text);  
                                results.save();
                            //    that.trigger("saved");
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
             // that.trigger("saved");


            }
            
            // Iterate over results and grab the lat/long coordinates
           },
          error: function(error) {
            // Something went wrong
         }
        });

    	},
    	updateName: function(id, name){
    		var query = new Parse.Query("inputnode");
      		query.equalTo("objectId", id);
    	    var that=this;
     	    query.first({
            success: function(results) {
            var guard= false;
            var result = $.parseJSON(JSON.stringify(results));
            result.set("name",name);
            results.save({          
                      success: function(results) {
                      	console.log("Name of input node updated");
                      	//that.trigger("saved");
                      },           
                      error: function(error) {
                             // Something went wrong
                      }
                    });
            // Iterate over results and grab the lat/long coordinates
           },
          error: function(error) {
            // Something went wrong
         }
       	 });

    	},
    	updateCalculation: function(id, calculation){
      	var query = new Parse.Query("calculation");
    	    query.equalTo("objectId", nextInputNode);
   		   query.first({
            success: function(result) {
                var query = new Parse.Query("inputnode");
                query.equalTo("objectId", id);
                query.first({
                  success: function(res) {
                    res.set("nextInputNode", result);
                    res.save();
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
    	updateNextInputNode: function(id, nextInputNode){
    		var query = new Parse.Query("inputnode");
    	    query.equalTo("objectId", nextInputNode);
   		   query.first({
            success: function(result) {
                var query = new Parse.Query("inputnode");
                query.equalTo("objectId", id);
                query.first({
                  success: function(res) {
                    res.set("nextInputNode", result);
                    res.save();
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
    	deleteInputNode: function(id){
		var query = new Parse.Query("inputnode");
      		query.equalTo("objectId", id);
     		 var that=this;
     		 query.first({
     	     success: function(result) {
              result.destroy();
              result.save();
              console.log("succ");
             // that.trigger("saved");
            // Iterate over results and grab the lat/long coordinates
           },
          error: function(error) {
            // Something went wrong
         }
        });
    	}
	});
  	
  	app.inputNode = new InputNode();