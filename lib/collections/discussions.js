Discussions = new Mongo.Collection("discussions");

Discussions.attachSchema(new SimpleSchema({
  userId: {
  type: String,
  autoform: {
    omit: true
  }
  },

  title: {
    type: String,
    label: "Votre question : (80 caractères max.)",
    max: 80
  },
  
  question: {
    type: String,
    label: "Question détaillée"
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
  category: {
    type: String,
    autoform: {
      omit: true
  }
  }

  }));  

Discussions.allow({
  insert: function(userId, doc) {
    // autoriser les posts seulement si l'utilisateur est authentifié
    return !! userId;
  }
 });

Meteor.methods({
    discussionInsert: function(discussionAttributes) {
        
        var user = Meteor.user();
        var discussion = _.extend(discussionAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date()
        });
        var discussionId = Discussions.insert(discussion);
        return {
            _id: discussionId
        };
    }
});




/*
The allow() function can be replaced by the command below from the ongoworks:security package

Discussions.permit('insert').ifLoggedIn().apply();
*/