var app = app || {};

var EdgeCollection = Parse.Object.extend("edge",{
	defaults: {
		edgeList: "",
		edgeArr: ""
	},
	// Fetch the nodes from the database
	getEdges: function(currentNode) {
		var parentNode = new NodeModel();
		parentNode.id = currentNode;
		var query = new Parse.Query("edge");
		query.equalTo("belongsTo",parentNode);
		var ths = this;
		query.find({
			success: function(results) {
				ths.set("edgeList",results);
				ths.trigger("edges", results);
			},
			error: function(error) {
				console.log("Could not fetch nodes from database: " + JSON.stringify(error));	
			}
		});
	},
	getEdgeQuestions: function(lang) {
		var edges = this.get("edgeList");
		var arr = new Array();
		for (var i=0;i<edges.length; i++) {
			var text = "...";
			for (var n=0; n<edges[i].get("text").length; n++) {
				if ( edges[i].get("text")[n][lang] != undefined) {
					text = edges[i].get("text")[n][lang];		
					break;
				}
			}
			var response = "...";
			if(edges[i].get("response")!=undefined){
			for (var n=0; n<edges[i].get("response").length; n++) {
				if ( edges[i].get("response")[n][lang] != undefined) {
					response = edges[i].get("response")[n][lang];		
					break;
				}
			}}
			var edge = $.parseJSON(JSON.stringify(edges[i]));
			var idnn="";
			if(edges[i].get("nextNode")!=undefined){

			var nextNode= edges[i].get("nextNode");
			var nn=$.parseJSON(JSON.stringify(nextNode));
			var idnn=nn.objectId;
			}
			arr[i] = {id: edge.objectId, text: text, response: response, value: edges[i].get("value"), nextNode: idnn};
		}
		this.set("edgeArr", arr);
		return arr;
    
	},
	getEdge: function(edgeSelected) {
		var edges = this.get("edgeArr");
		for (var i=0; i<edges.length; i++) {
			if (edges[i].id == edgeSelected)
				return edges[i];
		}
	}
});
  app.Edges = new EdgeCollection();

