/*Template.questionsItem.helpers({
    symbolstyle: function() {
        if (){
            return 'color-yellow glyphicon-star';
        }
        else {
            return '';
        }
    },

    undisplayIfSelected: function() {

    }
});
*/

Template.symptomsDisplayedItem.events({
	'click .plus-symbol': function(e){
		var plusId = this._id;
		if ($('#' + plusId).hasClass("glyphicon-plus")){
			var addNewSymptomSelected = Session.get('symptomsSelected').push(this._id);
			Session.set('symptomsSelected', addNewSymptomSelected);

		}
	}
});