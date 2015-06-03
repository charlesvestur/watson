UI.registerHelper("currentRouteName",function(){
    var className="";
   switch(Router.current().route.getName()) {
	   case "mainSymptomChecker":
	       className="stetoscope-active";
	       break;
	   case ("mainResults" || "newDiscussions" || "bestDiscussions"):
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

