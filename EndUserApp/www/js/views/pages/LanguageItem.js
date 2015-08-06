define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var LanguageItem = Utils.Page.extend({

    constructorName: "LanguageItem",

    trees: "",
    selTree:"",

    /*
    This.model= language string 
    */
    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.languageitem;
      //model
      this.lang={};
      this.lang["languages"]=this.model;
    },

    id: "myview",

    events: {
      "touchend" : "goToFirstQuestion"
    },

    render: function() {
      $(this.el).html(this.template(this.lang));
      return this;
    },
    goToFirstQuestion: function(){
        Backbone.history.navigate("rootNode/" +this.lang["languages"], {trigger: true});
    }
  });

  return LanguageItem;

});