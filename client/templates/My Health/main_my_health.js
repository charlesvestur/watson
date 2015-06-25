/*
#D8D8D8 : GRIS
#FFFFFF : BLANC
#D0011B : ROUGE
#4990E2 : BLEU
*/

Template.mainMyHealth.helpers({
    myInformationBlue: function(){
        if(Router.current().route.getName() === 'myInformation')
            return '#4990E2';
        else
            return '#D8D8D8';
    },

    myInformationRed: function(){
        if(Router.current().route.getName() === 'myInformation')
            return '#D0011B';
        else
            return '#D8D8D8';
    },

    myHealthRecordBlue: function(){
        if(Router.current().route.getName() === 'myHealthRecord')
            return '#4990E2';
        else
            return '#D8D8D8';
    },

    myHealthRecordRed: function(){
        if(Router.current().route.getName() === 'myHealthRecord')
            return '#D0011B';
        else
            return '#D8D8D8';
    },

    myDiscussionsFollowedBlue: function(){
        if(Router.current().route.getName() === 'myDiscussionsFollowed')
            return '#4990E2';
        else
            return '#D8D8D8';
    },

    myDiscussionsFollowedRed: function(){
        if(Router.current().route.getName() === 'myDiscussionsFollowed')
            return '#D0011B';
        else
            return '#D8D8D8';
    },

    myContributionsBlue: function(){
        if(Router.current().route.getName() === 'myContributions')
            return '#4990E2';
        else
            return '#D8D8D8';
    },

    myContributionsRed: function(){
        if(Router.current().route.getName() === 'myContributions')
            return '#D0011B';
        else
            return '#D8D8D8';
    },

});