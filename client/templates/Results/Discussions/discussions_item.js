Template.discussionsItem.onRendered(
    function(){
    $('.collapsible').collapsible({
    accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
    }
);

Template.discussionsItem.helpers({
    bestanswer: function() {        
    return Answers.findOne({
        discussionId: this._id}, 
        {sort: {submitted: -1}});
    }
});

