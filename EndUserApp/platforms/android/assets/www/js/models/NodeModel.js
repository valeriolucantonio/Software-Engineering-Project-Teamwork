define(function(require) {

	var Backbone = require("backbone");
	var Parse= require("parse");
	//var TreeModel= require("models/TreeModel");

	var  NodeModel =  Parse.Object.extend("node",{
		constructorName: "NodeModel",
		tree:"",

		createRootNode: function(tree, treeModel){
			this.on("rootCreated",this.updateTreeRootNode);
			var rootnode=new NodeModel();
			rootnode.set("tree", tree);
			rootnode.set("isRootNode", true);
			var that=this;
			rootnode.save({
				
				success: function(node){
					var nod=$.parseJSON(JSON.stringify(node));
					treeModel.updateRootNode(nod);
				},
				error:function(){}
			});

		},

		getNode: function(id, nodes){

      		for(var j=0; j<nodes.length; j++){
      			var object = $.parseJSON(JSON.stringify(nodes[j]));
          		if(object.objectId===id){
          			return object;
          		}
          	}
		},

    /*
    Get node with id, by iterating over the selected tree's collection of nodes , in the chosen language
    */
	  getNode2: function(id, nodes, language){
	  		var nodeMod={};
      		for(var j=0; j<nodes.length; j++){
      			var object = $.parseJSON(JSON.stringify(nodes[j]));
          		if(object.objectId===id){
          			nodeMod["objectId"]=id;

          			for(var i=0; i<object.name.length; i++){
          				var name= $.parseJSON(JSON.stringify(object.name[i]));
          				if(Object.keys(name)[0]===language){
          					nodeMod["name"]=name[language];
          				}
          			}
          			for(var i=0; i<object.additionalInfo.length; i++){
          				var additionalInfo= $.parseJSON(JSON.stringify(object.additionalInfo[i]));
          				if(Object.keys(additionalInfo)[0]===language){
          					nodeMod["additionalInfo"]=additionalInfo[language];
          				}
          			}
          			for(var i=0; i<object.question.length; i++){
          				var question= $.parseJSON(JSON.stringify(object.question[i]));
          				if(Object.keys(question)[0]===language){
          					nodeMod["question"]=question[language];
          				}
          			}


          		}
          	}
            console.log(nodeMod);
          	return nodeMod;
		}


		
		



	});

	return NodeModel;
});