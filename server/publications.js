Meteor.publish('discussions', function() {
  return Discussions.find();
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

