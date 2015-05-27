Template.answersList.helpers({
  answers: function() {        
 	return Answers.find({
 		discussionId: Session.get('currentDiscussionId')
 	}, {sort: {submitted: -1}});
  }
});