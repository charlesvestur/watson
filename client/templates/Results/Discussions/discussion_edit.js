/*AutoForm.hooks({        
        discussionEdit: {
            before: {
                update: function(doc) {
                    doc.lastedited = new Date();
                    return doc;
                }
            }
        }            
    });*/

/*Template.discussionEdit.events({
	'update form': function(e){
		e.preventDefault();
		var currentDiscussionId = this._id;

		Discussions.update({_id: this._id}, {$push: {editions: new Date()}});
	}
});*/


/*Template.discussionEdit.events({ 
  'submit form': function(e) {
    e.preventDefault();*/

/*    Meteor.call('discussionUpdate', this, function(error, result) {
    // affiche l'erreur à l'utilisateur et s'interrompt
    if (error)
        return alert(error.reason);
    Router.go('mainResults');
    });*/

/*    Discussions.update({_id: this._id}, {$set: {lastedited: new Date()}}, function(error) {
      if (error) {
        alert(error.reason);
      } else {
        Router.go('discussionPage', {_id: currentdiscussionId});
      }
    });
	}
});*/

/*});*/

    /*Discussions.update(currentDiscussionId, {$set: discussionProperties}, function(error) {
      if (error) {
        // affiche l'erreur à l'utilisateur
        alert(error.reason);
      } else {
        Router.go('discussionPage', {_id: currentdiscussionId});
      }
    });
  }


/*  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this post?")) {
      var currentPostId = this._id;
      Posts.remove(currentPostId);
      Router.go('postsList');
    }
  }
});*/