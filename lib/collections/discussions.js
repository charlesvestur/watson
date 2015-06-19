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
    label: "Question détaillée",
    optional: true
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
  },

  diagnosis: {
   type: String,
   optional: true,
   label: "Maladie (facultatif)"
  },

  symptoms: {
   type: [String],
   optional: true 
  },

  hashtags: {
   type: [String],
   optional: true,
  },

  answersCount: {
    type: Number,
    autoform: {
      omit: true
    }
  },

  votesCount: {
    type: Number,
    autoform: {
      omit: true
    }
  },

  lastedited: {
    type: Date,
    optional: true,
    autoform: {
      omit: true
    }
  }

  }));  

Discussions.allow({
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

/*
The allow() function can be replaced by the command below from the ongoworks:security package

Discussions.permit('insert').ifLoggedIn().apply();
Discussions.permit('update').ifLoggedIn().apply();
Discussions.permit('remove').ifLoggedIn().apply();
*/

Meteor.methods({
    discussionInsert: function(discussionAttributes) {
        
        var user = Meteor.user();
        var discussion = _.extend(discussionAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            answersCount: 0,
            votesCount: 0,
            followedby: []
            //lastedited: new Date ()
        });
        var discussionId = Discussions.insert(discussion);
        return {
            _id: discussionId
        };
    },

    discussionUpdate: function(discussionAttributes) {
        
        var user = Meteor.user();
        var discussion = _.extend(discussionAttributes, {
            lastedited: new Date ()
        });
        var discussionId = Discussions.update(discussion);
        return {
            _id: discussionId
        };
    }
});

/* We can also add the various implied attributes ("author", "submitted", ...) in the database with the following hook:
AutoForm.hooks({        
        discussionEdit: {
            before: {
                update: function(doc) {
                    doc.lastedited = new Date ();
                    this.result(doc);
                }
            }
        }            
});

*/



