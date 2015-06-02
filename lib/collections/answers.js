Answers = new Mongo.Collection("answers");

Answers.attachSchema(new SimpleSchema({
  userId: {
  type: String,
  autoform: {
    omit: true
  }
  },

  answer: {
    type: String,
    label: "Votre réponse",
  },


  discussionId: {
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

  submitted: {
    type: Date,
    autoform: {
      omit: true
  }
  },

  upvoters: {
    type: [String],
    autoform: {
      omit: true
    }
  },

  votes: {
    type: Number,
    autoform: {
      omit: true
    }
  }
  })); 

Answers.allow({
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
    answerInsert: function(answerAttributes) {
        
        var user = Meteor.user();
        var answer = _.extend(answerAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            upvoters: [],
            votes: 0
        });
        var answerId = Answers.insert(answer);
        return {
            _id: answerId
        };
    },  

    upvote: function(answerId) {
      check(this.userId, String);
      check(answerId, String);
      var affected = Answers.update({
        _id: answerId,
        upvoters: {$ne: this.userId}
      }, {
        $addToSet: {upvoters: this.userId},
        $inc: {votes: 1}
      });
      if (! affected)
        throw new Meteor.Error('invalid', "Vous n'avez pas pu voter pour ce post.");
    }
});