define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");


  var resultCalculationView = Utils.Page.extend({

    constructorName: "resultCalculationView",
    
    /*
      this.model is the router object 
      current question is the id of the current question
      getNode2 is a function that retrieves a node(question) in the chosen language only as a simple json object
      getAnswersFromNode retrives the answers for the current question
    */
    initialize: function() {
      // load the precompiled template

    
     this.template = Utils.templates.resultCalculation;
    

      savePDF($('#myCalcRes').text(),this.model.calcName);
    },

    id: "resultcalculationview",
    className: "i-g page",
    events: {
 //     "touchend #sendPdf":"sendPdf",
      "touchend #goBack":"goBackToChoice"
    },
    goBackToChoice:function(){
       Backbone.history.navigate("rootNode/"+this.model.language, {
        trigger: true
      });
    },

    sendPdf:function(){
    cordova.plugins.email.isAvailable(
    function (isAvailable) {
         //alert("isav:"+isAvailable);
    }
    );

   // alert("EMAIL:"+cordova.file.externalDataDirectory);

      cordova.plugins.email.open({

        attachments: cordova.file.externalDataDirectory+this.model.calcName.replace(" ","")+".pdf"
      });
 
  
    },
    
    render: function() {
      $(this.el).html(this.template(this.model));      
      return this;
    },

   
  
  });

  return resultCalculationView;

});