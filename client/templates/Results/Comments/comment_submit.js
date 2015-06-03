Template.commentSubmit.onCreated(function() {
  Session.set('commentSubmitErrors', {});
});

Template.commentSubmit.helpers({
  errorMessage: function(field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.commentSubmit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $commentbody = $(e.target).find('[name=commentbody]');
    var comment = {
      commentbody: $commentbody.val(),
      answerId: template.data._id,
      discussionId: Answers.findOne(template.data._id).discussionId
    };

    var errors = {};
    if (! comment.commentbody) {
      errors.commentbody = "Please write some content";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        /*$commentbody.val('');*/ //Responsible of the "Commentbody is required" error
      }
    });
  }
});

	