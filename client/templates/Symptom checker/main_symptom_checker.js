Template.mainSymptomChecker.onCreated(function(){
	symptomsSelected = [];
	Session.set('symptomsSelected', symptomsSelected);
});

Template.mainSymptomChecker.events({
	'click #gender-male': function(e){
		$('#gender-male').addClass('blue-background');
		$('#gender-male-svg').attr('class','white-fill');
		$('#gender-female').removeClass('blue-background');
		$('#gender-female-svg').attr('class','#');
		$('#human-body-img').attr('src','/images/body_man_front.jpg');
	},

	'click #gender-female': function(e){
		$('#gender-female').addClass('blue-background');
		$('#gender-female-svg').attr('class','white-fill');
		$('#gender-male').removeClass('blue-background');
		$('#gender-male-svg').attr('class','#');
		$('#human-body-img').attr('src','/images/body_woman_front.jpg');
	},

	'click #reverse-sign': function(e) {
		if (($('#gender-male').hasClass('blue-background'))&&($('#reverse-sign').hasClass('body-front'))) {
			$('#human-body-img').attr('src','/images/body_man_back.jpg');
		}
		else if (($('#gender-female').hasClass('blue-background'))&&($('#reverse-sign').hasClass('body-front'))) {
			$('#human-body-img').attr('src','/images/body_woman_back.jpg');
		}
		else if ($('#gender-male').hasClass('blue-background')) {
			$('#human-body-img').attr('src','/images/body_man_front.jpg');
		}
		else {
			$('#human-body-img').attr('src','/images/body_woman_front.jpg');
		}
		$('#reverse-sign').toggleClass('body-front');
	},

	'mouseenter #head': function(e){
		$('#area-of-symptoms-selected').val('Tête');
		//innerHTML not working...
		}
});
