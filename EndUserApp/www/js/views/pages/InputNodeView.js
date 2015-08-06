define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var EdgeModel = require("models/CalculationModel");
   var NodeModel = require("models/InputNodeModel");


  var InputNodeView = Utils.Page.extend({

    constructorName: "InputNodeView",
    
    /*
      this.model is the router object 
      current question is the id of the current question
      getNode2 is a function that retrieves a node(question) in the chosen language only as a simple json object
      getAnswersFromNode retrives the answers for the current question
    */
    initialize: function() {
      // load the precompiled template

    
     this.template = Utils.templates.inputnodeView;
    
    },

    id: "inputnodeview",
    className: "i-g page",
    
    /*
      Events for the previous and next button
    */
    events: {
     "touchend #prevBtn": "goToPrevQuestion",
     "touchend #nextBtn":"goToNextQuestion",

    },

    goToPrevQuestion: function (){
     Backbone.history.navigate("prevnode/", {
        trigger: true
      });
    },
    goToNextQuestion:function (){
      if($('#inputNodeVal').val()!=""){
       Backbone.history.navigate("inputNode/"+this.model.nextInputNode+"/"+$('#inputNodeVal').val()+"/"+this.model.name, {
        trigger: true
      });
     }
    },
    render: function() {
      $(this.el).html(this.template(this.model));      
      return this;
    },

   
    
    
  });

  return InputNodeView;

});