Template.symptomsDisplayedItem.helpers({
    symbolstyle: function() {
    	var arr = Session.get("symptomsSelected");
        if (arr.indexOf(this.name) > -1){
            return 'glyphicon-ok color-blue-amaya';
        }
        else {
            return 'glyphicon-plus color-blue-regular';
        }
    }
});


Template.symptomsDisplayedItem.events({
	'click .plus-symbol': function(e){
		var plusId = this._id;
		if ($('#' + plusId).hasClass("glyphicon-plus")){
			var m = Session.get("symptomsSelected");
			    m = _.extend([], m); //Creates a new array
			    m.push(this.name);
			    Session.setAuth('symptomsSelected', m);
//In order for the change event to be triggered, Meteor needs to have a new reference for the array, not just an updated copy of the old one.
//In brief, in order to have the 'correct' behaviour, you'll need to clone the array, make the changes you want, and then do Session.set('foo', myCopiedArray).
		}
		else {
			var a = Session.get("symptomsSelected");
			    a = _.extend([], a); 
			var index = a.indexOf(this.name);
				a.splice(index, 1);
			    Session.setAuth('symptomsSelected', a);
		}
	}
});


//Insert an object {symptom: string} in the array of the session variable 'symptomsSelected' instead of a simple string
/*
Template.symptomsDisplayedItem.events({
	'click .plus-symbol': function(e){
		var plusId = this._id;
		if ($('#' + plusId).hasClass("glyphicon-plus")){
			var m = Session.get("symptomsSelected");
			    m = _.extend([], m); //Creates a new array
			    m.push({symptom: this.name});
			    Session.set('symptomsSelected', m);
//In order for the change event to be triggered, Meteor needs to have a new reference for the array, not just an updated copy of the old one.
//In brief, in order to have the 'correct' behaviour, you'll need to clone the array, make the changes you want, and then do Session.set('foo', myCopiedArray).
		}
		else {
			var a = Session.get("symptomsSelected");
			    a = _.extend([], a); 
			var index = a.indexOf({symptom: this.name});
				a.splice(index, 1);
			    Session.set('symptomsSelected', a);
		}
	}
});
*/