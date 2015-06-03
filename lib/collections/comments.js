Comments = new Mongo.Collection('comments');

Comments.attachSchema(new SimpleSchema({
  userId: {
	  type: String,
	  autoform: {
	    omit: true
	  }
  },

  author: {
	  type: String,
	  autoform: {
	    omit: true
	  }
  },

  discussionId: {
    type: String,
    autoform: {
      omit: true
    }
  },

  answerId: {
  	type: String,
  	autoform: {
  		omit: true
  	}
  },

  submitted: {
  	type: Date,
  	autoform: {
  		omit: true
  	}
  },

  commentbody: {
  	type: String
  }  
}));

Comments.allow({
  insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  },
  update: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  },
  remove: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  }
 });


Meteor.methods({
  commentInsert: function(commentAttributes) {
  //Utilise le package audit-argument-checks.
    check(this.userId, String);
    check(commentAttributes, {
      answerId: String,
      commentbody: String,
      discussionId: String
    });
    var user = Meteor.user();
    var answer = Answers.findOne(commentAttributes.answerId);
    if (!answer)
      throw new Meteor.Error('invalid-comment', 'Vous devez commenter sur une réponse');
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      discussionId: answer.discussionId,
      submitted: new Date()
    });

    // update the post with the number of comments
    Answers.update(comment.answerId, {$inc: {commentsCount: 1}});

    return Comments.insert(comment);
  }
});