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

  'click #link-comment': function(e) {
  	if ($('#comment').hasClass('display-none'))
  		{
  		$('#comment').removeClass('display-none');
		}  	
  	else {
  		$('#comment').addClass('display-none');
  		}
  	},

  'click #link-see-comments': function(e) {
  	if ($('#see-comments').hasClass('display-none'))
  		{
  		$('#see-comments').removeClass('display-none');
		}  	
  	else {
  		$('#see-comments').addClass('display-none');
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
    return Comments.find({answerId: this._id});
  }
});