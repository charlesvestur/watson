Discussions = new Mongo.Collection ('discussions');
Discussions.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Votre question : (100 caractères max.)",
    max: 100
  },
   author: {
   type: String,
   label: "Votre nom"
  },
  question: {
    type: String,
    label: "Question détaillée"
  }
  }));

