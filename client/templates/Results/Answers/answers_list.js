Template.answersList.helpers({
  answers: function() {        
 	return Answers.find({
 		discussionId: Template.currentData()._id}, 
 		{sort: {submitted: -1}});
  }
});