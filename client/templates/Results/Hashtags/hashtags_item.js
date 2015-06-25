Template.hashtagsItem.events({
	'click .hashtag-container': function(e){
		if(Session.get('hashtagsSelected')){
			if(Session.get('hashtagsSelected').indexOf(this.hashtag) === -1){
				var m = Session.get('hashtagsSelected');
				    m = _.extend([], m); //Creates a new array
				    m.push(this.hashtag);
				    Session.set('hashtagsSelected', m);
			}
			else {
				var a = Session.get('hashtagsSelected');
				    a = _.extend([], a); 
				var index = a.indexOf(this.hashtag);
					a.splice(index, 1);
					if (a.length === 0)
						Session.set('hashtagsSelected', null);
					else
				    	Session.set('hashtagsSelected', a);

			}
		}
		else {
			Session.set('hashtagsSelected', [this.hashtag]);
		}
	}	
});

Template.hashtagsItem.helpers({
	color: function(){
		if(Session.get('hashtagsSelected')){
			if(Session.get('hashtagsSelected').indexOf(this.hashtag) === -1)
				return 'color-grey-passive';
			else
				return 'color-blue-amaya';
		}
		else 
			return 'color-grey-passive';
	}
});