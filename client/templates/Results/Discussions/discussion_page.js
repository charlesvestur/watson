Template.discussionPage.events({
    'click .star': function(e) {
        var starId = this._id;  
        if (($('#' + starId).hasClass("glyphicon"))&&($('#' + starId).hasClass("glyphicon-star-empty"))&&($('#' + starId).hasClass("color-yellow"))){
            $('#' + starId).removeClass("color-yellow glyphicon glyphicon-star");
            Discussions.update({_id: this._id}, {$pull: {followedby: Meteor.userId()}});
        }
        else {
           Discussions.update({_id: this._id}, {$push: {followedby: Meteor.userId()}});
        }
    }
}); 