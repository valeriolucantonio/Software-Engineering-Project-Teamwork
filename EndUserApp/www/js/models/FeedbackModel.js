define(function(require) {

	var Backbone = require("backbone");
    var Parse= require("parse");

	var feedbackModel = Parse.Object.extend("feedback",{
		constructorName: "feedbackModel",

    /*
    Function performing validation of data, displaying error messages and saving the feedback if everything is okay
    */
    sendFeedback: function(name,email,text){
      if(name=="" || email== "" || text==""){
        $("#status").val("");
        $("#status").append("All fields are required");
        return false;
      }
      var feedbackMod=Parse.Object.extend("feedback");
      var feedbackModel=new feedbackMod();
      feedbackModel.set("name",name);
      feedbackModel.set("email",email);
      feedbackModel.set("text",text);
      feedbackModel.save({
        
        success: function(node){
         console.log("success");
         $("#status").val("");
         $("#status").append("You have sent the message successfully.");
         $("#nameSurname").val("");
         $("#emailAddress").val("");
         $("#text").val("");
         return true;
        },
        error:function(){
          $("#status").val("");
         $("#status").append("You haven't sent the message successfully. Make sure you have internet connection");
         return false;
        }
      });
    }

	});

	return feedbackModel;
});