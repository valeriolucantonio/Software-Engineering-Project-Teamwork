define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var TreeModel= require("models/TreeModel");
  var SurveyItem= require("views/pages/SurveyItem");

  var SurveyView = Utils.Page.extend({

    constructorName: "SurveyView",

    trees: "",

    initialize: function(tree) {
      // load the precompiled template
      this.template = Utils.templates.listsurvey;
      this.on("inTheDOM", this.appendItems,this);

    },

    id: "SurveyList",
    title: "Survey List",

     events: {
      "touchend #goBack": "goBackToMenu"
    },
    goBackToMenu: function(){
      Backbone.history.navigate("menu", {
        trigger: true
      });
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    },
    

    /*
    this.model : collection of tree models
    */
    appendItems: function(){
      var listsurveys= new Array();
      for (var i = 0; i < this.model.length; i++) {
            listsurveys[i]=new SurveyItem({
              model: this.model[i]
              }).render().el;
            }
        $('#listSurveys').append(listsurveys);
    }
  });

  return SurveyView;

});