var app = app || {};

var CalculationCollection = Parse.Object.extend("calculation",{


getNodes: function(treeId) {
		var parentTree = new TreeModel();
		parentTree.id = currentTree;
		var query = new Parse.Query("calculation");
		query.equalTo("tree",parentTree);
		var ths = this;
		query.find({
			success: function(results) {
				ths.set("calculationsList",results);
				//ths.trigger("nodes", results);
			},
			error: function(error) {
					
			}
		});
	}
	});
  app.calculations = new CalculationCollection();