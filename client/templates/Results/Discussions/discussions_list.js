Template.discussionsList.helpers({
	filterStyleDate: function() {
	   if(Router.current().route.getName() === 'newDiscussions')
		return "selected-filter";
	},
	filterStyleVote: function() {
	   if(Router.current().route.getName() === 'mainResults')
		return "selected-filter";
	},
	filterStyleAnswer: function() {
	   if(Router.current().route.getName() === 'answerDiscussions')
		return "selected-filter";
	},
	nbOfDiscussions: function(){
		return this.discussions.count();
	}
});

Template.discussionsList.events({
	'click #more-filters-div': function(e) {
		$('#filters-container').toggleClass('display-none');
		$('#chevron-filters').toggleClass('fa-chevron-down');
		$('#chevron-filters').toggleClass('fa-chevron-up');
		if($('#filters-container').hasClass('display-none'))
			$('#more-filters-text').html('Plus de filtres');
		else
			$('#more-filters-text').html('Masquer les filtres');
	},
	'click #show-categories-div': function(e) {
		$('#categories-container').toggleClass('display-none');
		$('#chevron-categories').toggleClass('fa-chevron-down');
		$('#chevron-categories').toggleClass('fa-chevron-up');
		if($('#categories-container').hasClass('display-none'))
			$('#show-categories-text').html('Afficher les catégories');
		else
			$('#show-categories-text').html('Masquer les catégories');
	}
});