define(function(require) {

  var $ = require("jquery");
  var _ = require("underscore");
  var Backbone = require("backbone");
  var Utils = require("utils");

  var StructureView = Backbone.View.extend({

    constructorName: "StructureView",

    id: "main",

    initialize: function(options) {
      // load the precompiled template
      this.template = Utils.templates.structure;
      this.on("inTheDOM", this.rendered);
      // bind the back event to the goBack function
      //document.getElementById("back").addEventListener("back", this.goBack(), false);
    },

    render: function() {
      // load the template
      this.el.innerHTML = this.template({});
      this.contentElement = this.$el.find('#content')[0];
      this.goToMenu();
      return this;

    },

    rendered: function(e) {
      // if the app is running on an iOS 7 device, then we add the 20px margin for the iOS 7 status bar
      if(device.platform == "iOS" && device.version.startsWith("7.")) {
        document.body.style.marginTop = "20px";
        document.body.style.height = "calc(100% - 20px)";
        document.getElementsByTagName("header")[0].style.marginTop = "20px";
      }
    },

    changeTitle: function(title){
      console.log(title);
       var tit={title:title};
       this.el.innerHTML = this.template(tit);
       this.contentElement = this.$el.find('#content')[0];

    },

    // generic go-back function
    goBack: function() {
      //window.history.back();
    },

    goToMenu: function(){
      Backbone.history.navigate("menu", {
        trigger: true
      });
    },

  
  });

  return StructureView;

});