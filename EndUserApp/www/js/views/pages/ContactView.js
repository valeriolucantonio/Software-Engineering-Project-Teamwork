define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var FeedbackModel= require("models/FeedbackModel");
  var ContactView = Utils.Page.extend({

    constructorName: "ContactPage",


    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.contact;
      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "contactview",
    title: "Contact",
    

    events: {
      "touchend #sendFeedback": "send",
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

    send: function (){
      var feedbackMod= new FeedbackModel();
      // save feedback in the database
      feedbackMod.sendFeedback($("#nameSurname").val(),$("#emailAddress").val(),$("#text").val());
      
    }

  });

  return ContactView;

});