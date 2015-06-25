//******** ALGORITHM *********//

/*
Meteor.methods({
	algorithm: function(getSymptomsSelected){
			//We create the vector of the symptoms selected
			var symptomsSelected = getSymptomsSelected; //Session.get('symptomsSelected')
			var vector = [];
			var totalNbOfSymptoms = Symptoms.find({}).count();
			for (k=0; k < totalNbOfSymptoms; k++){
					vector.push(0);
				}

//			console.log(vector);
			for (j=0; j < symptomsSelected.length; j++){
				var index = Symptoms.findOne({name: symptomsSelected[j]}).sympIndex;
				vector[index] = 1;
			}

			//We compute the scalar product for each disease
			var sumScalarproduct = 0;
			var primaryDiagnosis = [];
			Diseases.find({}).forEach(function(disease){
				var scalarproduct = 0;
				for (i=0; i < totalNbOfSymptoms; i++){
					scalarproduct = scalarproduct + disease.diseaseVector[i]*vector[i];
				}
				//If scalar product is not equal to 0, we enter the disease as a potential diagnosis
				if (scalarproduct !== 0) {
					sumScalarproduct += scalarproduct;
					var object = {
						disease: disease.name,
						scalarproduct: scalarproduct
					};
				    primaryDiagnosis.push(object);
				}
			});
			Session.setAuth('diagnosis', primaryDiagnosis);

			//We enter coeff param by dividing the scalar product of the disease with the sum of the scalar product from all diseases
			var diagnosis = Session.get("diagnosis");
			var newDiagnosis = [];
			for(l=0; l < diagnosis.length; l++){
					var disease = diagnosis[l].disease;
					var coeff = (diagnosis[l].scalarproduct)/sumScalarproduct;
					var result = {
						disease: disease,
						coeff: coeff
					};
				    newDiagnosis.push(result);
			}
			Session.setAuth('diagnosis', newDiagnosis);
	}
});
*/