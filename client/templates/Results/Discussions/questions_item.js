Template.registerHelper('currentItemTemplateId', function() {
    return this._id;
    }    
);

Template.registerHelper('numberOfAnswers', function() {        
    return Answers.find({
        discussionId: this._id}).count();
  }
);

Template.registerHelper('displayIfOwnsItem', function() {
    if (this.userId == Meteor.userId()){
        return 'initial';
    }
    else {
        return 'none';
    }
});

Template.questionsItem.helpers({
    numberOfVotes: function() {        
        var sumvotes = 0;
        Answers.find({discussionId: this._id}).forEach(function(answer){
            sumvotes = sumvotes + answer.votes;
        });
        return sumvotes;
    },

    starstyle: function() {
        if (Discussions.findOne(this._id).followedby.indexOf(Meteor.userId()) > -1){
            return 'color-yellow glyphicon-star';
        }
        else {
            return '';
        }
    }
});

Template.questionsItem.events({
    'click .star': function(e) {
        var starId = this._id;  
        if ($('#' + starId).hasClass("color-yellow")){
            Discussions.update({_id: this._id}, {$pull: {followedby: Meteor.userId()}});
        }
        else {
            Discussions.update({_id: this._id}, {$push: {followedby: Meteor.userId()}});
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

