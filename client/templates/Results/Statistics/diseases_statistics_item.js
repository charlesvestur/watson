Template.diseasesStatisticsItem.helpers({
	percentage: function() {
		var percent = this.coeff*100;
		return (percent + '%');
	},
	diseaseId: function() {
		var disease_to_s_attached = this.disease.replace(/ /g,'-').replace(/'/g,'-');
		return disease_to_s_attached;
	}
});

Template.diseasesStatisticsItem.onRendered(function() {
	var windowWidth = 100;
	var x = Template.currentData().coeff;
	var disease = Template.currentData().disease.replace(/ /g,'-').replace(/'/g,'-');
	$('#' + disease).css({'width': windowWidth*x + '%'});
//	var windowWidth2 = ((parseInt($(window).width())) / 2) - 120;
});

Template.diseasesStatisticsItem.events ({
	'click .container-disease-chart': function(e) {
	diseaseid = this.disease.replace(/ /g,'-').replace(/'/g,'-');
	$('.not-selected-disease-name').removeClass('selected-disease-name');
	$('.not-selected-disease-chart').removeClass('selected-disease-chart');
	$('.not-selected-disease-percentage').removeClass('selected-disease-percentage');
	$('#' + diseaseid + '-name').addClass('selected-disease-name');
	$('#' + diseaseid + '-chart').addClass('selected-disease-chart');
	$('#' + diseaseid + '-percentage').addClass('selected-disease-percentage');
	Session.set('diseaseSelected', this);
	}
});