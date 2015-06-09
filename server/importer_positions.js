//Run only if file has been modified

/*Meteor.startup(function(){
	Positions.remove({});
	var csvAsString = Assets.getText('csvfiles/positions-Tableau 1.csv');
	var csvparsed = Baby.parse(csvAsString, {
					header: true
					});
	var array = csvparsed.data; //Baby.parse renders an object with 4 keys: data (array of objects with results), errors, meta, proto 
	for (var i = 0; i < array.length; i++) {
		delete array[i][''];
		Positions.insert(array[i]);
	}
});
*/