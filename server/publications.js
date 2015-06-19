Meteor.publish('discussions', function(options) {
/*  check(options, {
    sort: Object,
    limit: Number
  });
*/  return Discussions.find({}, options);
});

Meteor.publish('singleDiscussion', function(id) {
//  check(id, String);
  return Discussions.find(id);
});

Meteor.publish('answers', function(discussionId) {
//  check(discussionId, String);
  return Answers.find({discussionId: discussionId});
});

/*Meteor.publish('answers', function(discussionId) {
  check(discussionId, String);
  return Answers.find({discussionId: discussionId});
});*/

Meteor.publish('comments', function(discussionId) {
  check(discussionId, String);
  return Comments.find({discussionId: discussionId});
});

Meteor.publish('notifications', function() {
  return Notifications.find({userId: this.userId, read: false});
});

Meteor.publish('symptoms', function() {
  return Symptoms.find({});
});

Meteor.publish('diseases', function() {
  return Diseases.find({});
});

Meteor.publish('positions', function() {
  return Positions.find({});
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                            {fields: {'userSymptoms': 1, 'discussionsFollowed': 1}});
  } else {
    this.ready();
  }
});
