Template.discussionsItem.onRendered(
    function(){
    $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    }
);

/*
Template.discussionsItem.onRendered(function (){
    //accordion
    $('.collapsible').hide();
});

Template.debatesAntichambre.events({
    //accordion
    'click .chevron': function(event) { 
        if($(event.target).is('.fa-chevron-up')) {
            $(event.target).toggleClass("fa-chevron-down fa-chevron-up");
            $(event.target.parentElement).find('.collapse').slideToggle();
            $(event.target.parentElement).toggleClass('selected'); 
        } else {
            $('.fa-chevron-up').parent().find('.collapse').slideToggle();
            $('.fa-chevron-up').parent().removeClass('selected');
            $('.fa-chevron-up').toggleClass('fa-chevron-up fa-chevron-down');
            $(event.target).toggleClass("fa-chevron-down fa-chevron-up");
            $(event.target.parentElement).find('.collapse').slideToggle();
            $(event.target.parentElement).toggleClass('selected'); 
        }
 
    }
});
*/

Template.discussionsItem.helpers({
    bestanswer: function() {        
    return Answers.findOne({discussionId: this._id}, {sort: {submitted: -1}});
    }
});

