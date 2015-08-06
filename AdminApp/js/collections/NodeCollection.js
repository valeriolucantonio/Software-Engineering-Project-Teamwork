var app = app || {};

var NodeCollection = Parse.Object.extend("node",{
	defaults: {
		nodesList: "",
		nodeArr: ""
	},
	// Fetch the nodes from the database
	getNodes: function(currentTree) {
		var parentTree = new TreeModel();
		parentTree.id = currentTree;
		var query = new Parse.Query("node");
		query.equalTo("tree",parentTree);
		var ths = this;
		query.find({
			success: function(results) {
				ths.set("nodeList",results);
				ths.trigger("nodes", results);
			},
			error: function(error) {
				console.log("Could not fetch nodes from database: " + JSON.stringify(error));	
			}
		});
	},
	getNodeQuestions: function(lang) {
		var nodes = this.get("nodeList");
		var arr = new Array();
		var keys = new Array("question", "additionalInfo", "name");
		for (var i=0;i<nodes.length; i++) {
			var values = new Array("...","...","...");
			for (var k=0; k<keys.length; k++) {
				for (var n=0; n<nodes[i].get(keys[k]).length; n++) {
					if ( nodes[i].get(keys[k])[n][lang] != undefined) {
						values[k] = nodes[i].get(keys[k])[n][lang];
						break;
					}
				}
			}
			var node = $.parseJSON(JSON.stringify(nodes[i]));
			arr[i] = {id: node.objectId, question: values[0], info: values[1], name: values[2]};
		}
		this.set("nodeArr", arr);
		return arr;
    
	},
	getNode: function(nodeSelected) {
		var nodes = this.get("nodeArr");
		for (var i=0; i<nodes.length; i++) {
			if (nodes[i].id == nodeSelected)
				return nodes[i];
		}
	},
    deleteBelongsNodes: function(currentTree) {
		var parentTree = new TreeModel();
		parentTree.id = currentTree;
		var query = new Parse.Query("node");
		query.equalTo("tree",parentTree);
		var ths = this;
		query.find({
			success: function(results) {
				Parse.Object.destroyAll(results);
			},
			error: function(error) {
				console.log("Could not fetch nodes from database: " + JSON.stringify(error));	
			}
		});
	},
});
  app.Nodes = new NodeCollection();

