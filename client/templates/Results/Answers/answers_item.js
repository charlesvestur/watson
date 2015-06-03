Template.answersItem.events({
  'click .upvote': function(e) {
  	var upvoteId = this._id;
    if ($('#' + upvoteId + '1').hasClass('disabled-customized')){
    	$('#' + upvoteId + '1').removeClass('disabled-customized');
    	$('#' + upvoteId + '1').addClass('btn-primary upvotable');
      Meteor.call('cancelupvote', this._id);
    }
    else {
    	Meteor.call('upvote', this._id);
    } 
  },

  'click .link-see-comments': function(e) {
    var containerId = this._id;
  	if ($('#' + containerId + '2').hasClass('display-none'))
  		{
  		$('#' + containerId + '2').removeClass('display-none');
		}  	
  	else {
  		$('#' + containerId + '2').addClass('display-none');
  		}
  	},

  'click #delete-answer': function(e) {
      if (confirm("Supprimer cette réponse ?")) {
        var currentAnswerId = this._id;
        Answers.remove(currentAnswerId);
        Discussions.update(this.discussionId, {$inc: {answersCount: -1}});
        Router.go('mainResults');
      }
    }
});

Template.answersItem.helpers({
	upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled-customized';
    }
  },

  //So that number of comments is correct even when a comment is deleted from Mongol
  /*commentsCountHelper: function() {
    return Comments.find({answerId: this._id}).count();
  }*/
});

Template.answersItem.helpers({
  comments: function() {
    return Comments.find({answerId: this._id}, {sort: {submitted: -1}});
  }
});
