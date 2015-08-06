  // js/views/app.js

  var app = app || {};

  // View for the list of trees in the database
  app.TreeListView = Backbone.View.extend({
    // Templete for an option-element
    Template: _.template( $('#tree_option').html() ),
    // Adds a new option-element to the select-element
   render: function(model) {
      this.$el.html( this.Template(model) );
      return this;
    }
  });