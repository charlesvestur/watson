//Run only if file has been modified
/*
Meteor.startup(function(){
	Symptoms.remove({});
	Diseases.remove({});
	var csvAsString = Assets.getText('csvfiles/liste-Tableau 1.csv');
	var csvparsed = Baby.parse(csvAsString, {
					header: true
					});
	var array = csvparsed.data; //Baby.parse renders an object with 4 keys: data (array of objects with results), errors, meta, proto 
	var symptomsCompleteArray = [];
	var symptomsNameArray = [];
	var sympIndex = 0;
	for (var i = 0; i < array.length; i++) {
		disease = array[i]; //disease is an object
		var diseaseObject = {};
		var diseaseKeys = Object.keys(disease); //returns an array with the keys of the object 'disease'
		var n = 0;
		for (var j = 0; j < diseaseKeys.length; j++) {
			if (diseaseKeys[j].indexOf('symptom') > -1){
				n = n + 1;
				symptomN = 'symptom' + n;
				var symptomCompleteString = disease[symptomN]; // !!! --> If it includes disease coefficient, it must be removed!

				if (symptomCompleteString !== '') {
					if (symptomCompleteString.substring(0,1) === '?') {
						delete disease[symptomN];
						var symptomExp1 = /\?(.*)/;
						symptomExp1.exec(symptomCompleteString);
						diseaseObject = Diseases.findOne({name: RegExp.$1});
					}
					else {
						var symptomExp2 = /(.*) \((.*)\)(.*)/;
						symptomExp2.exec(symptomCompleteString);

						//Gets and sets name and position (both always exist)
						var positionString = ((RegExp.$2).split('/'))[0];
						disease[symptomN] = {  //Transforms the string in an object with keys: 'name' and 'position'
							name: RegExp.$1,
							position: parseInt((positionString.split('|'))[0], 10) //position will be a Number
						};

						//Gets and sets gender if it exists
						if (RegExp.$3 !== '') {
							disease[symptomN].gender = (RegExp.$3).substring(1,2); //gets H of F if specified
						}
						else {
							disease[symptomN].gender = 'both';
						}

						//Gets subpositions and qualifiers if they exist
						var subpositionsString = ((RegExp.$2).split('/'))[1];
						var subpositionsArray = subpositionsString ? ((subpositionsString.split('|'))[0]).split(':') : null;  //subpositions are strings in an array
						var qualifiersString = subpositionsString ? (subpositionsString.split('|'))[1] : (positionString.split('|'))[1];
						var qualifiersArray = qualifiersString ? qualifiersString.split(':') : null; //qualifiers are strings in an array

						//Computes how many times the same symptom name has been already treated -> Only concerns the symptoms database
						var nbOfOccurences = 0;
						symptomsNameArray.push(disease[symptomN].name);
						for (var k = 0; k < symptomsNameArray.length; k++) {
							if (symptomsNameArray[k] == disease[symptomN].name)
								nbOfOccurences += 1;
						}
						var subpositionsNb = 'subpositions' + nbOfOccurences;
						var qualifiersNb = 'qualifiers' + nbOfOccurences;
						if (nbOfOccurences === 1){ //If it is the first time the name appears
							if (subpositionsString&&qualifiersString) {
								(disease[symptomN])[subpositionsNb] = subpositionsArray;
								(disease[symptomN])[qualifiersNb] = qualifiersArray;	
							}
							else if (subpositionsString) {
								(disease[symptomN])[subpositionsNb] = subpositionsArray;
							}
							else if (qualifiersString) {
								(disease[symptomN])[qualifiersNb] = qualifiersArray;
							}
							disease[symptomN].sympIndex = sympIndex;
							sympIndex = sympIndex + 1;
							Symptoms.insert(disease[symptomN]);
						}
						else if (symptomsCompleteArray.indexOf(symptomCompleteString) === -1){ //If the name has already appeard, but with different subpositions and/or qualifiers
							var setModifier1 = { $set: {} };
							if (subpositionsString&&qualifiersString) {
								var setModifier2 = { $set: {} };
								setModifier1.$set[subpositionsNb] = subpositionsArray;
								Symptoms.update({name: disease[symptomN].name}, setModifier1);
								setModifier2.$set[qualifiersNb] = qualifiersArray;
								Symptoms.update({name: disease[symptomN].name}, setModifier2);
							}
							else if (subpositionsString) {
								setModifier1.$set[subpositionsNb] = subpositionsArray;
								Symptoms.update({name: disease[symptomN].name}, setModifier1);
							}	
							else if (qualifiersString){
								setModifier1.$set[qualifiersNb] = qualifiersArray;
								Symptoms.update({name: disease[symptomN].name}, setModifier1);
							}

						}
						symptomsCompleteArray.push(symptomCompleteString);

						disease[symptomN].diseaseCoeff = 1; //Sets importance of symptom for disease
						delete disease[symptomN].gender; //Deletes gender, which is not needed in the Diseases database
						delete disease[symptomN].sympIndex; //Deletes sympIndex, which is not needed in the Diseases database
					}
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
				else {
					delete disease.prevalence;
				}
			}
		}

		//Following script only for included symptoms starting with '?'
		var diseaseObjectKeys = Object.keys(diseaseObject);
		if (diseaseObjectKeys.length > 0) {

			// Counts the number of symptoms in 'diseaseObject' and deletes other keys	
			var a = 0;
			for (var x = 0; x < diseaseObjectKeys.length; x++) {
				if (diseaseObjectKeys[x].indexOf('symptom') === -1){
					delete diseaseObject[diseaseObjectKeys[x]];
				}
				else {
					a = a + 1; //Counts the number of symptoms in 'diseaseObject'
				}
			}
			var b = a; 
			
			var newDiseaseKeys = Object.keys(disease);
			var c = 0;
			for (var l = 0; l < newDiseaseKeys.length; l++) {
				if (newDiseaseKeys[l].indexOf('symptom') !== -1){
					c = c + 1; //Counts the number of symptoms in 'disease'
					b = b + 1;
					//Changes name of keys of 'disease' so that 'diseaseObject' and 'disease' can merge properly
					disease['symptom' + b] = disease[newDiseaseKeys[l]];
				}
			}
			//Deletes symptoms that are now in double
			for (z=1; z <= a; z++){
				delete disease[newDiseaseKeys[z]];
			}
			
			//Merges objects
			for (var attrname in diseaseObject) { disease[attrname] = diseaseObject[attrname]; }

			//Check
			var newObjectKeys = Object.keys(disease);
			d = 0;
			for (var y = 0; y < newObjectKeys.length; y++) {
					if (newObjectKeys[y].indexOf('symptom') !== -1)
						d = d + 1; //Counts the number of symptoms in the new Object
			} 
			if (a + c !== d)
				console.log('Erreur lors de la fusion des symptômes pour la maladie' + disease.name);	
		}
		Diseases.insert(disease);
	}
	//Creates vector for each disease
	Diseases.find({}).forEach(function(disease){
		var vector = [];
		for (k=0; k < Symptoms.find({}).count(); k++){
				vector.push(0);
			}
		var diseaseKeys = Object.keys(disease);
		var n = 0;
		for (var j = 0; j < diseaseKeys.length; j++) {
			if (diseaseKeys[j].indexOf('symptom') > -1){
				n = n + 1;
			}
		}
		for(i = 1; i <= n; i++){
			var symptomNb = 'symptom' + i;
			var index = Symptoms.findOne({name: disease[symptomNb].name}).sympIndex;
			vector[index] = 1*disease[symptomNb].diseaseCoeff;
		}
//	console.log(vector.length);
	Diseases.update({_id: disease._id}, {$set: {diseaseVector: vector}});
	});
});
*/

