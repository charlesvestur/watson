Meteor.publish('discussions', function() {
  return Discussions.find();
});

Meteor.publish('answers', function() {
  return Answers.find();
});