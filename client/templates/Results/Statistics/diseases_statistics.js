Session.set('test',[
			{disease: 'Grippe',
			coeff: 0.5
			},
			{disease: 'N\'a pas consulté',
			coeff: 0.3
			},
			{disease: 'Pneumonie vraiment très méchante',
			coeff: 0.1
			},
			{disease: 'Autres',
			coeff: 0.1
			},
		]);

Template.diseasesStatistics.helpers({
	disease: function() {
		array = Session.get('test');
		return array;
	},
});

Template.diseasesStatistics.onRendered (function() {
	diseaseid = array[0].disease.replace(/ /g,'-').replace(/'/g,'-'); 
	$('#' + diseaseid + '-name').addClass('selected-disease-name');
	$('#' + diseaseid + '-chart').addClass('selected-disease-chart');
	$('#' + diseaseid + '-percentage').addClass('selected-disease-percentage');
});


