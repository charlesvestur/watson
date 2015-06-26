Template.answerSubmit.events({
//To insert implied attributes ("author", "submitted", ...)  
    'submit form': function(e) {
	    e.preventDefault();
	    //->First, we create the object 'answer' when the users submits the form with the attributes he filled in
	    var $answertext = $(e.target).find('[name=answertext]');
	    var answer = {
	        answertext: $answertext.val(),
	        discussionId: Template.currentData()._id
	    };

	    var errors = {};
	    if (! answer.answertext) {
	      errors.answertext = "Please write some content";
	      return Session.set('answerSubmitErrors', errors);
	    }

    //Then, we apply our discussionInsert function to the object 'answer'
        Meteor.call('answerInsert', answer, function(error, answerId) {
	      if (error){
	        throwError(error.reason);
	      } else {
	        /*$answertext.val('');*/ //Responsible of the "Answertext is required" error
	      }
		});
	$('#answer-submit-form').removeClass('display-none');
//	Router.go('discussionPage', {_id: Template.currentData()._id});
	}
});
