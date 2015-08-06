  // js/views/app.js

// Variables that are used by many functions
  var defaultLanguage = "english";
  var nodeSelectedLanguage = "english";
  var treeLanguageArr = new Array();  // Contains the available languages for the currently selected tree
  var treeSelected = null;
  var lastTreeSelected = null;
  var nodeSelected = null;
  var app = app || {};

  // The Application
  // ---------------

  // Our overall **AppView** is the top-level piece of UI.
  app.TabView = Backbone.View.extend({

    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: '#panel',

    // Our template for the line of statistics at the bottom of the app.
    Template: _.template( $('#panel').html() ),
    ListTemplate:_.template( $('#tabs').html() ),

/*
// Binds events in index.html to functions in this document
// For example, when the user clicks the select element with id=survey  
// (the list that contains the name of the trees in the database),
// the function showTreeAvailableLanguages
*/
    events: {
      'click #survey': "showTreeAvailableLanguages",
      'click #availableLanguages': "showTreeInformation",
      'click #updateTree': "updateTree",
      'click #deleteLanguage': "deleteLanguage",
      'click #addLanguage': "addLanguage",
      'click #addTree': "addTree",
      'click #deleteTree': "deleteTree",
      
      'click #questionsTab': "fetchNodes",
      "click #availableLanguagesNodes": "updateNodeLanguage",
      "click #nodeList": "nodeSelected",
      "click #updateNode": "updateNode",
      "click #removeNode": "deleteNode",
      "click #addNode": "addNode",
      
      "click #addEdge": "addEdge",
      "click #nodeEdges": "edgeSelected",
      "click #saveEdge": "updateEdge",
      "click #removeEdge": "deleteEdge"

    },
    initialize: function() {    
      // app.Trees refers to an instance of TreeCollection (collections/TreeCollection.js)
      this.listenTo(app.Trees, 'trees', this.showListTree);	
      // app.Tree referes to an instance of TreeModel (models/TreeModel.js)
      this.listenTo(app.Tree,"saved",this.fetchTrees);
      this.listenTo(app.Tree,"treeCreated",this.updateRootNode);

      app.nodes = null;
      // app.Nodes refers to an instance of NodeCollection (collections/NodeCollection.js)
      this.listenTo(app.Nodes, "nodes", this.nodesFetched);
      // app.Nodes refers to an instance of NodeModel (models/NodeModel.js)
      this.listenTo(app.Node,"saved",this.fetchNodes);

      app.edges = null;
      // app.Edges refers to an instance of EdgeCollection (collections/EdgeCollection2.js)
      this.listenTo(app.Edges, "edges", this.edgesFetched);
      // app.Edge refers to an instance of EdgeModel (models/EdgeModel.js)// app.Tree
      this.listenTo(app.Edge,"saved",this.fetchEdges);
      console.log("initalize");
		  this.fetchTrees();
      this.render();
    },
    
////TREE METHODS
  	render: function() {
      this.$el.html(this.Template(name));
      return this;
    },
    addTree: function(){
      app.Tree.createTree();
    },
    // Called the method getTrees in file collections/TreeCollection.js
    fetchTrees: function(){
    	app.trees=null;
	    app.Trees.getTrees();
    },
    deleteTree: function(){
      console.log("exxolo - deleteTree");
	    var remove = confirm("Do you really want to delete this tree?");
	    if (remove) {
    	  	app.Tree.deleteTree(treeSelected);
          	app.Nodes.deleteBelongsNodes(treeSelected);
		}
    },
    updateRootNode: function(tree){
      console.log("update");
      app.Node.createRootNode(tree, app.Tree);
    },
    deleteLanguage: function(){
      var language=$('select[name=availableLanguages]').val();
      app.Tree.deleteLanguage(treeSelected, language);
    },
    addLanguage: function(){
      var language=document.getElementById('newLanguage').value;
      app.Tree.addLanguage(treeSelected, language);
    },
    updateTree: function(){
      var language=$('select[name=availableLanguages]').val();
      var description={};
      var name={};
      description[language]=document.getElementById('treeDescription').value;
      name[language]=document.getElementById('treeName').value;
      app.Tree.updateTreeName(treeSelected, name);
      app.Tree.updateTreeDescription(treeSelected, description);
    },
    showTreeAvailableLanguages: function(){
      document.getElementById("tree_information").style.visibility="visible";
      treeSelected = $('select[name=survey]').val();
      document.getElementById("treeTitle").innerHTML = $("#survey option:selected").html();
      $('#availableLanguages').empty();
      app.Trees.getTree(treeSelected, app.trees);
      var langs= app.Trees.getTreeLanguages(treeSelected, app.trees);
      var treeLangs= new app.treeLanguages();
      app.Trees.getTree(treeSelected, app.trees);
      var languages = app.Trees.getTreeLanguages(treeSelected, app.trees);
      $('#availableLanguages').empty();
      var treeLanguagesView = new app.treeLanguages();
      var availableLanguages= new app.availableLanguages();
      treeLanguageArr = new Array();
      for(var i=0; i<languages.length; i++){
        var mod={language: languages[i]};
        treeLanguageArr[i] = mod;
        $('#availableLanguages').append( availableLanguages.render(mod).el.childNodes );
      }
         // Show the trees in the first language in the list
      if ( document.getElementById("availableLanguages").options.length > 0) {
			document.getElementById("availableLanguages").options[0].selected = "selected";
			this.showTreeInfo(document.getElementById("availableLanguages").options[0].value);
		}
    },
    showTreeInfo: function(languageSelected) {
       $('#treeInformation').empty();
      var treeInfoModel= app.Trees.getTreeInfo(treeSelected, app.trees, languageSelected);
      var treeInfoView= new app.TreeInfo();
      $('#treeInformation').append( treeInfoView.render(treeInfoModel).el.childNodes );
    },

    showTreeInformation: function(){
      var languageSelected = $('select[name=availableLanguages]').val();
      this.showTreeInfo(languageSelected);
    },
	showListTree:function(results){
		$('#survey').empty();
		app.trees=results;
		for(var i=0; i<results.length; i++){
			var object = $.parseJSON(JSON.stringify(results[i]));  		    
			for(var j=0; j<object.name.length; j++){
				var treeNames = $.parseJSON(JSON.stringify(object.name[j]));
				if(Object.keys(treeNames)[0]==="english"){
					var treeModel={name: treeNames.english, objectId:object.objectId};
					var treeview = new app.TreeListView();
					$('#survey').append( treeview.render(treeModel).el.childNodes );
             	}
          	}
      	}
		// Make the first tree in the list selected
		if ( document.getElementById("survey").options.length > 0) {
			document.getElementById("survey").options[0].selected = "selected";
			treeSelected = $('select[name=survey]').val();
			this.showTreeAvailableLanguages();
		}
    },
  
    

////NODES METHODS
// Adds the available languages of the trees in the element #nodeLanguageOption
  showNodesAvailableLanguages: function() {
  		$('#availableLanguagesNodes').empty();
  		var languagesView = new app.AvailableLanguagesNodes();
  		for (var i=0; i<treeLanguageArr.length; i++) {
  			$('#availableLanguagesNodes').append( languagesView.render(treeLanguageArr[i]).el.childNodes );
        // The currently selected languages should be visually selected
  			if (treeLanguageArr[i].language == nodeSelectedLanguage)
  				document.getElementById("availableLanguagesNodes").options[i].selected = "selected";
  		} 		
  	},
	fetchNodes: function() {
		lastTreeSelected = treeSelected;
	    if (treeSelected != null) {
		    app.Nodes.getNodes(treeSelected);
	   }
	},
	fetchEdges: function() {
		if (nodeSelected != null && nodeSelected != undefined) {
			app.Edges.getEdges(nodeSelected);	
		}
	},
	nodesFetched: function() {
		console.log("nodesFetched");
	   	this.showNodesAvailableLanguages();
		$('#nodeList').empty();
		// Node names should always be in the default language - english
	   	var nodes = app.Nodes.getNodeQuestions(defaultLanguage);  
		var nodeListView = new app.NodeListView();
		for (var i=0; i<nodes.length; i++) {
			$('#nodeList').append( nodeListView.render(nodes[i]).el.childNodes ); 
		}
		if (nodes.length > 0) {
			document.getElementById("nodeList").options[0].selected = "selected";
			this.updateNodeInfo(nodes[0]);
		}
		else {
			// Send an object with empty strings so that the input elements will be empty
			this.updateNodeInfo({question: "", info: "", name: ""});
		}
		this.updateEdgeNextNode(nodes);
  	},
  edgesFetched: function() {
	  	$('#nodeEdges').empty();
	  	var edges = app.Edges.getEdgeQuestions(nodeSelectedLanguage); 
	  	var nodeEdgesView = new app.NodeEdgesView();
	  	for (var i=0; i<edges.length; i++) {
			$('#nodeEdges').append( nodeEdgesView.render(edges[i]).el.childNodes ); 	
	  	}
  	},
  nodeSelected: function() {
	  	nodeSelected = $("#nodeList").val();
	  	var node = app.Nodes.getNode(nodeSelected);
	  	this.updateNodeInfo(node);
	},
	updateNodeInfo: function(node) {
		document.getElementById("nodeQuestion").innerHTML = node.question;
		document.getElementById("nodeInfo").innerHTML = node.info;
		document.getElementById("nodeName").value = node.name;
		this.fetchEdges();
	},
	
	updateNodeLanguage: function() {
		nodeSelectedLanguage = $('select[name=availableLanguagesNodes]').val();
		app.Nodes.getNodeQuestions(nodeSelectedLanguage);  
		this.nodeSelected();
	},
	
  updateNode: function() {
    var language=$('select[name=availableLanguagesNodes]').val();    
    var name={};
    var addInfo={};
    var question={};
    name[language]=document.getElementById('nodeName').value;
    addInfo[language]= document.getElementById('nodeInfo').value;
    question[language]=document.getElementById('nodeQuestion').value;
    app.Node.updateNodeName(nodeSelected, name);
    app.Node.updateNodeAdditionalInfo(nodeSelected, addInfo );
    app.Node.updateNodeQuestion(nodeSelected, question);
	},
  deleteNode: function() {
      app.Node.deleteNode(nodeSelected);
  },
  addNode: function(){
      app.Node.createNode(treeSelected);
      this.fetchNodes();

  },
  

///EDGE METHODS
  addEdge: function() {
    app.Edge.createEdge(nodeSelected);
  },
  deleteEdge: function() {
    var edgeSelected = $("#nodeEdges").val();
    app.Edge.deleteEdge(edgeSelected);
  },
  edgeSelected: function() {
      var edgeSelected = $("#nodeEdges").val();
      var edge = app.Edges.getEdge(edgeSelected);
      console.log(edgeSelected);
      console.log( JSON.stringify(edge) );
      this.updateEdgeInfo(edge);
  },
  updateEdgeNextNode: function(nodes) {
    $('#edgeNextNode').empty();
    var edgeNextNodeView = new app.EdgeNextNodeView();
    console.log("eccoci - updateEdgeNextNode");
        for (var i=0; i<nodes.length; i++) {
      $('#edgeNextNode').append( edgeNextNodeView.render(nodes[i]).el.childNodes ); 
    }
    $('#edgeNextNode').append( edgeNextNodeView.render({id: "1", question:"Generate Summary", info: "", name:""}).el.childNodes);
    },
  updateEdgeInfo: function(edge) {
    document.getElementById("edgeText").value = edge.text;
    //document.getElementById("edgeValye").innerHTML = edge.value;
    document.getElementById("edgeResponse").value = edge.response;
    var element = document.getElementById('edgeValue');
    element.value = edge.value;
    var nextNode = document.getElementById('edgeNextNode');
    nextNode.value=edge.nextNode;
   },
  updateEdge: function() {
     var edgeSelected = $("#nodeEdges").val();
     var language=$('select[name=availableLanguagesNodes]').val();
    
    var text={};
    var response={};
   
    text[language]=document.getElementById('edgeText').value;
    response[language]= document.getElementById('edgeResponse').value;
    var value= document.getElementById('edgeValue').value;
    var nextNode=document.getElementById('edgeNextNode').value;

    app.Edge.updateEdgeText(edgeSelected, text);
    app.Edge.updateEdgeResponse(edgeSelected, response );
    app.Edge.updateEdgeValue(edgeSelected, value);
    if(nextNode!=1){
    app.Edge.updateEdgeNextNode(edgeSelected, nextNode);}
    else app.Edge.updateEdgeNextNode(edgeSelected, undefined);

  },

  	
   
    
  });