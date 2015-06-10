Session.set('test',[
			{disease: 'Grippe',
			coeff: 0.5
			},
			{disease: 'N\'a pas consulté',
			coeff: 0.4
			},
			{disease: 'Pneumonie blablablablabla blablabala',
			coeff: 0.1
			}
		]);

Template.diseasesStatistics.helpers({
	disease: function() {
		var array = Session.get('test');
		return array;
	},
});

Template.diseasesStatistics.onRendered (function() {
	var windowWidth = 100;
//	var windowWidthPercentage = windowWidth/windowidth;
//	var windowHeight =$(window).height();
	var x = 0.5;
	var disease = this.disease;
	$('#pneumonia').css({'width': windowWidth*x + '%'});
	var windowWidth2 = ((parseInt($(window).width())) / 2) - 120;
});

/*
Template.diseasesStatistics.events({

});
*/