Template.diseasesStatistics.onCreated(function(){
	
	finalDiagnosis = Session.get('diagnosis');
	Session.set('diseaseSelected', finalDiagnosis[0]);

	minimumCoeff = 0.05; //Minimum probability to reach to not figure in 'Others' cateogory
	othersCoeff = 0;

	var d = Session.get('diagnosis');
	for (k=0; k < d.length; k++){
		if(d[k].coeff < minimumCoeff) 
			othersCoeff += parseFloat(d[k].coeff);
	}
});

Template.diseasesStatistics.helpers({
	//Gets all diagnosis with a coeff ABOVE the minimumCoeff
	mainDiagnosis: function() {
		var d = Session.get('diagnosis');
		mainDiagnosis = [];

		for (k=0; k < d.length; k++){
			if(d[k].coeff >= minimumCoeff) { 
				mainDiagnosis.push(d[k]);
			}
		}
		mainDiagnosis.sort(function(a, b){return (b.coeff - a.coeff);});
		//Puts 'Autres' category if diseases with a coeff below minimumCoeff exist
		if ((mainDiagnosis.length < d.length)&&(mainDiagnosis.length !== 0)){
			mainDiagnosis.push({
				disease: 'Autres',
				coeff: othersCoeff  
			});
		}
		return mainDiagnosis;
	},

	//Gets all diagnosis with a coeff BELOW the minimumCoeff
	secondaryDiagnosis: function() {
		var d = Session.get('diagnosis');
		var secondaryDiagnosis = [];
		for(k=0; k < d.length; k++){
			if(d[k].coeff < minimumCoeff)
				secondaryDiagnosis.push(d[k]);
		}
		secondaryDiagnosis.sort(function(a, b){return (b.coeff - a.coeff);});
		return secondaryDiagnosis;
	},

	numberofCases: function() {
		return (Session.get('diseaseSelected').coeff*1000).toFixed(0);
	},

	diseaseCase: function() {
		return Session.get('diseaseSelected').disease;
	},

	displayOrNot: function(){
		var d = Session.get('diagnosis');
		//Creates an array with all the diagnosis with a coeff ABOVE minimum coeff
		var b = [];
		for(k=0; k < d.length; k++){
			if(d[k].coeff < minimumCoeff)
				b.push(d[k].disease);
		}
		if ((b.indexOf(Session.get('diseaseSelected').disease) > -1)||(Session.get('diseaseSelected').disease === 'Autres')||(othersCoeff === 1))
			return 'initial';
		else
			return 'none';
	}
});

Template.diseasesStatistics.onRendered (function() {
	diseaseid = mainDiagnosis[0].disease.replace(/ /g,'-').replace(/'/g,'-'); 
	$('#' + diseaseid + '-name').addClass('selected-disease-name');
	$('#' + diseaseid + '-chart').addClass('selected-disease-chart');
	$('#' + diseaseid + '-percentage').addClass('selected-disease-percentage');
	Session.set('diseaseSelected',mainDiagnosis[0]);
});






