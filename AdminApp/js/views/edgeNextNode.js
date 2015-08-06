var app = app || {};

// View for the list of nodes in the database
app.EdgeNextNodeView = Backbone.View.extend({
	// Templete for an option-element
	Template: _.template( $('#edgeNextNodeOption').html() ),
	// Adds a new option-element to the select-element
	render: function(model) {
//		console.log(model);
		this.$el.html( this.Template(model) );
		return this;
	}
});