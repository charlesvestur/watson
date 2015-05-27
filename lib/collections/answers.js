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
  }
  })); 

Answers.allow({
  insert: function(userId, doc) {
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
            submitted: new Date()
        });
        var answerId = Answers.insert(answer);
        return {
            _id: answerId
        };
    }
})