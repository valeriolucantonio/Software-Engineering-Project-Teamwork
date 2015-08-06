define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var TreeModel= require("models/TreeModel");
  var SurveyItem = Utils.Page.extend({

    constructorName: "SurveyItem",

    trees: "",
    selTree:"",

    initialize: function() {
      this.template = Utils.templates.itemsurvey;
      this.getModel();
    },

    id: "SurveyItem",

    events: {
      "touchend" : "goToSurvey"
    },

    render: function() {
      $(this.el).html(this.template(this.selTree));
      return this;
    },
    
    /*
    this.model is a tree object , engish is default for the titles for now 
    */
    getModel:function(){
      var object = $.parseJSON(JSON.stringify(this.model));
      for(var j=0; j<object.name.length; j++){
          var tree=$.parseJSON(JSON.stringify(object.name[j]));
          if(Object.keys(tree)[0]==="english"){
            var root= $.parseJSON(JSON.stringify(object.rootNode));
            tree.rootNode=root.objectId;
            tree.objectId=object.objectId;
            this.selTree=tree;
          }
      }
    },
    /*
      Go to the language choice 
    */
    goToSurvey: function(){
        Backbone.history.navigate("language/" +this.selTree.objectId, {trigger: true});
    }
  });

  return SurveyItem;

});