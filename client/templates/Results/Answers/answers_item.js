Template.answersItem.events({
  'click .upvote': function(e) {
  	var upvoteId = this._id;
    if ($('#' + upvoteId).hasClass('disabled-customized')){
    	$('#' + upvoteId).removeClass('disabled-customized');
    	$('#' + upvoteId).addClass('btn-primary upvotable');
    	Answers.update(
    		{_id: this._id}, 
    		{
    			$pull: {upvoters: Meteor.userId()},
    			$inc: {votes: -1}
    		},
    		{}
    	);
    }
    else {
    	Meteor.call('upvote', this._id);
    } 
  },

  'click #link-see-comments': function(e) {
  	if ($('#comments-container').hasClass('display-none'))
  		{
  		$('#comments-container').removeClass('display-none');
		}  	
  	else {
  		$('#comments-container').addClass('display-none');
  		}
  	}

});

Template.answersItem.helpers({
	votes: function() {
		return Answers.findOne(this._id).votes;
	},

	upvotedClass: function() {
    var userId = Meteor.userId();
    if (userId && !_.include(this.upvoters, userId)) {
      return 'btn-primary upvotable';
    } else {
      return 'disabled-customized';
    }
  }
});

Template.answersItem.helpers({
  comments: function() {
    return Comments.find({answerId: this._id}, {sort: {submitted: -1}});
  }
});