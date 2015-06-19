Template.registerHelper('numberOfAnswers', function() {        
    return Answers.find({
        discussionId: this._id}).count();
  }
);

Template.questionsItem.helpers({
/*    numberOfVotes: function() {        
        var sumvotes = 0;
        Answers.find({discussionId: this._id}).forEach(function(answer){
            sumvotes = sumvotes + answer.votesCount;
        });
        return sumvotes;
    },*/

    starstyle: function() {
        if (Meteor.users.findOne({_id: Meteor.userId()}).discussionsFollowed.indexOf(this._id) > -1){
            return 'color-yellow glyphicon-star';
        }
        else {
            return '';
        }
    },
    //So that number of answers is correct even when an answer is deleted from Mongol
    /*answersCountHelper: function() {
        return Answers.find({discussionId: this._id}).count();
    }*/
});

Template.questionsItem.events({
    'click .star': function(e) {
        var starId = this._id;
        var doc = Meteor.users.findOne({_id: Meteor.userId()});
        if ($('#' + starId).hasClass("color-yellow")){

            Meteor.users.update({_id: doc._id}, {$pull: {discussionsFollowed: this._id}});
        }
        else {
            if (doc.discussionsFollowed){
                Meteor.users.update({_id: doc._id}, {$push: {discussionsFollowed: this._id}});
            }
            else {
                Meteor.users.update({_id: doc._id}, {$set: {discussionsFollowed: [this._id]}});
            }
            e.stopPropagation();
        }
    },

    'click #delete-discussion': function(e) {
        if (confirm("Supprimer cette question ?")) {
          var currentDiscussionId = this._id;
          Discussions.remove(currentDiscussionId);
          Router.go('mainResults');
        }
    }
}); 

