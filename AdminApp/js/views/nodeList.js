  // js/views/app.js

  var app = app || {};

  // View for the list of nodes for the currently selected tree 
  app.NodeListView = Backbone.View.extend({
    // Templete for an option-element
    Template: _.template( $('#nodeListOption').html() ),
    // Adds a new option-element to the select-element
   render: function(model) {
      this.$el.html( this.Template(model) );
      return this;
    }
  });