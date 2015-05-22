Template.discussionSubmit.events({
    'submit form': function(e) {
	    e.preventDefault();

	    var discussion = {
	        title: $(e.target).find('[name=title]').val(),
	        question: $(e.target).find('[name=question]').val()
	    };

		Meteor.call('discussionInsert', discussion, function(error, result) {
		    // affiche l'erreur à l'utilisateur et s'interrompt
		    if (error)
		        return alert(error.reason);
		    Router.go('mainResults', {_id: result._id});
		});
	}
});

/* We can also add the various implied attributes ("author", "submitted", ...) in the database with the following hook:

AutoForm.hooks({        
        discussionSubmit: {
            before: {
                insert: function(doc) {
                    doc.submitted = new Date;
                    doc.upvote = 0;
                    this.result(doc);
                }
            }
        }            
    });*/


/*SimpleSchema.debug = true;

AutoForm.addHooks(null, {
    onError: function (name, error, template) {
      console.log(name + " error:", error);
    }
  });*/