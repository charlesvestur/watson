Meteor.publish('discussions', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Discussions.find({}, options);
});

Meteor.publish('singleDiscussion', function(id) {
  check(id, String);
  return Discussions.find(id);
});

Meteor.publish('answers', function(discussionId) {
  check(discussionId, String);
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