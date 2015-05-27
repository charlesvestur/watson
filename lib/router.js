Router.configure ({
	layoutTemplate:'layout',
	loadingTemplate:'loading',
	notFoundTemplate:'notFound',
	waitOn: function(){return Meteor.subscribe('discussions');}
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
  layoutTemplate: 'layout',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionSubmit': {to: 'discussionsBody'}
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
  layoutTemplate: 'layout',
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
  layoutTemplate: 'layout',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionPage': {to: 'discussionsBody'}
    },
    data: function() {
    return Discussions.findOne({_id: this.params._id});
  }
  });
});

Router.map(function () {
  this.route('answerSubmit', {
  path: '/answerSubmit',
  template: 'mainResults',
  layoutTemplate: 'layout',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'answerSubmit': {to: 'discussionsBody'}
    }
  });
});






