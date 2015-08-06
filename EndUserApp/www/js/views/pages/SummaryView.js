define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var MyModel = require("models/MyModel");
  var Utils = require("utils");
  var EdgeModel= require("models/EdgeModel");
  var NodeModel= require("models/NodeModel");

  var SummaryItem= require("views/pages/SummaryItem");

  var SummaryView = Utils.Page.extend({

    constructorName: "SurveyView",
    title: "Summary",
    trees: "",

    initialize: function(attrs) {
       this.options = attrs;
      // load the precompiled template
      this.template = Utils.templates.summary;
      this.on("inTheDOM", this.appendItems,this);
      //document.addEventListener("deviceready", onDeviceReady, false);
      
      savePDF($('#mySummaryView').text(),this.options.nameTree);

    },


    id: "SummaryView",

     events: {
      "touchend #sendPdf":"sendPdf",
      "touchend #goBack":"goBackToChoice"
    },
    goBackToChoice:function(){
       Backbone.history.navigate("chooseSurveys", {
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

        attachments: cordova.file.externalDataDirectory+this.options.nameTree.replace(" ","")+".pdf"
      });
 
  
    },


    render: function() {


      $(this.el).html(this.template(this.responses));
      return this;
    },

/*
    Function to get the percentage of positive, negative and neitral answers
    This is done by iterating the collection of summary items and checking the value
  */
    getPercentage: function(language, nodes, answers){
      this.language=language;
      this.nodes=nodes;
      this.answers=answers;
      var positive=0;
      var neutral=0;
      var negative=0;
      this.nm=new NodeModel();
      this.em=new EdgeModel();
      for (var i = 0; i < this.model.length; i++) {
        var current= this.model.at(i);
        var question= this.nm.getNode2(current.question, nodes, language);
        var answer= this.em.getEdge(current.answer, answers, language);
        if(answer.value==="Positive"){positive++;}
        if(answer.value==="Negative"){negative++;}
        if(answer.value==="Neutral"){neutral++;}
      }
      positive=Math.floor(positive/this.model.length * 100) / 100;  
      neutral=Math.floor(neutral/this.model.length* 100) / 100;
      negative=Math.floor(negative/this.model.length* 100) / 100;
      this.responses={positive: positive, negative: negative, neutral: neutral};
    },

    /*
      Function that creates a dynamically populated list of summary items
      Each summaryItem view corresponds to one summary item 
      The corresponding answer and question in the seleceted language are passed to each of the summary items
    */
    appendItems: function(){
    
      var listsummary= new Array();
      
      for (var i = 0; i < this.model.length; i++) {
        var current= this.model.at(i);
        var question= this.nm.getNode2(current.question, this.nodes, this.language);
        var answer= this.em.getEdge(current.answer, this.answers, this.language);
        listsummary[i]=new SummaryItem().render(question, answer).el;      
      }
        $('#listSummary').append(listsummary);

    }
  });

  return SummaryView;

});