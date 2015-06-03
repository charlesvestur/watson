Template.commentsItem.events({
  'click #delete-comment': function(e) {
      if (confirm("Supprimer ce commentaire ?")) {
        var currentCommentId = this._id;
        Comments.remove(currentCommentId);
        Answers.update(this.answerId, {$inc: {commentsCount: -1}});
        //Could also be done with: 
        /*var nbOfComments = Comments.find({answerId: this.answerId}).count();
        Answers.update(this.answerId, {$set: {commentsCount: nbOfComments}});*/
        Router.go('discussionPage');
      }
    }
});