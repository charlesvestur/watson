Router.configure ({
	layoutTemplate:'layout',
	loadingTemplate:'loading',
	notFoundTemplate:'notFound',
	waitOn: function(){return Meteor.subscribe('discussions');}
})

Router.route('/', function() {
	this.render('Home')
},	{
	name: 'Home'
});

Router.route('/MainSymptomChecker', function() {
	this.render('MainSymptomChecker')
},	{
	name: 'MainSymptomChecker'
});

Router.route('/MainResults', function() {
	this.render('MainResults')
},	{
	name: 'MainResults'
});

Router.route('/MainFeedback', function() {
	this.render('MainFeedback')
},	{
	name: 'MainFeedback'
});

UI.registerHelper("currentRouteName",function(){
    var className="";
    switch(Router.current().route.getName()) {
   case "MainSymptomChecker":
       className="stetoscope-active"
       break;
   case "MainResults":
       className="results-active"
       break;
   case "MainFeedback":
   		className="feedback-active"
    }
    return className;
});