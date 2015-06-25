Template.myDiscussionsFollowedItem.helpers({
	date: function(){
		return moment(this.submitted).format('LL');
	},
});

Template.myDiscussionsFollowedItem.events({
	'click .glyphicon-remove-sign': function(e){
		Meteor.users.update({_id: Meteor.userId()}, {$pull: {discussionsFollowed: this._id}});
	}
});
