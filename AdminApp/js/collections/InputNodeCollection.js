var app = app || {};

var InputNodeCollection = Parse.Object.extend("inputnode",{

	getInputNodes:function (calcId){
		var parentCalc = new TreeModel();
		parentCalc.id = calcId;
		var query = new Parse.Query("inputnode");
		query.equalTo("calculation",parentCalc);
		var that = this;
		query.find({
			success: function(results) {
				that.set("inuputNodesList",results);
				//ths.trigger("nodes", results);
			},
			error: function(error) {
					
			}
		});

	}

	});
  app.inputNodes = new InputNodeCollection();