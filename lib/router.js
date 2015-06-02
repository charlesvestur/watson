Router.configure ({
	layoutTemplate:'layout',
	loadingTemplate:'loading',
	notFoundTemplate:'notFound',
	waitOn: function(){
    return [Meteor.subscribe('discussions'), Meteor.subscribe('answers'), Meteor.subscribe('comments')];}
});

Router.route('/', function() {
	this.render('home');
},	{
	name: 'home'
});

Router.route('/mainSymptomChecker', function() {
	this.render('mainSymptomChecker');
},	{name: 'mainSymptomChecker'}
);


Router.route('/mainMyHealth', function() {
  this.render('mainMyHealth');
},  {name: 'mainMyHealth'}
);

Router.map(function () {
  this.route('discussionSubmit', {
  path: '/discussionSubmit',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionSubmit': {to: 'discussionsBody'}
    }
  });
});

Router.map(function () {
  this.route('discussionEdit', {
  path: '/discussionEdit/:_id',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionPage': {to: 'discussionsBody'},
    'discussionEdit': {to: 'discussionPageBody'}
    },
    data: function() {
    return Discussions.findOne({_id: this.params._id});
  }
  });
});


var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {only: 'discussionSubmit'});

Router.map(function () {
  this.route('mainResults', {
  path: '/mainResults',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionsList': {to: 'discussionsBody'}
    }
  });
});

Router.map(function () {
  this.route('discussionPage', {
  path: '/discussionPage/:_id',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionPage': {to: 'discussionsBody'},
    'answersList': {to: 'discussionPageBody'}
    },
    data: function() {
    return Discussions.findOne({_id: this.params._id});
  }
  });
});

Router.map(function () {
  this.route('answerSubmit', {
  path: '/discussionPage/:_id/answerSubmit',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionPage': {to: 'discussionsBody'},
    'answerSubmit': {to: 'discussionPageBody'},
    'answersList': {to: 'discussionPageSubBody'},
    },
    data: function() {
    return Discussions.findOne({_id: this.params._id});
  }
  });
});




