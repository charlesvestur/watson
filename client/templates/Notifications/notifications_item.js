Template.notificationsItem.helpers({
  notificationDiscussionPath: function() {
    return Router.routes.discussionPage.path({_id: this.discussionId});
  }
});

Template.notificationsItem.events({
  'click a': function() {
    Notifications.update(this._id, {$set: {read: true}});
  }
});