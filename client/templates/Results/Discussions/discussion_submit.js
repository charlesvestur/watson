Template.discussionSubmit.events({

    'click .symptoms-category': function(e) {
        categoryStatus = 'symptoms',
        $('.symptoms-category').toggleClass('color-categories')
    //length permet de tester l'existence
        if($('.svg-symptoms-category-not-selected').length) {
            $('.svg-symptoms-category-not-selected').attr('class','svg-symptoms-category-selected')
            }
        else if ($('.svg-symptoms-category-selected').length){
            $('.svg-symptoms-category-selected').attr('class','svg-symptoms-category-not-selected')
            }
        else {};

        if ($('.consultation-category').hasClass('color-categories')) {
            $('.consultation-category').toggleClass('color-categories')
            $('.svg-consultation-category-selected').attr('class','svg-consultation-category-not-selected')
        }
        else if ($('.treatment-category').hasClass('color-categories')) {
                $('.treatment-category').toggleClass('color-categories')
                $('.svg-treatment-category-selected').attr('class','svg-treatment-category-not-selected')
        }   
        else if ($('.convalescence-category').hasClass('color-categories')) {
            $('.convalescence-category').toggleClass('color-categories')
            $('.svg-convalescence-category-selected').attr('class','svg-convalescence-category-not-selected')
        }
        else {};       
        },

    'click .consultation-category': function(e) {
        categoryStatus = 'consultation',
        $('.consultation-category').toggleClass('color-categories')
    //length permet de tester l'existence
        if($('.svg-consultation-category-not-selected').length) {
            $('.svg-consultation-category-not-selected').attr('class','svg-consultation-category-selected')
            }
        else if ($('.svg-consultation-category-selected').length){
            $('.svg-consultation-category-selected').attr('class','svg-consultation-category-not-selected')
            }
        else {};

        if ($('.symptoms-category').hasClass('color-categories')) {
            $('.symptoms-category').toggleClass('color-categories')
            $('.svg-symptoms-category-selected').attr('class','svg-symptoms-category-not-selected')
        }
        else if ($('.treatment-category').hasClass('color-categories')) {
                $('.treatment-category').toggleClass('color-categories')
                $('.svg-treatment-category-selected').attr('class','svg-treatment-category-not-selected')
        }
        else if ($('.convalescence-category').hasClass('color-categories')) {
            $('.convalescence-category').toggleClass('color-categories')
            $('.svg-convalescence-category-selected').attr('class','svg-convalescence-category-not-selected')
        }
        else {}
        },

    'click .treatment-category': function(e) {
        categoryStatus = 'treatment',
        $('.treatment-category').toggleClass('color-categories')
        if($('.svg-treatment-category-not-selected').length) {
            $('.svg-treatment-category-not-selected').attr('class','svg-treatment-category-selected')
            }
        else if ($('.svg-treatment-category-selected').length){
            $('.svg-treatment-category-selected').attr('class','svg-treatment-category-not-selected')
            }
        else {};

        if ($('.symptoms-category').hasClass('color-categories')) {
            $('.symptoms-category').toggleClass('color-categories')
            $('.svg-symptoms-category-selected').attr('class','svg-symptoms-category-not-selected')
        }
        else if ($('.consultation-category').hasClass('color-categories')) {
                $('.consultation-category').toggleClass('color-categories')
                $('.svg-consultation-category-selected').attr('class','svg-consultation-category-not-selected')
        }
        else if ($('.convalescence-category').hasClass('color-categories')) {
            $('.convalescence-category').toggleClass('color-categories')
            $('.svg-convalescence-category-selected').attr('class','svg-convalescence-category-not-selected')
        }
        else {}
        },

    'click .convalescence-category': function(e) {
        categoryStatus = 'convalescence',
        $('.convalescence-category').toggleClass('color-categories')
        if($('.svg-convalescence-category-not-selected').length) {
            $('.svg-convalescence-category-not-selected').attr('class','svg-convalescence-category-selected')
            }
        else if ($('.svg-convalescence-category-selected').length){
            $('.svg-convalescence-category-selected').attr('class','svg-convalescence-category-not-selected')
            }
        else {};
        
        if ($('.symptoms-category').hasClass('color-categories')) {
            $('.symptoms-category').toggleClass('color-categories')
            $('.svg-symptoms-category-selected').attr('class','svg-symptoms-category-not-selected')
        }
        else if ($('.consultation-category').hasClass('color-categories')) {
                $('.consultation-category').toggleClass('color-categories')
                $('.svg-consultation-category-selected').attr('class','svg-consultation-category-not-selected')
        }
        else if ($('.treatment-category').hasClass('color-categories')) {
                $('.treatment-category').toggleClass('color-categories')
                $('.svg-treatment-category-selected').attr('class','svg-treatment-category-not-selected')
        }
        else {}
        },

    //To insert implied attributes ("author", "submitted", ...)
    //-> First, we create the object 'discussion' when the users submits the form with the attributes he filled in
    'submit form': function(e) {
	    e.preventDefault();
	    var discussion = {
	        title: $(e.target).find('[name=title]').val(),
	        question: $(e.target).find('[name=question]').val(),
            category: categoryStatus
	    };


//We apply our discussionInsert function to the object 'discussion'
		Meteor.call('discussionInsert', discussion, function(error, result) {
		    // affiche l'erreur à l'utilisateur et s'interrompt
		    if (error)
		        return alert(error.reason);
		    Router.go('mainResults', {_id: result._id});
		});
	}
});


/* We can also add the various implied attributes ("author", "submitted", ...) in the database with the following hook:

AutoForm.hooks({        
        discussionSubmit: {
            before: {
                insert: function(doc) {
                    doc.submitted = new Date;
                    doc.upvote = 0;
                    this.result(doc);
                }
            }
        }            
    });*/



/*Template.mainResults.helpers({
    discussionsList : function () {
         return Session.equals("discussionsList", "discussionsList")  
    },
    discussionSubmit : function () {
         return Session.equals("discussionSubmit", "discussionSubmit")  
    }
 });*/
