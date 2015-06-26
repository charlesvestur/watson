Template.diseasesStatisticsItem.helpers({
	percentage: function() {
		var percent = (this.coeff*100).toFixed(0); 
		return (percent + '%');
	},
	diseaseId: function() {
		var diseaseid = this.disease.replace(/ /g,'-').replace(/'/g,'-');
		return diseaseid;
	}
});

Template.diseasesStatisticsItem.onRendered(function() {
	var windowWidth = 100;
	var x = Template.currentData().coeff;
	var disease = Template.currentData().disease.replace(/ /g,'-').replace(/'/g,'-');
	if (x >= minimumCoeff){ //minimumCoeff is defined in diseases_statistics.js
		$('#' + disease).css({'width': windowWidth*x + '%'});
	}
	else {
		$('#' + disease).css({'width': windowWidth*x*(1/othersCoeff) + '%'}); //othersCoeff is defined in diseases_statistics.js
	}
});

Template.diseasesStatisticsItem.events ({
	'click .container-disease-chart': function(e) {
	var diseaseid = this.disease.replace(/ /g,'-').replace(/'/g,'-');

	//Resets everything
	$('.not-selected-disease-name').removeClass('selected-disease-name');
//	$('.not-selected-disease-name').css('padding', 0);
//	$('.not-selected-disease-name').width('initial');
	$('.not-selected-disease-chart').removeClass('selected-disease-chart');
	$('.not-selected-disease-percentage').removeClass('selected-disease-percentage');
	$('.not-selected-disease-percentage').css('color', '#979797');
	$('.not-selected-container').removeClass('selected-container');

	//Adds 'selected' classes
	$('#' + diseaseid + '-name').addClass('selected-disease-name');
	$('#' + diseaseid + '-chart').addClass('selected-disease-chart');
	$('#' + diseaseid + '-percentage').addClass('selected-disease-percentage');
	$('#' + diseaseid + '-percentage').css('color', '#FFFFFF');
	$('#' + diseaseid).addClass('selected-container');

	//Sets new padding and position for selected element
/*
//	var divWidth = $('#' + diseaseid + '-name').width();
//	var containerWidth = $('#' + diseaseid).width();
	$('#' + diseaseid + '-name').css('left', '-1rem');
	$('#' + diseaseid + '-name').css('padding', '1rem 1rem 0 1rem');
//	$('#' + diseaseid + '-name').css('max-width', containerWidth);
//	$('#' + diseaseid + '-name').width('100%');
*/
	
 
	
/*	//Moves arrow
	See http://stackoverflow.com/questions/5041494/manipulating-css-pseudo-elements-such-as-before-and-after-using-jquery
	if (diseaseid !== 'Autres') {
		var chartPositionLeft = $('#' + diseaseid + '-chart').offset().left;
		var chartPositionLeftAfter = chartPositionLeft + 7;
		console.log(chartPositionLeft.toString());
		$('.triangle-border').attr('data-left-before', chartPositionLeft.toString() + 'px');
		$('.triangle-border').attr('data-left-after', chartPositionLeftAfter.toString() + 'px');
//		$('<style>.triangle-border.top:before{left:"'+ chartPosition.left +'"}</style>').appendTo('head');
//		$('<style>.triangle-border.top:before{left:"'+ (chartPosition.left + 7) +'"}</style>').appendTo('head');	
	}
*/

	//Sets selected disease for data context
	Session.set('diseaseSelected', this);
	},

	'mouseenter .not-selected-disease-chart': function(e) {
		var diseaseid = this.disease.replace(/ /g,'-').replace(/'/g,'-');
		$('#' + diseaseid + '-percentage').css('color', '#FFFFFF');
		$('#' + diseaseid + '-name').addClass('selected-disease-name');
		$('#' + diseaseid).addClass('selected-container');
	},

	'mouseleave .not-selected-disease-chart': function(e) {
		var diseaseid = this.disease.replace(/ /g,'-').replace(/'/g,'-');
		if($('#' + diseaseid + '-chart').hasClass('selected-disease-chart')) {}
		else {
			$('#' + diseaseid + '-percentage').css('color', '#979797');
			$('#' + diseaseid + '-name').removeClass('selected-disease-name');
			$('#' + diseaseid).removeClass('selected-container');
		}
	},

});