define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var SummaryItem = Utils.Page.extend({

    constructorName: "SummaryItem",

    trees: "",
    selTree:"",

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.summaryitem;
   
    },

    id: "SummaryItem",

    events: {
    },

    render: function(node, edge) {
      var model={question: node.question, answer: edge.text, response: edge.response };
      $(this.el).html(this.template(model));
      return this;
    },
    

  });

  return SummaryItem;

});