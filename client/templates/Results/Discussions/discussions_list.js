Template.discussionsList.helpers({
  discussions: function() {        
 	return Discussions.find({}, {sort: {submitted: -1}});
  }
});

Template.registerHelper('discussionsItemTemplateId', function() {
	return this._id;
	}    
);

Template.discussionsItem.events({
    'click .star': function(e) {
        var starId = this._id;
    if ($('#' + starId).hasClass("glyphicon glyphicon-star-empty")){
        $('#' + starId).removeClass("glyphicon glyphicon-star-empty color-grey-passive"),
        $('#' + starId).addClass("glyphicon glyphicon-star color-yellow")
    }
    else if ($('#' + starId).hasClass("glyphicon glyphicon-star")){
        $('#' + starId).removeClass("glyphicon glyphicon-star color-yellow")
        $('#' + starId).addClass("glyphicon glyphicon-star-empty color-grey-passive")
    }
    else {};
    }
});	

/*$(document).ready(function(){
    $(".header").click(function(){
        $(this).children(".children").toggle();
    });
   $(".header a").click(function(e) {
        e.stopPropagation();
   });
});*/