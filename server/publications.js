Meteor.publish('discussions', function() {
  return Discussions.find();
});