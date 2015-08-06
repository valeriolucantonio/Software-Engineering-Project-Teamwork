define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");
  var LanguageItem= require("views/pages/LanguageItem");

  var LanguageView = Utils.Page.extend({

    constructorName: "LanguageView",
    

    initialize: function() {
      this.title=this.model.name[0].english;
      // load the precompiled template
      this.template = Utils.templates.chooselanguage;
            this.on("inTheDOM", this.appendLanguageAnswers,this);

      // by convention, all the inner views of a view must be stored in this.subViews
    },

    id: "questionview",
    title: "choose Language",
    

    events: {

    },



    render: function() {

      $(this.el).html( this.template($.parseJSON(JSON.stringify(this.model.name[0]))));
      return this;
    },

    /*
    this model=selected tree object, has field languages of type array 
    For each language a new LanguageItem view is created , creating a dynamically popupated list of languages
    */
    appendLanguageAnswers: function(){

      var listlanguages= new Array();
      for (var i = 0; i < this.model.languages.length; i++) {
             listlanguages[i]=new LanguageItem({
              model: this.model.languages[i]
              }).render().el;
            }
      //  $('#spinner').data('spinner').stop();
        $('#listAnswers').append(listlanguages);
    }
    
  });

  return LanguageView;

});