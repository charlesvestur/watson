Template.symptomsSelectedItem.helpers({
	symptom: function() {
		return this;
	},

	symptomId: function () {
		symptom_to_s_attached = this.replace(/ /g,'-').replace(/'/g,'-');
		return symptom_to_s_attached;
	}

});

Template.symptomsSelectedItem.events({
	'click .remove-symbol': function() {
		var a = Session.get("symptomsSelected");
	    a = _.extend([], a);
	    var symptom = this.replace('',''); //To gt the primitive value of the string and not the object...
		var index = a.indexOf(symptom);
		a.splice(index, 1);
	    Session.set('symptomsSelected', a);
	}
});