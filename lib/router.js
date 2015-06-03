Router.configure ({
	layoutTemplate:'layout',
	loadingTemplate:'loading',
	notFoundTemplate:'notFound',
  waitOn: function() {
    Meteor.subscribe('notifications');
  }
});

Router.route('/', function() {
	this.render('home');
},	{
	name: 'home'
});

Router.route('/mainSymptomChecker', function() {
	this.render('mainSymptomChecker');
},	{name: 'mainSymptomChecker'}
);


Router.route('/mainMyHealth', function() {
  this.render('mainMyHealth');
},  {name: 'mainMyHealth'}
);

Router.map(function () {
  this.route('discussionSubmit', {
  path: '/discussionSubmit',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionSubmit': {to: 'discussionsBody'}
    }
  });
});

Router.map(function () {
  this.route('discussionEdit', {
  path: '/discussionEdit/:_id',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionPage': {to: 'discussionsBody'},
    'discussionEdit': {to: 'discussionPageBody'}
    },
    data: function() {
    return Discussions.findOne({_id: this.params._id});
  }
  });
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

Router.map(function () {
  this.route('mainResults', {
  path: '/mainResults',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionsList': {to: 'discussionsBody'}
    },
  waitOn: function(){
  return Meteor.subscribe('discussions');
  }
  });
});

Router.map(function () {
  this.route('discussionPage', {
  path: '/discussionPage/:_id',
  //La syntaxe spéciale :_id dit au routeur deux choses : 
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
    return [Meteor.subscribe('answers', this.params._id), Meteor.subscribe('comments', this.params._id)];
  },
  //le routeur connaît l'_id de l'article que nous voulons afficher, mais le template n'a toujours pas d'indice. On transmet donc le data context
  data: function() {
  return Discussions.findOne({_id: this.params._id});
  //A l'intérieur de la fonction data d'une route, this correspond à la route courante correspondante, et nous pouvons utiliser this.params pour accéder aux parties nommées de la route (que nous avons indiqué en les préfixant avec : dans notre chemin).
  }
  });
});

Router.map(function () {
  this.route('answerSubmit', {
  path: '/discussionPage/:_id/answerSubmit',
  template: 'mainResults',
  yieldTemplates: {
    'mainSubnavbar': {to: 'subnavbar'},
    'discussionPage': {to: 'discussionsBody'},
    'answerSubmit': {to: 'discussionPageBody'},
    'answersList': {to: 'discussionPageSubBody'},
    },
    data: function() {
    return Discussions.findOne({_id: this.params._id});
  }
  });
});




