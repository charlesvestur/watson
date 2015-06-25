Template.myHealthRecordItem.helpers({
	date: function(){
		return moment(this.submitted).format('LL');
	},
	symptoms: function(){
		return this.symptoms;
	}
});

Template.myHealthRecordItem.events({
	'click .glyphicon-remove-sign': function(e){
		Meteor.users.update({_id: Meteor.userId()}, {$pull: {userSymptoms: this}});
		if (confirm("Etes-vous sûr de vouloir supprimer ces symptômes de votre carnet de santé ?")) {
			var newObject = {
				symptoms: this.symptoms,
				submitted: this.submitted,
				inHealthRecord: false
				};
			Meteor.users.update({_id: Meteor.userId()}, {$push: {userSymptoms: newObject}});
		}
	},

	'click .glyphicon-arrow-right': function(e){
		Session.setAuth('symptomsSelected',this.symptoms);
		Router.go('mainResults');
	}
});