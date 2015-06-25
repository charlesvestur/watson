Template.discussionSubmit.onRendered(function(){
    if(Session.get('symptomsSelected')) {}
    else {
        symptomsSelected = [];
        Session.setAuth('symptomsSelected', symptomsSelected);
    }
});

AutoForm.hooks({    
    discussionSubmit: {
      before: {
        insert: function(doc) {
          doc.userId = Meteor.userId();
          doc.author = Meteor.users.findOne({_id: Meteor.userId()}).username;
          doc.category = categoryStatus;
          doc.symptoms = Session.get('symptomsSelected').sort();
          doc.submitted = new Date();
          doc.answersCount = 0;
          doc.votesCount = 0;
          doc.followedby = [];
          this.result(doc);
        }
      } 
    }     
  });

Template.discussionSubmit.events({

    //To insert implied attributes ("author", "submitted", ...)  
    'submit form': function(e) {
/*        e.preventDefault();
    //-> First, we create the object 'discussion' when the users submits the form with the attributes he filled in
        var discussion = {
            title: $(e.target).find('[name=title]').val(),
            question: $(e.target).find('[name=question]').val(),
            diagnosis: $(e.target).find('[name=diagnosis]').val(),
            hashtags: $(e.target).find('[name=hashtags]').val(),
            category: categoryStatus,
            symptoms: Session.get('symptomsSelected').sort()
        };


    //Then, we apply our discussionInsert function to the object 'discussion'
        Meteor.call('discussionInsert', discussion, function(error, result) {
        // affiche l'erreur à l'utilisateur et s'interrompt
        if (error)
            return alert(error.reason);
        });
*/        Router.go('mainResults');
    },

    'click .symptoms-category': function(e) {
        categoryStatus = 'Symptômes';
        $('.symptoms-category').toggleClass('color-categories');
        //length permet de tester l'existence
        if($('.svg-symptoms-category-not-selected').length) {
            $('.svg-symptoms-category-not-selected').attr('class','svg-symptoms-category-selected');
            }
        else if ($('.svg-symptoms-category-selected').length){
            $('.svg-symptoms-category-selected').attr('class','svg-symptoms-category-not-selected');
            }
        else {}

        if ($('.consultation-category').hasClass('color-categories')) {
            $('.consultation-category').toggleClass('color-categories');
            $('.svg-consultation-category-selected').attr('class','svg-consultation-category-not-selected');
        }
        else if ($('.treatment-category').hasClass('color-categories')) {
                $('.treatment-category').toggleClass('color-categories');
                $('.svg-treatment-category-selected').attr('class','svg-treatment-category-not-selected');
        }   
        else if ($('.convalescence-category').hasClass('color-categories')) {
            $('.convalescence-category').toggleClass('color-categories');
            $('.svg-convalescence-category-selected').attr('class','svg-convalescence-category-not-selected');
        }
        else {}      
        },

    'click .consultation-category': function(e) {
        categoryStatus = 'Consultation';
        $('.consultation-category').toggleClass('color-categories');
         //length permet de tester l'existence
        if($('.svg-consultation-category-not-selected').length) {
            $('.svg-consultation-category-not-selected').attr('class','svg-consultation-category-selected');
            }
        else if ($('.svg-consultation-category-selected').length){
            $('.svg-consultation-category-selected').attr('class','svg-consultation-category-not-selected');
            }
        else {}

        if ($('.symptoms-category').hasClass('color-categories')) {
            $('.symptoms-category').toggleClass('color-categories');
            $('.svg-symptoms-category-selected').attr('class','svg-symptoms-category-not-selected');
        }
        else if ($('.treatment-category').hasClass('color-categories')) {
                $('.treatment-category').toggleClass('color-categories');
                $('.svg-treatment-category-selected').attr('class','svg-treatment-category-not-selected');
        }
        else if ($('.convalescence-category').hasClass('color-categories')) {
            $('.convalescence-category').toggleClass('color-categories');
            $('.svg-convalescence-category-selected').attr('class','svg-convalescence-category-not-selected');
        }
        else {}
        },

    'click .treatment-category': function(e) {
        categoryStatus = 'Traitement';
        $('.treatment-category').toggleClass('color-categories');
        if($('.svg-treatment-category-not-selected').length) {
            $('.svg-treatment-category-not-selected').attr('class','svg-treatment-category-selected');
            }
        else if ($('.svg-treatment-category-selected').length){
            $('.svg-treatment-category-selected').attr('class','svg-treatment-category-not-selected');
            }
        else {}

        if ($('.symptoms-category').hasClass('color-categories')) {
            $('.symptoms-category').toggleClass('color-categories');
            $('.svg-symptoms-category-selected').attr('class','svg-symptoms-category-not-selected');
        }
        else if ($('.consultation-category').hasClass('color-categories')) {
                $('.consultation-category').toggleClass('color-categories');
                $('.svg-consultation-category-selected').attr('class','svg-consultation-category-not-selected');
        }
        else if ($('.convalescence-category').hasClass('color-categories')) {
            $('.convalescence-category').toggleClass('color-categories');
            $('.svg-convalescence-category-selected').attr('class','svg-convalescence-category-not-selected');
        }
        else {}
        },

    'click .convalescence-category': function(e) {
        categoryStatus = 'Convalescence';
        $('.convalescence-category').toggleClass('color-categories');
        if($('.svg-convalescence-category-not-selected').length) {
            $('.svg-convalescence-category-not-selected').attr('class','svg-convalescence-category-selected');
            }
        else if ($('.svg-convalescence-category-selected').length){
            $('.svg-convalescence-category-selected').attr('class','svg-convalescence-category-not-selected');
            }
        else {}
        
        if ($('.symptoms-category').hasClass('color-categories')) {
            $('.symptoms-category').toggleClass('color-categories');
            $('.svg-symptoms-category-selected').attr('class','svg-symptoms-category-not-selected');
        }
        else if ($('.consultation-category').hasClass('color-categories')) {
                $('.consultation-category').toggleClass('color-categories');
                $('.svg-consultation-category-selected').attr('class','svg-consultation-category-not-selected');
        }
        else if ($('.treatment-category').hasClass('color-categories')) {
                $('.treatment-category').toggleClass('color-categories');
                $('.svg-treatment-category-selected').attr('class','svg-treatment-category-not-selected');
        }
        else {}
        }

});

