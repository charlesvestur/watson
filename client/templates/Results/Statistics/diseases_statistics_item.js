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
//	var windowWidthPercentage = windowWidth/windowidth;
//	var windowHeight =$(window).height();
	var x = Template.currentData().coeff;
	var disease = Template.currentData().disease.replace(/ /g,'-').replace(/'/g,'-');
	$('#' + disease).css({'width': windowWidth*x + '%'});
	var windowWidth2 = ((parseInt($(window).width())) / 2) - 120;
});