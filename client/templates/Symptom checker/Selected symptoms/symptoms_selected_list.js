Template.symptomsSelectedList.helpers({
	symptomsSelectedItem: function() {
		a = Session.get('symptomsSelected');
		return a;
	},

	symptomId: function () {
		symptom_to_s_attached = this.replace(/ /g,'-').replace(/'/g,'-');
		return symptom_to_s_attached;
	}
});

/*var EventHandler = Base.extend({

btnClickHandler: function(){
    return function (event) {
      event.preventDefault();
      Meteor.eventhandler[event.currentTarget.id](event);
    };
  }
});
*/

Template.symptomsSelectedList.events({
	'click .remove-symbol': function() {
		symptom = Template.currentData().replace(/ /g,'-').replace(/'/g,'-');
		console.log(symptom);
		if($('#' + symptom)){//.on('click', function(){
			var a = Session.get("symptomsSelected");
			    a = _.extend([], a);
			var index = a.indexOf(this);
				a.splice(index, 1);
			    Session.set('symptomsSelected', a);
		}
	}
});

/*Template.symptomsSelectedList.onRendered({
	
});
*/