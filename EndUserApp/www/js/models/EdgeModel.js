define(function(require) {

	var Backbone = require("backbone");

	var EdgeModel = Parse.Object.extend("edge",{
		constructorName: "AnswerModel",
		ID: "",
		questions: "",
		nextNode: "",
		belongs: "",

    /*
    Get the edge attributes in the chosen language.
    If next node is undefined put summary instead, check for summary later
    */
		getEdge: function(id, answers, language){
	  		var edgeMod={};
      		for(var j=0; j<answers.length; j++){
      			var object = $.parseJSON(JSON.stringify(answers[j]));
      			var nNode;
          		if(object.objectId===id){
          			console.log(object.nextNode);
          			if(object.nextNode===undefined){
						edgeMod["nextNode"]="summary";}
          			else{
	          			nNode=$.parseJSON(JSON.stringify(object.nextNode));
	          			edgeMod["nextNode"]=nNode.objectId;
          			}
					
					var bNode=$.parseJSON(JSON.stringify(object.belongsTo));
					edgeMod["objectId"]=id;
					edgeMod["belongsTo"]=bNode.objectId;
					edgeMod["value"]=object.value
          			for(var i=0; i<object.text.length; i++){
          				var text= $.parseJSON(JSON.stringify(object.text[i]));
          				if(Object.keys(text)[0]===language){
          					edgeMod["text"]=text[language];
          				}
          			}
                console.log(object.response);
          			for(var i=0; i<object.response.length; i++){
          				var response= $.parseJSON(JSON.stringify(object.response[i]));
          				if(Object.keys(response)[0]===language){
          					edgeMod["response"]=response[language];
          				}
          			}
     


          		}
          	}
          	return edgeMod;

		}

	});

	return EdgeModel;
});