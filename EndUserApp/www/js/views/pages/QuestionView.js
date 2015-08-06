define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var AnswerItem= require("views/pages/AnswerItem");
  var EdgeModel = require("models/EdgeModel");
   var NodeModel = require("models/NodeModel");


  var QuestionView = Utils.Page.extend({

    constructorName: "QuestionView",
    
    /*
      this.model is the router object 
      current question is the id of the current question
      getNode2 is a function that retrieves a node(question) in the chosen language only as a simple json object
      getAnswersFromNode retrives the answers for the current question
    */
    initialize: function() {
      // load the precompiled template
     this.question=this.model.nodeModel.getNode2(this.model.currentQuestion, this.model.nodes, this.model.language);
     this.answers=this.model.edgeCollection.getAnswersFromNode(this.model.currentQuestion, this.model.edges);
     this.language=this.model.language;
     this.template = Utils.templates.questionSurvey;
     this.on("inTheDOM", this.appendListAnswers,this);
      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "questionview",
    
    /*
      Events for the previous and next button
    */
    events: {
     "touchend #prevBtn": "goToPrevQuestion",
     "touchend #nextBtn":"goToNextQuestion"

    },

    goToPrevQuestion: function (){
     Backbone.history.navigate("prevquestion", {
        trigger: true
      });
    },
    goToNextQuestion:function (){
       Backbone.history.navigate("nextquestion", {
        trigger: true
      });
    },
    render: function() {
      $(this.el).html(this.template(this.question));      
      return this;
    },

    /*
    This function creates the subviews needed to generate the list of answers dynamically.
    Creates an Answer Item for each answer and passes it an appropriate model.
    The model has the following keys: objectId, belongsTo, value, nextNode, response retrieved in the chosen language.
    Then we get the result when the views are rendered and the template is populated and put them in a list.
    The list is appended to the questionView template. 
    */
    appendListAnswers: function(){
      var listAnswers= new Array();
      for (var i = 0; i < this.answers.length; i++) {
        var ans= $.parseJSON(JSON.stringify(this.answers[i]));
        var edgeModel=new EdgeModel();
        var currentEdge=edgeModel.getEdge(ans.objectId, this.answers, this.language);

            listAnswers[i]=new AnswerItem({
              model: currentEdge
              }).render().el;
            }
      //  $('#spinner').data('spinner').stop();
        $('#listAnswers').append(listAnswers);
    

    }
    
  });

  return QuestionView;

});