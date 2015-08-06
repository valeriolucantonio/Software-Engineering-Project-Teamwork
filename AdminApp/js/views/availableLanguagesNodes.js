  // js/views/app.js

  var app = app || {};

  // View for the list of trees in the database
  app.AvailableLanguagesNodes = Backbone.View.extend({
    // Templete for an option-element
    Template: _.template( $('#nodeLanguageOption').html() ),
    // Adds a new option-element to the select-element
   render: function(model) {
      this.$el.html( this.Template(model) );
      return this;
    }
  });