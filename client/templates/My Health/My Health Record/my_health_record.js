Template.myHealthRecord.helpers({
	item: function() {
		var array = Meteor.users.findOne({_id: Meteor.userId()}).userSymptoms;
		//So that symptoms which were not recorded in HealthRecord are not displayed
		for (k=0; k < array.length; k++){
			if (array[k].inHealthRecord === false)
				array.splice(k,1);
		}
		//In order to have the most recent in first position
		for (i=0; i < (array.length)/2; i++){
			j = array.length - 1 - i;
			var a = array[i];
			array[i] = array[j];
			array[j] = a;
		}
		return array;
	}
});
