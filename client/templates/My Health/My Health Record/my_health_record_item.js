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
/*		var doc = Meteor.users.findOne({_id: Meteor.userId()}).userSymptoms;
		doc = $.map(doc, function(n, i){
			return [n.submitted];
		});
		var date = this.submitted;
		var index = doc.map(Number).indexOf(Number(this.submitted));
		var newObject = this;
		newObject.inHealthRecord = false;
		//Pushes new doc in database
		Meteor.users.update({_id: Meteor.userId()}, {$push: {userSymptoms: {$each: [newObject], $position: index}}});
		Meteor.users.update({_id: Meteor.userId()}, {$push: {userSymptoms: newObject}});
*/		//Deletes old doc from database
		Meteor.users.update({_id: Meteor.userId()}, {$pull: {userSymptoms: this}});

	}
});