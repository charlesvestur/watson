//To insert implied attributes ("author", "submitted", ...)
//We first create the object 'discussion' with the attributes filled by the user
Template.discussionSubmit.events({

    'submit form': function(e) {
	    e.preventDefault();
	    var discussion = {
	        title: $(e.target).find('[name=title]').val(),
	        question: $(e.target).find('[name=question]').val(),
            //category: categoryStatus
	    };

//We apply our discussionInsert function to the object 'discussion'
		Meteor.call('discussionInsert', discussion, function(error, result) {
		    // affiche l'erreur à l'utilisateur et s'interrompt
		    if (error)
		        return alert(error.reason);
		    Router.go('mainResults', {_id: result._id});
		});
	}
});

/* We can also add the various implied attributes ("author", "submitted", ...) in the database with the following hook:

AutoForm.hooks({        
        discussionSubmit: {
            before: {
                insert: function(doc) {
                    doc.submitted = new Date;
                    doc.upvote = 0;
                    this.result(doc);
                }
            }
        }            
    });*/




/*UI.registerHelper("categorySelectedDesign", function(){
    var className="";
    switch(categoryStatus){
        case "symptoms":
        className="symptoms-active"
        break;
        case "consultation":
        className="consultation-active"
        break;
        case "traitement":
        className="traitement-active"
        break;
        case "convalescence":
        className="convalescence-active"
        break;
    }
    return className;
});*/

/*Template.mainResults.helpers({
    discussionsList : function () {
         return Session.equals("discussionsList", "discussionsList")  
    },
    discussionSubmit : function () {
         return Session.equals("discussionSubmit", "discussionSubmit")  
    }
 });*/



UI.registerHelper("currentRouteName",function(){
    var className="";
   switch(Router.current().route.getName()) {
       case "mainSymptomChecker":
           className="stetoscope-active"
           break;
       case "mainResults":
           className="results-active"
           break;
       case "mainFeedback":
            className="feedback-active"
            break;
        case "discussionSubmit":
            className="results-active"
    }
    return className;
});

