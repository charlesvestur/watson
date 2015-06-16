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
		symptom = this.replace(/ /g,'-').replace(/'/g,'-');
		if($('#' + symptom)){//.on('click', function(){
			var a = Session.get("symptomsSelected");
			    a = _.extend([], a);
			var index = a.indexOf(this);
				a.splice(index, 1);
			    Session.set('symptomsSelected', a);
		}
	}
});