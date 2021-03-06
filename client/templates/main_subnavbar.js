UI.registerHelper("currentRouteName",function(){
    var className="";
   switch(Router.current().route.getName()) {
	   case "mainSymptomChecker":
	       className="stetoscope-active";
	       break;
	   case "mainResults":
	       className="results-active";
	       break;
	   case "newDiscussions":
	       className="results-active";
	       break;	
	   case "answerDiscussions":
	       className="results-active";
	       break;
	   case "discussionSubmit":
	       className="results-active";
	       break;
	   case "discussionPage":
	       className="results-active";
	       break;
	   case "discussionEdit":
	       className="results-active";
	       break;   
	   case "mainFeedback":
	   		className="feedback-active";
	   		break;
	   	case "discussionSubmit":
	   		className="results-active";
    }
    return className;
});

