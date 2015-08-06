define(function(require) {

  var Backbone = require("backbone");
  var Parse= require("parse");
  var InputNodeModel=require("models/InputNodeModel");


	var CalculationModel = Parse.Object.extend("calculation",{

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
    	}, 
      /*
        Get the name of the calculation, the descrption, the root inout node. and the objectid 
        of all the calculations int the calculation collection (the clalculations argument) in 
        the language selecet by the user (language argument)
      */

      getCalculationInfo:function(language,calculations){
        var array=new Array();
          for (var i = 0; i < calculations.length; i++) { 
                var object = $.parseJSON(JSON.stringify(calculations[i]));
                //console.log(object);
                array[i]={};
                for(var j=0; j<object.nameCalc.length; j++){
                    var nameC= $.parseJSON(JSON.stringify(object.nameCalc[j]));
                    if(Object.keys(nameC)[0]===language){
                      array[i]["nameCalc"]=nameC[language];
                    }
                }
                for(var j=0; j<object.nameCalc.length; j++){
                    var desc= $.parseJSON(JSON.stringify(object.description[j]));
                    if(Object.keys(desc)[0]===language){
                      array[i]["description"]=desc[language];
                    }
                }
                var rootInpNode= $.parseJSON(JSON.stringify(object.rootInputNode));
                console.log(rootInpNode);
                array[i]["rootInputNode"]=rootInpNode.objectId;
                array[i]["objectId"]=object.objectId;
              }

        console.log(JSON.stringify(array));
        return array;
      },  
      /*
        Get the name and the description of the calcuation with object id idCalc
        by iterating through the collection of calcuations (calcuations argument)
        in the language seleceted by the user (language argument)
      */
      getCalculationNameDescr:function(idCalc,calculations,language){
        var obj={};
        for (var i = 0; i < calculations.length; i++) { 
          var object = $.parseJSON(JSON.stringify(calculations[i]));
              if(object.objectId==idCalc){
                 for(var j=0; j<object.nameCalc.length; j++){
                    var nameC= $.parseJSON(JSON.stringify(object.nameCalc[j]));
                    if(Object.keys(nameC)[0]===language){
                      obj["calcName"]=nameC[language];
                    }
                }
                for(var j=0; j<object.nameCalc.length; j++){
                    var desc= $.parseJSON(JSON.stringify(object.description[j]));
                    if(Object.keys(desc)[0]===language){
                      obj["description"]=desc[language];
                    }
                }

                
              }
        }
        return obj;
      },  
      /*
        Get the root node of the calcuation with id idCalc 
      */
      getCalculationRootNode:function(idCalc,calculations){
             for (var i = 0; i < calculations.length; i++) { 
              var object = $.parseJSON(JSON.stringify(calculations[i]));
              if(object.objectId==idCalc){
                var rootInpNode= $.parseJSON(JSON.stringify(object.rootInputNode));
                console.log(rootInpNode);
                return(rootInpNode.objectId);
                
              }
             }

      },
      /*
        Get all the information relevant for evaluating the formula adn generating the final resutl from the calcuation 
        if nameOrVal is true : then we have to compare the result from the formula with a variable the user has entered
        else : we have to comare the result from the formula with a certai value (given in the valThreshol field of type Number)
      */
      getFormulaInfo:function(idCalc,calculations){
        var obj={};
             for (var i = 0; i < calculations.length; i++) { 
              var object = $.parseJSON(JSON.stringify(calculations[i]));
              if(object.objectId==idCalc){
                  obj["formula"]=object.formula;
                  obj["operator"]=object.operator;
                  obj["nameOrVal"]=object.nameOrVal;
                  if (object.nameOrVal===true){
                    obj["nameThreshold"]=object.nameThreshold;
                  }
                  if (object.nameOrVal===false){
                    obj["valThreshold"]=object.valThreshold;
                  }
              }
             }
        return obj;
      }

	});
  	
  	return CalculationModel;
});