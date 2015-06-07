//To comment out if liste.csv has been modified

/*Meteor.startup(function(){
	Symptoms.remove({});
	Diseases.remove({});
	var csvAsString = Assets.getText('csvfiles/liste.csv');
	var csvparsed = Baby.parse(csvAsString, {
					header: true
					});
	var array = csvparsed.data; //Baby.parse renders an object with 4 keys: data (array of objects with results), errors, meta, proto 
	var symptomsArray = [];
	for (var i = 0; i < array.length; i++) {
		disease = array[i]; //disease is an object
		var diseaseKeys = Object.keys(disease); //returns an array with the keys of the object 'disease'
		var n = 0;
		for (var j = 0; j < diseaseKeys.length; j++) {
			if (diseaseKeys[j].indexOf('symptom') > -1){
				n = n + 1;
				symptomN = 'symptom' + n;
				var symptomExp = /(.*) \((.*)\)/;
				if (disease[symptomN] !== '') {
					var symptomString = disease[symptomN];
					symptomExp.exec(disease[symptomN]);
					disease[symptomN] = {  //Transforms the string in an object with keys: 'name' and 'positions'
						name: RegExp.$1,
						positions: ((RegExp.$2).split('/'))[0].split(':') //positions will be an array
					};
					if ((RegExp.$2).indexOf('/') > -1){
						disease[symptomN].specifics = ((RegExp.$2).split('/'))[1].split(':'); //Adds array of specifics if they exist
					}
					//To insert in database and avoid the same symptom to be added twice in database
					if (symptomsArray.indexOf(symptomString) === -1){ 
						symptomsArray.push(symptomString);
						Symptoms.insert(disease[symptomN]);
					}
					disease[symptomN].diseaseCoeff = 1; //Sets importance of symptom for disease
				}
				else {
					delete disease[symptomN];
				}
			}
			else if (diseaseKeys[j] === 'context') {
				var contextExp = /(.*)/;
				if (disease.context !== '') { 
					contextExp.exec(disease.context);
					disease.context = (RegExp.$1).split(' / ');
				}
				else {
					delete disease.context;
				}
			}
			else if (diseaseKeys[j] === 'medicalHistory') {
				var medicalHistoryExp = /(.*)/;
				if (disease.medicalHistory !== '') {
					medicalHistoryExp.exec(disease.medicalHistory);
					disease.medicalHistory = (RegExp.$1).split(' / ');
				}
				else {
					delete disease.medicalHistory;
				}
			}
			else if (diseaseKeys[j] === 'incidence') {
				if (disease.incidence !== '') {
					var to_number = parseInt(disease.incidence, 10);
					disease.incidence = to_number;
				}
				else {
					delete disease.incidence;
				}
			}
			else if (diseaseKeys[j] === 'prevalence'){
				if (disease.prevalence !== '') {
					var stringCorrected = disease.prevalence.replace(',','.');
					var to_float = parseFloat(stringCorrected)/100.0;
					disease.prevalence = to_float;
				}
			}
		}
		Diseases.insert(disease);
	}
});	
*/