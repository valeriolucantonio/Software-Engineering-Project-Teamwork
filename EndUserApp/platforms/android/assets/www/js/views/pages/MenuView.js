define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var MenuView = Utils.Page.extend({

    constructorName: "MenuView",


    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.menu;
      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "menuview",
    
    title: "Menu",

    events: {
      "touchend #chooseSurveys": "chooseSurveys",
      "touchend #contact": "goToContact",
      "touchend #about": "goToAbout"
    },

    render: function() {
      $(this.el).html(this.template());
      return this;
    },

    goToContact: function(e){
       Backbone.history.navigate("contact", {
        trigger: true
      });
    },
    goToAbout: function(e){
       Backbone.history.navigate("about", {
        trigger: true
      });
    },


    chooseSurveys: function(e) {
      Backbone.history.navigate("chooseSurveys", {
        trigger: true
      });
    }
  });

  return MenuView;

});