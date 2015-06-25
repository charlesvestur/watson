Template.registerHelper('numberOfAnswers', function() {        
    return Answers.find({
        discussionId: this._id}).count();
  }
);

Template.questionsItem.helpers({
    starstyle: function() {
        if(Meteor.user().discussionsFollowed){
            if (Meteor.user().discussionsFollowed.indexOf(this._id) > -1){
                return 'color-yellow glyphicon-star';
            }
            else {
                return ''; 
            }
        }
    },
    questionSymbol: function(){
        if (this.category === 'Symptômes')
            return 'fa fa-stethoscope';
        else if (this.category === 'Consultation')
            return 'fa fa-user-md';
        else if (this.category === 'Traitement')
            return 'fa-medkit';
        else if (this.category === 'Convalescence')
            return 'fa fa-bed';
    }
});

Template.questionsItem.events({
    'click .star': function(e) {
        var starId = this._id;
        //client-only code such as event handlers may only update or remove a single document at a time, specified by _id
        if ($('#' + starId).hasClass("color-yellow"))
            Meteor.users.update({_id: Meteor.userId()}, {$pull: {discussionsFollowed: this._id}});
    
        else {
            if (Meteor.user().discussionsFollowed)
                Meteor.users.update({_id: Meteor.userId()}, {$push: {discussionsFollowed: this._id}});
            else 
                Meteor.users.update({_id: Meteor.userId()}, {$set: {discussionsFollowed: [this._id]}});

            e.stopPropagation();
        }
    },

    'click .chevron': function(e) { 
        if($(event.target).is('.fa-chevron-up')) {
            $(event.target).toggleClass("fa-chevron-down fa-chevron-up");
            $(event.target.parentElement).find('.collapse').slideToggle();
            $(event.target.parentElement).toggleClass('selected'); 
        } 
        else {
            $('.fa-chevron-up').parent().find('.collapse').slideToggle();
            $('.fa-chevron-up').parent().removeClass('selected');
            $('.fa-chevron-up').toggleClass('fa-chevron-up fa-chevron-down');
            $(event.target).toggleClass("fa-chevron-down fa-chevron-up");
            $(event.target.parentElement).find('.collapse').slideToggle();
            $(event.target.parentElement).toggleClass('selected'); 
        }
    },

    'click #delete-discussion': function(e) {
        if (confirm("Supprimer cette question ?")) {
          var currentDiscussionId = this._id;
          Discussions.remove(currentDiscussionId);
          Router.go('mainResults');
        }
    }
}); 

