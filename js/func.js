/******************************************
	frontEnd javascript functions
******************************************/


$(document).ready(function() {

	actions.default();
	actions.events();

});

/**
 * global variables
 * @type {Object}
 */
var global = {
    
    domain : './'
    
};

/**
 * manages pages & events
 * @type {Object}
 */
var actions = {

	default : function(){

		var path = location.href.split('/').last();
		
		switch(path){
			case 'page.php':
                data.page();
				break;
			default :
                data.page2(path);
				break;
		}
	},

	events : function(){

		$(document).on('click','.item',function(event) {

			location.href = './page2.php#' + $(this).parents('.thumbnail').attr('id');

		});

        $(document).on('click','.submitEr', function(){

            $('#resultsModal').modal({
                backdrop: 'static',
                keyboard: false
            });

        });
        $('#resultsModal').on('shown.bs.modal', function(e) {

            data.results();

        });
        $(document).on('click','.closeResult', function(){
            
            location.href = './page.php';

        });
        $(function () {

            $('[data-toggle="tooltip"]').tooltip();

        });

	}

};

/**
 * manages all data in the 2 pages
 * @type {Object}
 */
var data = {

    /**
     * loads data for page.php
     */
    page : function(){

        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getAllErotimatologia'
            },
            success: function(json) {
                
                json = $.grep(json, function(n){
                    return n.er_active == 1;
                });

                var tappend = '';
                
                $.each(json,function(key,value){

                    tappend += '<div class="col-md-3 col-sm-6 hero-feature"><div id="'+value.er_id+'" class="thumbnail">'+
                                '<img src="./uploads/'+value.er_image+'" class="img-responsive img-rounded" /><div class="caption">'+
                                '<h3>'+value.er_title+'</h3><p>'+value.er_description+'</p>'+
                                '<p><a class="btn btn-primary item">Answer</a></p></div></div></div>';

                });

                $('#AllErot').html(tappend);
                                
            },
            error: function(err){
                console.log('404 Page !',err);
            }
        });

    },

    /**
     * loads Data for identified QuestionR
     * @param  {string} path id of questionaire in url
     * @return {}
     */
    page2 : function(path){

        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getData1st',
                id : path.split('#')[1]
            },
            success: function(json) {
                
                var categories = '<li class="sidebar-brand"><a href="./page.php">' + json[0].er_title + '</a><p>' + json[0].er_description + '</p></li><hr>';
                var questions = '';

                $.each(json,function(key,value){
                    
                    categories += '<li><a data-toggle="pill" href="#cat_' + value.cat_id + '">' + value.cat_title + '</a></li>';
                    questions += '<div id="cat_'+value.cat_id+'" class="tab-pane fade catVal">' +
                                '<div class="row"><div class="col-lg-4"><img class="img-responsive img-rounded" src="uploads/'+value.cat_image+'" /></div>' +
                                '<div class="col-lg-8"><h1>' + value.cat_title + '</h1><p>' + value.cat_description + '</p></div></div><hr />';

                    $.ajax({
                        dataType: 'JSON',
                        async: false,
                        type: 'GET',
                        url: global.domain,
                        data: {
                            do : 'getData2nd',
                            id : value.cat_id
                        },
                        success: function(json2){

                            $.each(json2, function(k,v){
                                
                                questions += '<div id="q_'+v.q_id+'" class="row q-'+value.cat_id+'" data-toggle="tooltip" data-placement="top" title="'+v.q_helptext+'"><div class="col-lg-12 text-center">' +
                                            '<h2>Question '+(k+1)+'</h2><p><b>'+v.q_question+'</b></p><br />' +
                                            '<form class="form-inline" role="form"><div class="form-group">';

                                $.ajax({
                                    dataType: 'JSON',
                                    async: false,
                                    type: 'GET',
                                    url: global.domain,
                                    data: {
                                        do : 'getData3rd',
                                        id : v.q_id
                                    },
                                    success: function(json3){

                                        $.each(json3, function(i,j) {

                                            if (v.q_type == 2) {
                                                questions += '<label class="radio-inline"><input id="ans_'+j.ans_id+'" class="ans-'+v.q_id+'" type="radio" name="optradio'+k+'" value="'+j.ans_weight+'">'+j.ans_text+'</label>';
                                            } else{
                                                questions += '<label class="checkbox-inline"><input id="ans_'+j.ans_id+'" class="ans-'+v.q_id+'" type="checkbox" value="'+j.ans_weight+'">'+j.ans_text+'</label>';
                                            };
                                            
                                        });

                                    }
                                });

                                

                                questions +=  '</div></form></div></div><br /><br /><br />';

                            });

                        }
                    });

                    questions += '<hr /></div>';

                });

                categories += '<hr><li><button type="button" class="btn btn-danger btn-block submitEr">Send answers</button></li>';

                $('.sidebar-nav').html(categories);
                $('.sidebar-nav li:nth-child(3)').addClass('active');
                $('.tab-content').html(questions);
                $('.tab-content div').first().addClass('active in');
                
            }
        });

    },

    /**
     * calculate results for the specific answers & shows them in modal window
     * @return {} 
     */
    results : function(){

        var valid = 0;
        var storedReply = [];
        var erPoints = 0;
        var result = '<div class="modal-header"><button type="button" class="close closeResult" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<h4 class="modal-title text-center">Results</h4></div><div class="modal-body">';

        $('.catVal').each(function(i,j){
            
            var catPoints = 0;
            var cat = $(this).attr('id').split('_')[1];

            $('.q-'+cat).each(function(k,v){
                valid = 0;
                var question = $(this).attr('id').split('_')[1];

                $('.ans-'+question).each(function(l,m){
                    if ($(this).is(":checked")) {
                        valid = 1;
                        var answer = $(this).attr('id').split('_')[1];
                        catPoints += parseInt($(this).attr('value'));
                        storedReply.push({q : question, a : answer});
                    }
                });
                
                if (valid == 0) { return false; };
            });

            if (valid == 0) { return false; };

            erPoints += catPoints;

            $.ajax({
                dataType: 'JSON',
                async: false,
                type:'GET',
                url: global.domain,
                data : {
                    do : 'getResultsByCat',
                    points : catPoints,
                    category : cat
                },
                success: function(res1) {
                    
                    res1 = res1[0];
                    result += '<div class="row"><div class="col-md-2 text-center"><b>' + res1.cat_title + ':</b></div>' +
                            '<div class="col-md-3 text-center"><img src="uploads/' + res1.cr_image + '" class="img-responsive img-thumbnail img-rounded" style="max-height: 60px;"></div>' +
                            '<div class="col-md-7 text-center"><p>' + res1.cr_text + '</p></div></div><hr>';

                }
            });
            
        });

        if (valid == 1) {
            $.ajax({
                dataType: 'JSON',
                async: false,
                type:'GET',
                url: global.domain,
                data : {
                    do : 'getResultsByEr',
                    points : erPoints,
                    erot : location.href.split('/').last().split('#')[1]
                },
                success: function(res2) {
                    
                    res2 = res2[0];
                    result += '<div class="row"><div class="col-md-12 text-center"><h3>' + res2.er_title + '</h3></div>' +
                                '<div class="col-md-12 text-center"><img src="uploads/' + res2.err_image + '" class="img-responsive img-thumbnail img-rounded" style="max-height: 120px;"></div>' +
                                '<div class="col-md-12 text-center"><p>' + res2.err_text + '</p></div></div></div>' +
                                '<div class="modal-footer"><button type="button" class="btn btn-default closeResult">Exit</button></div>';
                    $('.modal-content').html(result);
                    
                    $.each(storedReply, function(index,obj){$.ajax({dataType:'JSON',async:false,type:'POST',url:global.domain,data:{do:'insertStoredReply',question:obj.q,answer:obj.a}});});

                }
            });
        } else {
            alert('You must answer all questions');
            $('#resultsModal').modal('hide');
        };

    }

}

/**
 * the last element of a splited string
 * @param  {[string]} !Array.prototype.last the string
 * @return {string}  the last element
 */
if (!Array.prototype.last){
    Array.prototype.last = function(){
        return this[this.length - 1];
    };
};

