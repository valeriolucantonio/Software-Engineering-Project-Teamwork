define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var AboutView = Utils.Page.extend({

    constructorName: "AboutPage",


    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.about;
      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "aboutview",
    title: "About",

    events: {
      //event for the back button
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
    }
  });

  return AboutView;

});