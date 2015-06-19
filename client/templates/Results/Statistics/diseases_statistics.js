Session.set('test',[
			{disease: 'Grippe',
			coeff: 0.4
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
			{disease: 'Chiasse',
			coeff: 0.1}
		]);

Template.diseasesStatistics.onCreated(function(){
	var arrayTest = Session.get('test');
	Session.set('diseaseSelected', arrayTest[0]);
});


Template.diseasesStatistics.helpers({
	disease: function() {
		arrayTest = Session.get('test');
		return arrayTest;
	},

	numberofCases: function() {
		return Session.get('diseaseSelected').coeff*1000;
	},

	diseaseCase: function() {
		return Session.get('diseaseSelected').disease;
	},
});

Template.diseasesStatistics.onRendered (function() {
	diseaseid = arrayTest[0].disease.replace(/ /g,'-').replace(/'/g,'-'); 
	$('#' + diseaseid + '-name').addClass('selected-disease-name');
	$('#' + diseaseid + '-chart').addClass('selected-disease-chart');
	$('#' + diseaseid + '-percentage').addClass('selected-disease-percentage');
});






