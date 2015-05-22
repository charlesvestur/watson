Template.discussionsList.helpers({
  discussions: function() {
       return Discussions.find(/*{}, {sort: {submitted: -1}}*/);
  }
});

	