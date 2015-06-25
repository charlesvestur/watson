Template.myDiscussionsFollowed.helpers({
	discussionsFollowed: function(){
		if(Meteor.user().discussionsFollowed)
			return Discussions.find({_id: { $in : Meteor.user().discussionsFollowed}});
	}
});