Router.configure ({
	layoutTemplate:'layout',
	loadingTemplate:'loading',
	notFoundTemplate:'notFound',
  waitOn: function() {
    return [
      Meteor.subscribe('notifications'), 
      Meteor.subscribe('diseases'),
      Meteor.subscribe('positions'),
      Meteor.subscribe('userData')
      ];
  }
});

var requireLogin = function() {
    if (! Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};

Router.onBeforeAction(requireLogin, {only: 'discussionSubmit'});






//****************************  HOME ****************************//

Router.route('/', function() {
  this.render('home');
},  {
  name: 'home'
});









//****************************  SYMPTOM CHECKER ****************************//

Router.map(function () {
  this.route('mainSymptomChecker', {
  path: '/mainSymptomChecker/:position?/:gender?',
  controller: 'SymptomCheckerController',
  template: 'mainSymptomChecker',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'symptomsDisplayedList': {to: 'symptomsDisplayedList'}
  }
  });
});

SymptomCheckerController = RouteController.extend({
  template:'symptomsDisplayedList',
  subscriptions: function() {
    this.symptomsSub = Meteor.subscribe('symptoms', {name: 1});
  },
  data: function() {    
    var positionNumber = parseInt(this.params.position,10);
    var gender = this.params.gender;
    return {
      symptoms: function() {
          return Symptoms.find({position: positionNumber, gender: {$in : ['both', gender]}}, {sort: {name: 1}});
      },
      ready: this.symptomsSub.ready,
    };
  }
});









//****************************  MAIN RESULTS ****************************//


DiscussionsListController = RouteController.extend({
  template: 'discussionsList',
  increment: 10,
  discussionsLimit: function() {
    return parseInt(this.params.discussionsLimit) || this.increment;
  },
  findOptions: function() {
    return {sort: this.sort, limit: this.discussionsLimit()};
  },
  subscriptions: function() {
    if(Session.get('symptomsSelected'))
      this.discussionsSub = Meteor.subscribe('discussions', {symptoms: Session.get('symptomsSelected').sort()}, this.findOptions());
    else
      this.discussionsSub = Meteor.subscribe('discussions', this.findOptions());
  },
  //Ci-dessus, nous utilisons simplement le hook subscriptions comme un endroit pratique pour définir notre abonnement
  discussions: function() {
    if (Session.get('hashtagsSelected')&&(Session.get('symptomsSelected')))
     return Discussions.find({symptoms: Session.get('symptomsSelected').sort(),  hashtags: { $in : Session.get('hashtagsSelected')}}, this.findOptions()); //Should be $all if we want all hashtags present
   else if (Session.get('symptomsSelected'))
    return Discussions.find({symptoms: Session.get('symptomsSelected').sort()}, this.findOptions());
  else
    return Discussions.find({}, this.findOptions());
  },
  data: function() {
    var hasMore = this.discussions().count() === this.discussionsLimit();
    //this.discussionsLimit() retourne le nombre courant d'articles que nous aimerions montrer, qui peut être la valeur dans l'URL courante, ou notre valeur par défaut (10, cf. increment) si l'URL ne contient pas de paramètre
    //this.discussions réfère au curseur courant, donc this.discussions.count() réfère au nombre d'articles qui sont actuellement dans le curseur.
    var nextPath = this.route.path({discussionsLimit: this.discussionsLimit() + this.increment});
    //nous alimentons this.route.path() avec {discussionsLimit: this.discussionsLimit() + this.increment}, nous disons à la route discussionsList de construire son propre chemin en utilisant cet objet JavaScript comme contexte de données.
//    var hashtag = this.hashtag;   
    return {
      discussions: this.discussions(),
      ready: this.discussionsSub.ready,
      //Nous passons aussi une variable ready qui se réfère à this.discussionsSub.ready comme un élément de notre contexte de données. 
      //Cela nous permettra de dire au template quand l'abonnement au post a terminé de charger.
      nextPath: hasMore ? this.nextPath() : null,
//      hashtag: hashtag
    //si nous demandons n articles et nous récupérons n, nous continuerons d'afficher le bouton “charger plus”. Mais si nous demandons n et que nous récupérons moins de n, ça voudra dire que nous avons atteint la limite et que nous voulons arrêter d'afficher ce bouton.
    };
  }
});

NewDiscussionsListController = DiscussionsListController.extend({
  sort: {submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.newDiscussions.path({discussionsLimit: this.discussionsLimit() + this.increment});
  }
});
BestDiscussionsListController = DiscussionsListController.extend({
  sort: {votesCount: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.mainResults.path({discussionsLimit: this.discussionsLimit() + this.increment});
  }
});
AnswerDiscussionsListController = DiscussionsListController.extend({
  sort: {answersCount: -1, submitted: -1, _id: -1},
  nextPath: function() {
    return Router.routes.mainResults.path({discussionsLimit: this.discussionsLimit() + this.increment});
  }
});

Router.map(function () {
  this.route('newDiscussions', { 
  path: '/mainResults/new/:discussionsLimit?', //Le ? indique que le paramètre 'discussionsLimit' est optionnel
  controller: 'NewDiscussionsListController', //La route peut porter le même nom que son controller (sans le mot "Controller") pour que ce dernier soit utilisé automatiquement par ironRouter
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionsList': {to: 'discussionsBody'}
    }
  });

  this.route('mainResults', { 
  path: '/mainResults/best/:discussionsLimit?', //Le ? indique que le paramètre 'discussionsLimit' est optionnel
  controller: 'BestDiscussionsListController', //La route peut porter le même nom que son controller (sans le mot "Controller") pour que ce dernier soit utilisé automatiquement par ironRouter
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionsList': {to: 'discussionsBody'}
    }
  });

  this.route('answerDiscussions', { 
  path: '/mainResults/answer/:discussionsLimit?', //Le ? indique que le paramètre 'discussionsLimit' est optionnel
  controller: 'AnswerDiscussionsListController', //La route peut porter le même nom que son controller (sans le mot "Controller") pour que ce dernier soit utilisé automatiquement par ironRouter
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionsList': {to: 'discussionsBody'}
    }
  });

});










//****************************  DISCUSSION PAGE ****************************//

Router.map(function () {
  this.route('discussionPage', {
  path: '/discussionPage/:_id',
  //La syntaxe spéciale :_id avec les ':' dit au routeur deux choses : 
  //premièrement, faire correspondre n'importe quelle route de la forme /discussionPage/xyz/, où “xyz” peut être n'importe quoi
  //Deuxièmement, mettre ce qu'il trouve à la place de xyz dans une propriété _id dans le tableau des params du routeur
  //On utilise _id seulement par convention ici. Le routeur n'a pas de moyen de connaitre si la chaîne de caractère passée est un ID ou aléatoire
  //Côté template:
  //Comment le routeur sait comment récupérer la partie xyz dans /discussionPage/xyz ? Après tout, nous ne lui passons aucun _id.
  //-> Iron Router est assez intelligent pour le trouver par lui-même. Nous disons au routeur d'utiliser la route discussionPage, et le routeur sait que cette route requiert un _id de ce type (vu que c'est ainsi que nous avons défini notre path).
  //Donc le routeur cherchera cet _id dans l'endroit disponible le plus logique : le data context du helper {{pathFor discussionPage}}, en d'autre mots this de discussionsItem. Et il se trouve que notre this va correspondre à l'article, lequel (surprise !) possède une propriété _id.
  //Alternativement, vous pouvez également explicitement dire au routeur où vous aimeriez qu'il cherche la propriété _id, en passant un second argument au helper (i.e. {{pathFor 'discussionPage' someOtherPost}}). Un usage pratique de ce modèle serait de récupérer le lien des articles précédents et suivants dans une liste, par exemple.
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionPage': {to: 'discussionsBody'},
    'answersList': {to: 'discussionPageBody'}
    },
  waitOn: function() {
    return [
      Meteor.subscribe('singleDiscussion', this.params._id),
      Meteor.subscribe('answers', this.params._id),
      Meteor.subscribe('comments', this.params._id)
    ];
  },
  //le routeur connaît l'_id de l'article que nous voulons afficher, mais le template n'a toujours pas d'indice. On transmet donc le data context
  data: function() {
  return Discussions.findOne({_id: this.params._id});
  //A l'intérieur de la fonction data d'une route, "this" correspond à la route courante correspondante, et nous pouvons utiliser this.params pour accéder aux parties nommées de la route (que nous avons indiqué en les préfixant avec : dans notre chemin).
  }
  });
/*
  this.route('answerSubmit', {
  path: '/discussionPage/:_id/answerSubmit',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionPage': {to: 'discussionsBody'},
    'answerSubmit': {to: 'discussionPageBody'},
    'answersList': {to: 'discussionPageSubBody'},
    },
    waitOn: function() {
      return Meteor.subscribe('singleDiscussion', this.params._id);
    },
    data: function() {
      return Discussions.findOne({_id: this.params._id});
  }
  });
*/
});












//****************************  DISCUSSION SUBMIT AND EDIT ****************************//


Router.map(function () {
  this.route('discussionSubmit', {
  path: '/discussionSubmit',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionSubmit': {to: 'discussionsBody'}
    }
  });

  this.route('discussionEdit', {
  path: '/discussionEdit/:_id',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionPage': {to: 'discussionsBody'},
    'discussionEdit': {to: 'discussionPageBody'}
    },
  waitOn: function() {
    return Meteor.subscribe('singleDiscussion', this.params._id);
  },
  data: function() {
    return Discussions.findOne({_id: this.params._id});
  }
  });
});













//****************************  MY HEALTH SPACE ****************************//


myDiscussionsFollowedController = RouteController.extend({
  template: 'myDiscussionsFollowed',
  subscriptions: function() {
    this.discussionsFollowedSub = Meteor.subscribe('discussions', {_id: { $in : Meteor.user().discussionsFollowed}});
  },
  data: function(){  
      return {
        ready: this.discussionsFollowedSub.ready
      };
  }
});



Router.map(function() {
  this.route('myInformation', {
  path: '/mainMyHealth/myInformation',
  template:'mainMyHealth',
  yieldTemplates: {
    'myInformation': {to: 'body'}
  }
  });

  this.route('myHealthRecord', {
    path: '/mainMyHealth/myHealthRecord',
    template:'mainMyHealth',
    yieldTemplates: {
      'myHealthRecord': {to: 'body'}
    }
  });

  this.route('myDiscussionsFollowed', {
  path: '/mainMyHealth/myDiscussionsFollowed',
  template:'mainMyHealth',
  controller: 'myDiscussionsFollowedController',
  yieldTemplates: {
    'myDiscussionsFollowed': {to: 'body'}
  },
  });

  this.route('myContributions', {
  path: '/mainMyHealth/myContributions',
  template:'mainMyHealth',
  yieldTemplates: {
    'myContributions': {to: 'body'}
  }
  });
});


