
  var app = app || {};

	var Calculation = Parse.Object.extend("calculation",{

		constructorName:"Calculation",
		nameCalc: "",
		description: "",
		formula:"",
    	tree:"",
    	objectid:'',
    	createCalculation: function(tree){
    		var calc=new Calculation();
    		calc.set("name","");
    		calc.set("description","");
    		calc.set("formula","");
    		calc.set("tree",tree);
    		rootnode.save({
				success: function(calc){
					console.log("BRAVO");
				},
				error:function(){}
			});
    		
    	},
    	//name is a pair of key and value , for ex. "english":"production cost"
    	updateNameCalc:function(id,name){
    		var query = new Parse.Query("calculation");
      		query.equalTo("objectId", id);
    	    var that=this;
     	    query.first({
            success: function(results) {
            var guard= false;
            var result = $.parseJSON(JSON.stringify(results));
            for(var i=0;i<result.nameCalc.length; i++){
              var add=$.parseJSON(JSON.stringify(result.nameCalc[i]));
                if(Object.keys(add)[0]===Object.keys(nameCalc)[0]){
                    guard=true;
                    results.remove("nameCalc", add);   
                    results.save({          
                      success: function(results) {
                                results.addUnique("nameCalc",name);  
                                results.save();
                               // that.trigger("saved");
                      },           
                      error: function(error) {
                             // Something went wrong
                      }
                    });
                }

            }
            if(guard==false){
              results.addUnique("nameCalc", name);  
              results.save();
              //that.trigger("saved");


            }
            
            // Iterate over results and grab the lat/long coordinates
           },
          error: function(error) {
            // Something went wrong
         }
        });

    	},
    	updateDescription:function (id,description){
    		var query = new Parse.Query("calculation");
      		query.equalTo("objectId", id);
    	    var that=this;
     	    query.first({
            success: function(results) {
            var guard= false;
            var result = $.parseJSON(JSON.stringify(results));
            for(var i=0;i<result.description.length; i++){
              var add=$.parseJSON(JSON.stringify(result.description[i]));
                if(Object.keys(add)[0]===Object.keys(description)[0]){
                    guard=true;
                    results.remove("description", add);   
                    results.save({          
                      success: function(results) {
                                results.addUnique("description",description);  
                                results.save();
                                //that.trigger("saved");
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
              //that.trigger("saved");


            }
            
            // Iterate over results and grab the lat/long coordinates
           },
          error: function(error) {
            // Something went wrong
         }
        });
    	},
    	updateFormula:function(id,formula){
    		var query = new Parse.Query("calculation");
      		query.equalTo("objectId", id);
    	    var that=this;
     	    query.first({
            success: function(results) {
            var guard= false;
            var result = $.parseJSON(JSON.stringify(results));
            result.set("formula",formula);
            results.save({          
                      success: function(results) {
                      	console.log("formula updated");
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
    	deleteCalculation:function(id){
    		var query = new Parse.Query("calculation");
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
  	
  	app.Calculation = new Calculation();