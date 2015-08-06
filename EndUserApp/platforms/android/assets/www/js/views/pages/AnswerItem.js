define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  /*
      This view is loaded as a subview of the QuestionView.
      Its purpose is to dinamically populate the list of answers, 
      since the number or answers is arbitrary. 
      One AnswerItem corresponds to one answer
  */

  var AnswersItem = Utils.Page.extend({

    constructorName: "AnswersItem",


    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.itemanswers;
      //model
   

    },

    events: {
      // event attached to each answer
      "touchend":"goToNextQuestion"
    },

    /*
      The model that is passed to the template can be found in QuestionView when the items are initialized
      The model has the following keys: objectId, belongsTo, value, nextNode, response retrieved in the chosen language
    */
    render: function() {
      $(this.el).html(this.template(this.model));
      return this;
    },

    goToNextQuestion: function(){
      Backbone.history.navigate("goToNextQuestion/"+this.model.objectId, {
        trigger: true
      });

    },

    
  });

  return AnswersItem;

});