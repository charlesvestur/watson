Template.myHealthRecord.helpers({
	item: function() {
		var check = Meteor.user().userSymptoms;
		var array = Meteor.user().userSymptoms;
		//So that symptoms which were not recorded in HealthRecord are not displayed
		if (array){
			if (array.length > 0){
				var n = 0; 
				for (k=0; k < check.length; k++){
					if (check[k].inHealthRecord === false) {
						array.splice(k-n,1); //the var 'n' is here so that the correct array element is removed
						n += 1;
					}
				}
//				console.log(array);
				if (array.length > 0){
					//In order to have the most recent in first position
					array.sort(function(a, b){
						return (Number(b.submitted) - Number(a.submitted));
					});
				}
			}
			return array;
		}
		else
			return [];
	}
});
