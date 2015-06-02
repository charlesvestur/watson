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
    check(this.userId, String);
    check(commentAttributes, {
      answerId: String,
      commentbody: String
    });
    var user = Meteor.user();
    var answer = Answers.findOne(commentAttributes.answerId);
    if (!answer)
      throw new Meteor.Error('invalid-comment', 'Vous devez commenter sur une réponse');
    comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    return Comments.insert(comment);
  }
});