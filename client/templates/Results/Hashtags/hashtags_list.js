Template.hashtagsItemList.helpers({
	hashtag: function(){	
//		var discussions = this.discussions.fetch(); //Only the first dicussions will be loaded with this line
		if(Session.get('symptomsSelected')) 
			discussions = Discussions.find({symptoms: Session.get('symptomsSelected').sort()}).fetch();
		else 
			discussions = Discussions.find({}).fetch();
		var hashtags = [];
		for (k=0; k < discussions.length; k++){
			if(discussions[k].hashtags) {
				for (l=0; l < discussions[k].hashtags.length; l++){	
					if (hashtags.length === 0){
						hashtags.push({
							hashtag: (discussions[k].hashtags)[l],
							nbOfMentions: 1
							});
					}
					else {
						var check = 'defined';
						for (j=0; j < hashtags.length; j++){
							if (hashtags[j].hashtag === (discussions[k].hashtags)[l]) {
								hashtags[j].nbOfMentions += 1;
								check = null;
							}
						}
						if (check) {
							hashtags.push({
								hashtag: (discussions[k].hashtags)[l],
								nbOfMentions: 1
							});
						}
					}
				}
			}
		}
		return hashtags.sort(function(a, b){return (b.nbOfMentions - a.nbOfMentions);});
		
	}	
});
