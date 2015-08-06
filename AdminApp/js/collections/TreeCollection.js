
	var app = app || {};

  var TreeCollection = Parse.Object.extend("tree",{
		constructorName: "TreeCollection",
		trees:"",
		treesNames:"",

	//method for getting all the trees in the database. 
	getTrees: function(){
		var query = new Parse.Query("tree");
    var ths=this;
  		query.find({
    			success: function(results) {
    				ths.trigger("trees", results);
    			 },
   				error: function(error) {
      			// Something went wrong
    		 }
  			});
  	},
  	
  	//method for getting an array of trees' names. dependent from getTree
  	getTreesNames: function(tree){
  		this.treeNames= new Array();
      console.log(tree);
  		for(var i=0; i<this.trees.length; i++){
  			var object = $.parseJSON(JSON.stringify(tree.trees[i]));
  			console.log(tree.trees[i]);
  			for(var j=0; j<object.name.length; j++){
  				var x=$.parseJSON(JSON.stringify(object.name[j]));
  				if(Object.keys(x)[0]==="english"){
  					console.log("inside");
					console.log(x.english);
				}
  			}
  		}
  		return tree.treesNames;
  	},
    getTree:function(objectId, trees){
       for(var i=0; i<trees.length; i++){
          var object = $.parseJSON(JSON.stringify(trees[i]));
         if(object.objectId===objectId){
			
         }
    }
},
    getTreeLanguages: function(objectId, trees){
      var languages= new Array();
       for(var i=0; i<trees.length; i++){
          var object = $.parseJSON(JSON.stringify(trees[i]));
           if(object.objectId===objectId){
               return object.languages;
           }
        }
    },
    getTreeInfo:function(objectId, trees, language){

       var model={name: "", description:""};
       for(var i=0; i<trees.length; i++){
          var object = $.parseJSON(JSON.stringify(trees[i]));
         if(object.objectId===objectId){
             for(var j=0; j<object.name.length; j++){
               var name=$.parseJSON(JSON.stringify(object.name[j]));
               if(Object.keys(name)[0]===language){
                    model.name= name[language];
                }
              }
              for(var k=0; k<object.description.length; k++){
              var descr=$.parseJSON(JSON.stringify(object.description[k]));
              if(Object.keys(descr)[0]===language){
                    model.description= descr[language];
               }
              }   
         }
       }
      return model;
      }
	});
  app.Trees = new TreeCollection();

