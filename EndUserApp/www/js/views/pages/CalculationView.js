define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var CalculationItem= require("views/pages/CalculationItem");

  var CalculationView = Utils.Page.extend({

    constructorName: "CalculationView",
    title: "Calculation",
    trees: "",

    initialize: function() {
      
      // load the precompiled template
      this.template = Utils.templates.calculationList;
      this.on("inTheDOM", this.appendItems,this);

     // console.log(this.model[0]);
    },


    id: "CalculationView",

    className: "i-g page",

     events: {
      "touchend #goBack":"goBackToChoice"
    },
    goBackToChoice:function(){
       Backbone.history.navigate("chooseSurveys", {
        trigger: true
      });
    },


    render: function() {


      $(this.el).html(this.template());
      return this;
    },

    /*
      Function that creates a dynamically populated list of calculation items
      Each claculationItem view corresponds to one calculation item 
      The corresponding name and calcualtion info in the selected language are passed to each of the calculation items
    */
    appendItems: function(){
      console.log("append items");
      var listCalcs= new Array();
      
      console.log(JSON.stringify(this.model));
      for (var i = 0; i < this.model.length; i++) {
        listCalcs[i]=new CalculationItem().render(this.model[i]).el; 
        console.log(listCalcs[i]);     
      }
        $('#listCalculations').append(listCalcs);

    }
  });

  return CalculationView;

});