Notifications = new Mongo.Collection('notifications');

Notifications.attachSchema(new SimpleSchema({
  userId: {
  type: String
  },

  discussionId: {
    type: String
  },


  answerId: {
  type: String
  },

  answererName: {
    type: String
  },

  read: {
    type: Boolean
  }

  })); 

Notifications.allow({
  update: function(userId, doc, fieldNames) {
    return ownsDocument(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createAnswerNotification = function(answer) {
  var discussion = Discussions.findOne(answer.discussionId);
  if (answer.userId !== discussion.userId) {
    Notifications.insert({
      userId: discussion.userId,
      discussionId: discussion._id,
      answerId: answer._id,
      answererName: answer.author,
      read: false
    });
  }
};