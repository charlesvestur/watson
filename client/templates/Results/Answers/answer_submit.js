Template.answerSubmit.events({
//To insert implied attributes ("author", "submitted", ...)  
    'submit form': function(e) {
	    e.preventDefault();
    //-> First, we create the object 'answer' when the users submits the form with the attributes he filled in
	    var answer = {
	        answer: $(e.target).find('[name=answer]').val(),
	        discussionId: Session.get('currentDiscussionId')
	    };


    //Then, we apply our discussionInsert function to the object 'answer'
            Meteor.call('answerInsert', answer, function(error, result) {
    	    // affiche l'erreur à l'utilisateur et s'interrompt
    	    if (error)
    	        return alert(error.reason);
    	    Router.go('mainResults', {_id: result._id});
		});
	}
});
