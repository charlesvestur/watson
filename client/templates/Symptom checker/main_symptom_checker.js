Template.mainSymptomChecker.onRendered(function(){
	if(Session.get('symptomsSelected')) {}
	else {
		symptomsSelected = [];
		Session.setAuth('symptomsSelected', symptomsSelected);
	}
});

Template.mainSymptomChecker.helpers({
	displayOrNot: function() {
		var a = Session.get("symptomsSelected");
		if (a&&(a.length > 0)) {
			return "initial";
		}
		else {
			return "none";
		}
	}
});

Template.mainSymptomChecker.events({
	'click #know-diagnosis': function(e) {
			//We enter the symptoms selected in the user database
			var userSymptomsObject = {
				symptoms: Session.get('symptomsSelected'),
				submitted: new Date(),
				inHealthRecord: $('#myhealth-checkbox').prop('checked'),
			};
			var doc = Meteor.users.findOne({_id: Meteor.userId()});

			if (doc.userSymptoms){
				Meteor.users.update({_id: doc._id}, {$push: {userSymptoms: userSymptomsObject}});
			}
			else {
				Meteor.users.update({_id: doc._id}, {$set: {userSymptoms: [userSymptomsObject]}});
			}

			//Algorithm running to find diagnosis
			algorithm(Session.get('symptomsSelected'));
			Session.set('hashtagsSelected', null);
			Router.go('mainResults');
	},


	'click #delete-all': function(e) {
		symptomsSelected = [];
		Session.setAuth('symptomsSelected', symptomsSelected);
	},

	'click #gender-male': function(e){
		$('#gender-male').addClass('blue-background');
		$('#gender-male-svg').attr('class','white-fill');
		$('#gender-female').removeClass('blue-background');
		$('#gender-female-svg').attr('class','#');
		$('#human-body-img').attr({src:'/images/body_man_front.jpg', usemap: '#symptoms-areas-man-front'});
	},

	'click #gender-female': function(e){
		$('#gender-female').addClass('blue-background');
		$('#gender-female-svg').attr('class','white-fill');
		$('#gender-male').removeClass('blue-background');
		$('#gender-male-svg').attr('class','#');
		$('#human-body-img').attr({src:'/images/body_woman_front.jpg', usemap: '#symptoms-areas-woman-front'});
	},

	'click #reverse-sign': function(e) {
		if (($('#gender-male').hasClass('blue-background'))&&($('#reverse-sign').hasClass('body-front'))) {
			$('#human-body-img').attr({src:'/images/body_man_back.jpg', usemap: '#symptoms-areas-man-back'});
		}
		else if (($('#gender-female').hasClass('blue-background'))&&($('#reverse-sign').hasClass('body-front'))) {
			$('#human-body-img').attr({src:'/images/body_woman_back.jpg', usemap: '#symptoms-areas-woman-back'});
		}
		else if ($('#gender-male').hasClass('blue-background')) {
			$('#human-body-img').attr({src:'/images/body_man_front.jpg', usemap: '#symptoms-areas-man-front'});
		}
		else {
			$('#human-body-img').attr({src:'/images/body_woman_front.jpg', usemap: '#symptoms-areas-woman-front'});
		}
		$('#reverse-sign').toggleClass('body-front');
	},

	'mouseleave .body-part': function(e){
		$('#area-of-symptoms-hovered').html('&nbsp;');
	},

	'mouseenter .head': function(e){
		$('#area-of-symptoms-hovered').html('Tête');
	},
	'mouseenter .chest': function(e){
		$('#area-of-symptoms-hovered').html('Poitrine');
	},
	'mouseenter .arms': function(e){
		$('#area-of-symptoms-hovered').html('Bras');
	},
	'mouseenter .wrists': function(e){
		$('#area-of-symptoms-hovered').html('Poignets');
	},
	'mouseenter .hands': function(e){
		$('#area-of-symptoms-hovered').html('Mains');
	},
	'mouseenter .tummy': function(e){
		$('#area-of-symptoms-hovered').html('Ventre');
	},
	'mouseenter .urogenital': function(e){
		$('#area-of-symptoms-hovered').html('Parties urogénitales');
	},
	'mouseenter .legs': function(e){
		$('#area-of-symptoms-hovered').html('Jambes');
	},
	'mouseenter .feet': function(e){
		$('#area-of-symptoms-hovered').html('Pieds');
	},
	'mouseenter #symptomes-diffus': function(e){
		$('#area-of-symptoms-hovered').html('Symptômes diffus');
	},

	'click .head': function(e){
		$('#area-of-symptoms-selected').html('Tête');
	},
	'click .chest': function(e){
		$('#area-of-symptoms-selected').html('Poitrine');
	},
	'click .arms': function(e){
		$('#area-of-symptoms-selected').html('Bras');
	},
	'click .wrists': function(e){
		$('#area-of-symptoms-selected').html('Poignets');
	},
	'click .hands': function(e){
		$('#area-of-symptoms-selected').html('Mains');
	},
	'click .tummy': function(e){
		$('#area-of-symptoms-selected').html('Ventre');
	},
	'click .urogenital': function(e){
		$('#area-of-symptoms-selected').html('Parties urogénitales');
	},
	'click .legs': function(e){
		$('#area-of-symptoms-selected').html('Jambes');
	},
	'click .feet': function(e){
		$('#area-of-symptoms-selected').html('Pieds');
	},
	'click #symptomes-diffus': function(e){
		$('#area-of-symptoms-selected').html('Symptômes diffus');
	},
});
