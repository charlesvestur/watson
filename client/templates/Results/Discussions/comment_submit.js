Template.commentSubmit.events({
//To insert implied attributes ("author", "submitted", ...)  
    'submit form': function(e) {
	    e.preventDefault();
	    //->First, we create the object 'answer' when the users submits the form with the attributes he filled in
	    var comment = {
	        commentbody: $(e.target).find('[name=commentbody]').val(),
	        answerId: Template.currentData()._id
	    };


    //Then, we apply our discussionInsert function to the object 'answer'
            Meteor.call('commentInsert', comment, function(error, result) {
    	    // affiche l'erreur à l'utilisateur et s'interrompt
    	    if (error)
    	        return alert(error.reason);
    	    Router.go('discussionPage');
		});
	}
});
