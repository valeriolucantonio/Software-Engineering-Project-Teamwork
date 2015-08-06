define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var CalculationItem = Utils.Page.extend({

    constructorName: "CalculationItem",

    initialize: function() {
      // load the precompiled template
      this.template = Utils.templates.calculationItem;
   
    },

    id: "CalculationItem",

    events: {
       "touchend":"goToRootInputNode"
    },

    render: function(calc) {
      console.log(calc);
      this.model=calc;
      $(this.el).html(this.template(calc));
      return this;
    },
    goToRootInputNode:function(){
      Backbone.history.navigate("rootInputNode/"+this.model.objectId, {
        trigger: true
      });
    }
    

  });

  return CalculationItem;

});