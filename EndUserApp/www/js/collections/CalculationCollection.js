define(function(require) {

	var Backbone = require("backbone");
	var CalculationModel = require("models/CalculationModel");

var CalculationCollection = Parse.Object.extend("calculation",{


constructorName: "CalculationCollection",
		model: CalculationModel,
		calculations:"",

		getCalculations: function(calculation){
			var query = new Parse.Query("calculation");
  			query.find({
    			success: function(results) {
    			calculation.calculations=results;
    			calculation.trigger("calculationsReady", calculation.calculations);
    			 },

   				error: function(error) {
      			// Something went wrong
      			console.log("error");
    		 }
  			});
 	 	}

	});
  
return CalculationCollection;
});