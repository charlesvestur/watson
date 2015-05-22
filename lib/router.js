Router.configure ({
	layoutTemplate:'layout',
	loadingTemplate:'loading',
	notFoundTemplate:'notFound',
	waitOn: function(){return Meteor.subscribe('discussions');}
})

Router.route('/', function() {
	this.render('home')
},	{
	name: 'home'
});

Router.route('/mainSymptomChecker', function() {
	this.render('mainSymptomChecker')
},	{name: 'mainSymptomChecker'}
);

/*Router.route('/mainResults', function() {
	this.render('mainResults');	
}, {name: 'mainResults'}
);


Router.route('/discussionSubmit', function() {
	this.render('mainResults');	
}, {name: 'discussionSubmit'}
);*/

Router.route('/discussionPage', function() {
	this.render('mainResults');	
	this.render('mainSubnavbar', {to: 'mainSubnavbar'} )
	this.render('discussionPage', {to: 'discussionPage'});
}, {name: 'discussionPage'}
);

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
}

Router.onBeforeAction(requireLogin, {only: 'discussionSubmit'});



