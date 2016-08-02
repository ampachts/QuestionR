/******************************************
    BackOffice javascript functions
******************************************/

$(document).ready(function(){

    actions.default();
    actions.formActions();
    load.index();
    
});

/**
 * global variablesκ
 * @type {Object}
 */
var global = {
    
    domain : '../',
    er_id : 0,
    cat_id : 0,
    q_id : 0,
    users : [],
    editor : false,
    
};

/**
 * manages pages & events
 * @type {Object}
 */
var actions = {
    
    default : function(){
            
            $(document).on('click','a',function(){
                
                $('a.active').removeClass('active');
                $(this).addClass('active');
                switch($(this).attr('href')){
                    
                    case 'login.html':
                        load.logout();
                        break;
                    case 'index.php':
                        break;
                    case 'erotimatologia.html':
                        load.page('erotimatologia.html',function(){erotimatologia.getErotimatologia();});
                        return false;
                        break;
                    case 'form1.html':
                        load.page('form1.html');
                        return false;
                        break;
                    case 'categories.html':
                        load.page('categories.html',function(){categories.getAllCategories(global.er_id);});
                        return false;
                        break;
                    case 'form2.html':
                        load.page('form2.html');
                        return false;
                        break;
                    case 'questions.html':
                        load.page('questions.html',function(){questions.getAllQuestions(global.cat_id);});
                        return false;
                        break;
                    case 'form3.html':
                        load.page('form3.html');
                        return false;
                        break;
                    case 'answers.html':
                        load.page('answers.html',function(){answers.getAllAnswers(global.q_id);});
                        return false;
                        break;
                    case 'form4.html':
                        load.page('form4.html');
                        return false;
                        break;
                    case 'catresults.html':
                        load.page('catresults.html',function(){catres.getAllCatRes(global.cat_id);});
                        return false;
                        break;
                    case 'form5.html':
                        load.page('form5.html');
                        return false;
                        break;
                    case 'erresults.html':
                        load.page('erresults.html',function(){erres.getAllErRes(global.er_id);});
                        return false;
                        break;
                    case 'form6.html':
                        load.page('form6.html');
                        return false;
                        break;
                    case 'users.html':
                        load.page('users.html', function(){users.getAllUsers();});
                        return false;
                        break;
                    case 'form7.html':
                        load.page('form7.html');
                        return false;
                        break;
                    default:
                        return false;
                        break;
                    
                }
                
            });      
    },
    
    formActions : function(){

    //        questionaires
        $(document).on('click','.deleteErotimatologio',function(){
            if(confirm("Are you sure you want to delete this questionaire?")){
                erotimatologia.deleteErotimatologio($(this).parents('tr').attr('key'),$(this).parents('tr').attr('img'));
            }
        });
        $(document).on('click','.editErotimatologio',function(){
            load.editErotimatologio($(this).parents('tr').attr('key'));
        });
        $(document).on('click','.insertNewErotimatologio',function(){
            erotimatologia.insertErotimatologio();
            return false;
        });
        $(document).on('click','.updateErotimatologio',function(){
            erotimatologia.updateErotimatologio($('h1.page-header').attr('id'));
            return false;
        });
        $(document).on('click','.cancelErotimatologioEdit',function(){
            $('a[href="erotimatologia.html"]').trigger('click');
        });
        $(document).on('click','.listCategories', function(){
            global.er_id = $(this).parents('tr').attr('key');
            load.page('categories.html', function(){
                categories.getAllCategories(global.er_id);
            })
        });
        $(document).on('click','.listErRes', function(){
            global.er_id = $(this).parents('tr').attr('key');
            load.page('erresults.html', function(){
                erres.getAllErRes(global.er_id);
            })
        });

    //        categories
        $(document).on('click','.deleteCategory',function(){
            if(confirm("Are you sure you want to delete this category?")){
                categories.deleteCategory($(this).parents('tr').attr('key'),$(this).parents('tr').attr('img'));
            }
        });
        $(document).on('click','.editCategory',function(){
            load.editCategory($(this).parents('tr').attr('key'));
        });
        $(document).on('click','.insertNewCategory',function(){
            categories.insertCategory();
            return false;
        });
        $(document).on('click','.updateCategory',function(){
            categories.updateCategory($('h1.page-header').attr('id'));
            return false;
        });
        $(document).on('click','.cancelCategoryEdit',function(){
            load.page('categories.html', function(){
                categories.getAllCategories(global.er_id);
            })
        });
        $(document).on('click','.listQuestions', function(){
            global.cat_id = $(this).parents('tr').attr('key');
            load.page('questions.html', function(){
                questions.getAllQuestions(global.cat_id);
            })
        });
        $(document).on('click','.listCatRes', function(){
            global.cat_id = $(this).parents('tr').attr('key');
            load.page('catresults.html', function(){
                catres.getAllCatRes(global.cat_id);
            })
        });
        
    //        questions
        $(document).on('click','.deleteQuestion',function(){
            if(confirm("Are you sure you want to delete this question?")){
                questions.deleteQuestion($(this).parents('tr').attr('key'));
            }
        });
        $(document).on('click','.editQuestion',function(){
            load.editQuestion($(this).parents('tr').attr('key'));
        });
        $(document).on('click','.insertNewQuestion',function(){
            questions.insertQuestion();
            return false;
        });
        $(document).on('click','.updateQuestion',function(){
            questions.updateQuestion($('h1.page-header').attr('id'));
            return false;
        });
        $(document).on('click','.cancelQuestionEdit',function(){
            load.page('questions.html', function(){
                questions.getAllQuestions(global.cat_id);
            })
        });
        $(document).on('click','.listAnswers', function(){
            global.q_id = $(this).parents('tr').attr('key');
            load.page('answers.html', function(){
                answers.getAllAnswers(global.q_id);
            })
        });

    //        answers
        $(document).on('click','.deleteAnswer',function(){
            if(confirm("Are you sure you want to delete this answer?")){
                answers.deleteAnswer($(this).parents('tr').attr('key'));
            }
        });
        $(document).on('click','.editAnswer',function(){
            load.editAnswer($(this).parents('tr').attr('key'));
        });
        $(document).on('click','.insertNewAnswer',function(){
            answers.insertAnswer();
            return false;
        });
        $(document).on('click','.updateAnswer',function(){
            answers.updateAnswer($('h1.page-header').attr('id'));
            return false;
        });
        $(document).on('click','.cancelAnswerEdit',function(){
            load.page('answers.html', function(){
                answers.getAllAnswers(global.q_id);
            })
        });

    //        category results
        $(document).on('click','.deleteCatRes',function(){
            if(confirm("Are you sure you want to delete this result?")){
                catres.deleteCatRes($(this).parents('tr').attr('key'),$(this).parents('tr').attr('img'));
            }
        });
        $(document).on('click','.editCatRes',function(){
            load.editCatRes($(this).parents('tr').attr('key'));
        });
        $(document).on('click','.insertNewCatRes',function(){
            catres.insertCatRes();
            return false;
        });
        $(document).on('click','.updateCatRes',function(){
            catres.updateCatRes($('h1.page-header').attr('id'));
            return false;
        });
        $(document).on('click','.cancelCatResEdit',function(){
            load.page('catresults.html', function(){
                catres.getAllCatRes(global.cat_id);
            })
        });

    //        questionaire results
        $(document).on('click','.deleteErRes',function(){
            if(confirm("Are you sure you want to delete this result?")){
                erres.deleteErRes($(this).parents('tr').attr('key'),$(this).parents('tr').attr('img'));
            }
        });
        $(document).on('click','.editErRes',function(){
            load.editErRes($(this).parents('tr').attr('key'));
        });
        $(document).on('click','.insertNewErRes',function(){
            erres.insertErRes();
            return false;
        });
        $(document).on('click','.updateErRes',function(){
            erres.updateErRes($('h1.page-header').attr('id'));
            return false;
        });
        $(document).on('click','.cancelErResEdit',function(){
            load.page('erresults.html', function(){
                erres.getAllErRes(global.er_id);
            })
        });
        
    //        users
        $(document).on('click','.adminLogin', function(){
            load.admin();
        });
        $(document).on('click','.deleteUser',function(){
            if(confirm("Are you sure you want to delete this user?")){
                users.deleteUser($(this).parents('tr').attr('key'));
            }
        });
        $(document).on('click','.editUser',function(){
            load.editUser($(this).parents('tr').attr('key'));
        });
        $(document).on('click','.insertNewUser',function(){
            users.insertUser();
            return false;
        });
        $(document).on('click','.updateUser',function(){
            users.updateUser($('h1.page-header').attr('id'));
            return false;
        });
        $(document).on('click','.cancelUserEdit',function(){
            $('a[href="users.html"]').trigger('click');
        });
        
    }
    
};

/**
 * loads requested pages
 * @type {Object}
 */
var load = {
    
    admin : function(){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'adminLogin',
                email : $('#adminMail').val(),
                pass : $('#adminPass').val()
            },
            success: function(admin) {

                if(admin.length != 0){
                    admin = admin[0];
                    if(admin.user_email == $('#adminMail').val() && admin.user_password == $('#adminPass').val()){
                        window.location.href = './index.php';
                    }else
                        alert('invalid username/password !');
                }else
                    alert('invalid username/password !');
                
            }
            
        });
        
    },
    logout : function(){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'logout'
            }
        });
        
    },
    index : function(){

        var loc = location.pathname.split('/');
        if(loc[loc.length -1] != 'login.html'){
            
            $.ajax({
                dataType: 'JSON',
                async: false,
                type: 'GET',
                url: global.domain,
                data:{
                    do : 'counts'
                },
                success: function(counts){

                    counts = counts[0];
                    $('#erotCount').html(counts.count1);
                    $('#questCount').html(counts.count2);
                    $('#usersCount').html(counts.count3);

                }
            });

        }

    },
    page : function(page,callback){
        
        $.ajax({
            async: false,
            type:'GET',
            url: page,
            success: function(data) {
                
                $('#page-wrapper').html(data);
                if( typeof callback === "function" ) callback();
                
            }
        });
        
    },
    editErotimatologio : function(id){
        
        load.page('form1.html',function(){
            erotimatologia.getErotimatologio(id);
        });
        
    },
    editCategory : function(id){
        
        load.page('form2.html',function(){
            categories.getCategory(id);
        });
        
    },
    editQuestion : function(id){
        
        load.page('form3.html',function(){
            questions.getQuestion(id);
        });
        
    },
    editAnswer : function(id){
        
        load.page('form4.html',function(){
            answers.getAnswer(id);
        });
        
    },
    editCatRes : function(id){
        
        load.page('form5.html',function(){
            catres.getCatRes(id);
        });
        
    },
    editErRes : function(id){

        load.page('form6.html',function(){
            erres.getErRes(id);
        });

    },
    editUser : function(id){
        
        load.page('form7.html',function(){
            
            users.getUser(id);
        });
        
    }
    
};

/**
 * functions for get/insert/update/delete Data in table "erotimatologia"
 * @type {Object}
 */
var erotimatologia = {
    
    getErotimatologia : function(){
               
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getAllErotimatologia'
            },
            success: function(json) {
                
                var tappend = '';
                
                $.each(json,function(key,value){
                    tappend+='<tr class="pageEntry" id="er_'+value.er_id+'" key="'+value.er_id+'" img="'+value.er_image+'">'+
                             '<td>'+value.er_title+'</td>'+
                             '<td>'+value.er_description+'</td>'+
                             (value.er_active == 1?'<td>Yes</td>':'<td>No</td>')+
                             '<td>'+value.er_created+'</td>'+
                             '<td class="center">'+
                                '<button title="edit" type="button" class="btn btn-info btn-circle editErotimatologio"><i class="fa fa-edit"></i></button> &nbsp '+
                                '<button title="delete" type="button" class="btn btn-danger btn-circle deleteErotimatologio"><i class="fa fa-times"></i></button> &nbsp '+
                                '<button title="categories" type="button" class="btn btn-warning btn-circle listCategories"><i class="fa fa-list"></i></button> &nbsp '+
                                '<button title="results" type="button" class="btn btn-success btn-circle listErRes"><i class="fa fa-list"></i></button>'+
                             '</td>'+
                             '</tr>';
                });

                $('#dataTable tbody').html(tappend);
                
                $('#dataTable').DataTable({
                    responsive: true
                });
                                
            }
        });
        
    },
    
    getErotimatologio : function(id){
        
        $('.insertNewErotimatologio').removeClass('insertNewErotimatologio').addClass('updateErotimatologio');
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getErotimatologioByID',
                id : id
            },
            success: function(json) {
                
                json = json[0];
                
                $('#page-wrapper .page-header').text(json.er_title).attr('id',json.er_id);
                $('.panel-heading').text('Edit questionaire');
                $('#er_title').val(json.er_title);
                $('#er_descr').val(json.er_description);
                (json.er_active == 1?$('#er_active').prop( "checked", true ):$('#er_active').prop( "checked", false ));
                $('#file').append('<span>'+json.er_image+'</span>');

            }
        });
        
    },
    
    deleteErotimatologio : function(id_to_del,filename){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'deleteErotimatologio',
                id : id_to_del,
                filename : filename
            },
            success: function(json) {
                
                $('#er_'+id_to_del).hide(300,function(){
                   $(this).remove(); 
                });
                
            }
        });
        
    },
    
    insertErotimatologio : function(){
        
        go = true;
        
        $('.must').each(function(){
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        
        if(go){

            var formData = new FormData();
            formData.append('myFile', $('#er_img')[0].files[0]);
            
            $.ajax({
                   url : 'upload.php',
                   type : 'POST',
                   data : formData,
                   processData: false,
                   contentType: false,
                   success : function(filename) {
                        
                        $.ajax({
                            dataType: 'JSON',
                            async: false,
                            type:'POST',
                            url: global.domain,
                            data : {
                                do : 'insertErotimatologio',
                                title : $('#er_title').val(),
                                descr : $('#er_descr').val(),
                                active : $('#er_active').is(":checked")?1:0,
                                img : filename,
                            },
                            success: function(json) {

                                $('a[href="erotimatologia.html"]').trigger('click');

                            }
                        });
                       
                   }
            });

        }

    },
    
    updateErotimatologio : function(id){
        
        go = true;
        
        $('.must').each(function(){
            
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        if(go){

            var formData = new FormData();
            formData.append('myFile', $('#er_img')[0].files[0]);

            $.ajax({
                   url : 'upload.php',
                   type : 'POST',
                   data : formData,
                   processData: false,
                   contentType: false,
                   success : function(filename) {
                        
                        $.ajax({
                            dataType: 'JSON',
                            async: false,
                            type:'POST',
                            url: global.domain,
                            data : {
                                do : 'updateErotimatologio',
                                id : id,
                                active : $('#er_active').is(":checked")?1:0,
                                title : $('#er_title').val(),
                                descr : $('#er_descr').val(),
                                img : filename != '' ? filename : $("#file span").text()
                            },
                            success: function(json) {

                                $('a[href="erotimatologia.html"]').trigger('click');

                            }
                        });
                       
                   }
            });
            
            
        }
        
    }
    
};

/**
 * functions for get/insert/update/delete Data for table "categories"
 * @type {Object}
 */
var categories = {
    
    getAllCategories : function(id){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getAllCategories',
                id : id
            },
            success: function(json) {
                
                var tappend = '';
                var er_title = '';

                $.each(json,function(key,value){
                    tappend+='<tr class="pageEntry" id="cat_'+value.cat_id+'" key="'+value.cat_id+'" img="'+value.cat_image+'">'+
                             '<td>'+value.cat_title+'</td>'+
                             '<td>'+value.cat_description+'</td>'+
                             '<td>'+value.cat_created+'</td>'+
                             '<td class="center">'+
                                '<button title="edit" type="button" class="btn btn-info btn-circle editCategory"><i class="fa fa-edit"></i></button> &nbsp '+
                                '<button title="delete" type="button" class="btn btn-danger btn-circle deleteCategory"><i class="fa fa-times"></i></button> &nbsp '+
                                '<button title="questions" type="button" class="btn btn-warning btn-circle listQuestions"><i class="fa fa-list"></i></button> &nbsp '+
                                '<button title="results" type="button" class="btn btn-success btn-circle listCatRes"><i class="fa fa-list"></i></button>'+
                             '</td>'+
                             '</tr>';
                    er_title = value.er_title;
                });
                
                $('#erotim').html('<i class="fa fa-backward"></i>  ' + er_title);
                $('#dataTable tbody').html(tappend);
                $('#dataTable').DataTable({
                    responsive: true
                });
                
            }
        });
        
    },
    
    getCategory : function(id){
        
        $('.insertNewCategory').removeClass('insertNewCategory').addClass('updateCategory');
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getCategory',
                id : id
            },
            success: function(json) {
                
                json = json[0];
                
                $('#page-wrapper .page-header').text(json.cat_title).attr('id',json.cat_id);
                $('.panel-heading').text('Edit Category');
                $('#cat_title').val(json.cat_title);
                $('#cat_descr').val(json.cat_description);
                $('#file').append('<span>'+json.cat_image+'</span>');
                $('#cat_color').val(json.cat_color);

            }
        });
        
    },
    
    deleteCategory : function(id_to_del,filename){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'deleteCategory',
                id : id_to_del,
                filename : filename
            },
            success: function(json) {
                
                $('#cat_'+id_to_del).hide(300,function(){
                   $(this).remove(); 
                });
                
            }
        });
        
    },
    
    insertCategory : function(){
        
        go = true;
        
        $('.must').each(function(){
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        
        if(go){

            var formData = new FormData();
            formData.append('myFile', $('#cat_img')[0].files[0]);

            $.ajax({
                   url : 'upload.php',
                   type : 'POST',
                   data : formData,
                   processData: false,
                   contentType: false,
                   success : function(filename) {         
            
                        $.ajax({
                            dataType: 'JSON',
                            async: false,
                            type:'POST',
                            url: global.domain,
                            data : {
                                do : 'insertCategory',
                                erot : global.er_id,
                                title : $('#cat_title').val(),
                                descr : $('#cat_descr').val(),
                                img : filename,
                                color : $('#cat_color').val()
                            },
                            success: function(json) {

                                load.page('categories.html', function(){
                                    categories.getAllCategories(global.er_id);
                                })

                            }
                        });

                   }
            });
        }

    },
    
    updateCategory : function(id){
        
        go = true;
        
        $('.must').each(function(){
            
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        if(go){

            var formData = new FormData();
            formData.append('myFile', $('#cat_img')[0].files[0]);

            $.ajax({
                   url : 'upload.php',
                   type : 'POST',
                   data : formData,
                   processData: false,
                   contentType: false,
                   success : function(filename) {

                        $.ajax({
                            dataType: 'JSON',
                            async: false,
                            type:'POST',
                            url: global.domain,
                            data : {
                                do : 'updateCategory',
                                id : id,
                                title : $('#cat_title').val(),
                                descr : $('#cat_descr').val(),
                                img : filename != '' ? filename : $("#file span").text(),
                                color : $('#cat_color').val()
                            },
                            success: function(json) {

                                load.page('categories.html', function(){
                                    categories.getAllCategories(global.er_id);
                                })

                            }
                        });
                       
                   }
            });
            
            
        }
        
    }
    
};

/**
 * functions for get/insert/update/delete Data for table "questions"
 * @type {Object}
 */
var questions = {
    
    getAllQuestions : function(id){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getAllQuestions',
                id : id
            },
            success: function(json) {
                
                var tappend = '';
                var cat_title = '';
                var type = '';
                
                $.each(json,function(key,value){
                    switch(value.q_type){
                        case '1':
                            type = 'CheckBox';
                            break;
                        case '2':
                            type = 'Radio';
                            break;
                        case '3':
                            type = 'Text';
                            break;
                        default:
                            break;
                    }
                    tappend+='<tr class="pageEntry" id="q_'+value.q_id+'" key="'+value.q_id+'">'+
                             '<td>'+value.q_question+'</td>'+
                             '<td>'+value.q_order+'</td>'+
                             '<td>'+type+'</td>'+
                             '<td>'+value.q_created+'</td>'+
                             '<td class="center">'+
                                '<button title="edit" type="button" class="btn btn-info btn-circle editQuestion"><i class="fa fa-edit"></i></button> &nbsp '+
                                '<button title="delete" type="button" class="btn btn-danger btn-circle deleteQuestion"><i class="fa fa-times"></i></button> &nbsp '+
                                '<button title="answers" type="button" class="btn btn-warning btn-circle listAnswers"><i class="fa fa-list"></i></button>'+
                             '</td>'+
                             '</tr>';
                    cat_title = value.cat_title;
                });
                
                $('#categ').html('<i class="fa fa-backward"></i>  ' + cat_title);
                $('#dataTable tbody').html(tappend);
                $('#dataTable').DataTable({
                    responsive: true
                });
                
            }
        });
        
    },

    getQuestion : function(id){
        
        $('.insertNewQuestion').removeClass('insertNewQuestion').addClass('updateQuestion');
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getQuestion',
                id : id
            },
            success: function(json) {
                
                json = json[0];
                
                $('#page-wrapper .page-header').text(json.q_question).attr('id',json.q_id);
                $('.panel-heading').text('Edit question');
                $('#q_quest').val(json.q_question);
                $('#q_order option:selected').removeAttr('selected');
                $('#q_order').find('option[value="'+json.q_order+'"]').attr("selected",true);
                $('#q_help').val(json.q_helptext);
                $('#q_type input[name=qType]').filter('[value='+json.q_type+']').attr('checked', true);

            }
        });
        
    },
    
    deleteQuestion : function(id_to_del){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'deleteQuestion',
                id : id_to_del
            },
            success: function(json) {
                
                $('#q_'+id_to_del).hide(300,function(){
                   $(this).remove(); 
                });
                
            }
        });
        
    },
    
    insertQuestion : function(){
        
        go = true;
        
        $('.must').each(function(){
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        
        if(go){
            
            $.ajax({
                dataType: 'JSON',
                async: false,
                type:'POST',
                url: global.domain,
                data : {
                    do : 'insertQuestion',
                    cat : global.cat_id,
                    quest : $('#q_quest').val(),
                    qorder : $('#q_order :selected').val(),
                    qhelp : $('#q_help').val(),
                    type : $("#q_type input[name='qType']:checked").val()
                },
                success: function(json) {

                    load.page('questions.html', function(){
                        questions.getAllQuestions(global.cat_id);
                    })

                }
            });
        }

    },
    
    updateQuestion : function(id){
        
        go = true;
        
        $('.must').each(function(){
            
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        if(go){
            
            $.ajax({
                dataType: 'JSON',
                async: false,
                type:'POST',
                url: global.domain,
                data : {
                    do : 'updateQuestion',
                    id : id,
                    quest : $('#q_quest').val(),
                    qorder : $('#q_order :selected').val(),
                    qhelp : $('#q_help').val(),
                    type : $("#q_type input[name='qType']:checked").val()
                },
                success: function(json) {

                    load.page('questions.html', function(){
                        questions.getAllQuestions(global.cat_id);
                    })

                }
            });
        }
        
    }
    
};

/**
 * functions for get/insert/update/delete Data for table "answers"
 * @type {Object}
 */
var answers = {
    
    getAllAnswers : function(id){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getAllAnswers',
                id : id
            },
            success: function(json) {
                
                var tappend = '';
                var question = '';
                
                $.each(json,function(key,value){
                    tappend+='<tr class="pageEntry" id="ans_'+value.ans_id+'" key="'+value.ans_id+'">'+
                             '<td>'+value.ans_text+'</td>'+
                             '<td>'+value.ans_weight+'</td>'+
                             '<td>'+value.ans_created+'</td>'+
                             '<td class="center">'+
                                '<button title="edit" type="button" class="btn btn-info btn-circle editAnswer"><i class="fa fa-edit"></i></button> &nbsp '+
                                '<button title="delete" type="button" class="btn btn-danger btn-circle deleteAnswer"><i class="fa fa-times"></i></button> '+
                             '</td>'+
                             '</tr>';
                    question = value.q_question;
                });
                
                $('#quest').html('<i class="fa fa-backward"></i>  ' + question);
                $('#dataTable tbody').html(tappend);
                $('#dataTable').DataTable({
                    responsive: true
                });
                
            }
        });
        
    },

    getAnswer : function(id){
        
        $('.insertNewAnswer').removeClass('insertNewAnswer').addClass('updateAnswer');
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getAnswer',
                id : id
            },
            success: function(json) {
                
                json = json[0];
                
                $('#page-wrapper .page-header').text(json.ans_text).attr('id',json.ans_id);
                $('.panel-heading').text('Edit Answer');
                $('#ans_txt').val(json.ans_text);
                $('#ans_weight').val(json.ans_weight);

            }
        });
        
    },
    
    deleteAnswer : function(id_to_del){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'deleteAnswer',
                id : id_to_del
            },
            success: function(json) {
                
                $('#ans_'+id_to_del).hide(300,function(){
                   $(this).remove(); 
                });
                
            }
        });
        
    },
    
    insertAnswer : function(){
        
        go = true;
        
        $('.must').each(function(){
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        
        if(go){
            
            $.ajax({
                dataType: 'JSON',
                async: false,
                type:'POST',
                url: global.domain,
                data : {
                    do : 'insertAnswer',
                    quest : global.q_id,
                    anstxt : $('#ans_txt').val(),
                    weight : $('#ans_weight').val()
                },
                success: function(json) {

                    load.page('answers.html', function(){
                        answers.getAllAnswers(global.q_id);
                    })

                }
            });
        }

    },
    
    updateAnswer : function(id){
        
        go = true;
        
        $('.must').each(function(){
            
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        if(go){
            
            $.ajax({
                dataType: 'JSON',
                async: false,
                type:'POST',
                url: global.domain,
                data : {
                    do : 'updateAnswer',
                    id : id,
                    anstxt : $('#ans_txt').val(),
                    weight : $('#ans_weight').val()
                },
                success: function(json) {

                    load.page('answers.html', function(){
                        answers.getAllAnswers(global.q_id);
                    })

                }
            });
        }
        
    }
    
};

/**
 * functions for get/insert/update/delete Data for table "category_results"
 * @type {Object}
 */
var catres = {
    
    getAllCatRes : function(id){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getAllCatRes',
                id : id
            },
            success: function(json) {
                
                var tappend = '';
                var cat_title = '';
                
                $.each(json,function(key,value){
                    tappend+='<tr class="pageEntry" id="cr_'+value.cr_id+'" key="'+value.cr_id+'" img="'+value.cr_image+'">'+
                             '<td>'+value.cr_text+'</td>'+
                             '<td>'+value.cr_weightFrom+' - '+value.cr_weightTo+'</td>'+
                             '<td>'+value.cr_created+'</td>'+
                             '<td class="center">'+
                                '<button title="edit" type="button" class="btn btn-info btn-circle editCatRes"><i class="fa fa-edit"></i></button> &nbsp '+
                                '<button title="delete" type="button" class="btn btn-danger btn-circle deleteCatRes"><i class="fa fa-times"></i></button> '+
                             '</td>'+
                             '</tr>';
                    cat_title = value.cat_title;
                });
                
                $('#categ').html('<i class="fa fa-backward"></i>  ' + cat_title);
                $('#dataTable tbody').html(tappend);
                $('#dataTable').DataTable({
                    responsive: true
                });
                
            }
        });
        
    },

    getCatRes : function(id){
        
        $('.insertNewCatRes').removeClass('insertNewCatRes').addClass('updateCatRes');
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getCatRes',
                id : id
            },
            success: function(json) {
                
                json = json[0];
                
                $('#page-wrapper .page-header').text('Result').attr('id',json.cr_id);
                $('.panel-heading').text('Edit result');
                $('#cr_txt').val(json.cr_text);
                $('#cr_wgA').val(json.cr_weightFrom);
                $('#cr_wgB').val(json.cr_weightTo);
                $('#file').append('<span>'+json.cr_image+'</span>');

            }
        });
        
    },
    
    deleteCatRes : function(id_to_del,filename){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'deleteCatRes',
                id : id_to_del,
                filename : filename
            },
            success: function(json) {
                
                $('#cr_'+id_to_del).hide(300,function(){
                   $(this).remove(); 
                });
                
            }
        });
        
    },
    
    insertCatRes : function(){
        
        go = true;
        
        $('.must').each(function(){
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        
        if(go){

            var formData = new FormData();
            formData.append('myFile', $('#cr_img')[0].files[0]);

            $.ajax({
                   url : 'upload.php',
                   type : 'POST',
                   data : formData,
                   processData: false,
                   contentType: false,
                   success : function(filename) {         
            
                        $.ajax({
                            dataType: 'JSON',
                            async: false,
                            type:'POST',
                            url: global.domain,
                            data : {
                                do : 'insertCatRes',
                                categ : global.cat_id,
                                wgA : $('#cr_wgA').val(),
                                wgB : $('#cr_wgB').val(),
                                result : $('#cr_txt').val(),
                                img : filename
                            },
                            success: function(json) {

                                load.page('catresults.html', function(){
                                    catres.getAllCatRes(global.cat_id);
                                })

                            }
                        });

                   }
            });
            
        }

    },
    
    updateCatRes : function(id){
        
        go = true;
        
        $('.must').each(function(){
            
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        if(go){

             var formData = new FormData();
            formData.append('myFile', $('#cr_img')[0].files[0]);

            $.ajax({
                   url : 'upload.php',
                   type : 'POST',
                   data : formData,
                   processData: false,
                   contentType: false,
                   success : function(filename) {

                        $.ajax({
                            dataType: 'JSON',
                            async: false,
                            type:'POST',
                            url: global.domain,
                            data : {
                                do : 'updateCatRes',
                                id : id,
                                wgA : $('#cr_wgA').val(),
                                wgB : $('#cr_wgB').val(),
                                result : $('#cr_txt').val(),
                                img : filename != '' ? filename : $("#file span").text(),
                            },
                            success: function(json) {

                                load.page('catresults.html', function(){
                                    catres.getAllCatRes(global.cat_id);
                                })

                            }
                        });
                       
                   }
            });

        }
        
    }
    
};

/**
 * functions for get/insert/update/delete Data for table "erotimatologio_results"
 * @type {Object}
 */
var erres = {
    
    getAllErRes : function(id){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getAllErRes',
                id : id
            },
            success: function(json) {
                
                var tappend = '';
                var er_title = '';
                
                $.each(json,function(key,value){
                    tappend+='<tr class="pageEntry" id="err_'+value.err_id+'" key="'+value.err_id+'" img="'+value.err_image+'">'+
                             '<td>'+value.err_text+'</td>'+
                             '<td>'+value.err_weightFrom+' - '+value.err_weightTo+'</td>'+
                             '<td>'+value.err_created+'</td>'+
                             '<td class="center">'+
                                '<button title="edit" type="button" class="btn btn-info btn-circle editErRes"><i class="fa fa-edit"></i></button> &nbsp '+
                                '<button title="delete" type="button" class="btn btn-danger btn-circle deleteErRes"><i class="fa fa-times"></i></button> '+
                             '</td>'+
                             '</tr>';
                    er_title = value.er_title;
                });
                
                $('#erot').html('<i class="fa fa-backward"></i>  ' + er_title);
                $('#dataTable tbody').html(tappend);
                $('#dataTable').DataTable({
                    responsive: true
                });
                
            }
        });
        
    },

    getErRes : function(id){
        
        $('.insertNewErRes').removeClass('insertNewErRes').addClass('updateErRes');
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getErRes',
                id : id
            },
            success: function(json) {
                
                json = json[0];
                
                $('#page-wrapper .page-header').text('Result').attr('id',json.err_id);
                $('.panel-heading').text('Edit result');
                $('#err_txt').val(json.err_text);
                $('#err_wgA').val(json.err_weightFrom);
                $('#err_wgB').val(json.err_weightTo);
                $('#file').append('<span>'+json.err_image+'</span>');

            }
        });
        
    },
    
    deleteErRes : function(id_to_del,filename){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'deleteErRes',
                id : id_to_del,
                filename : filename
            },
            success: function(json) {
                
                $('#err_'+id_to_del).hide(300,function(){
                   $(this).remove(); 
                });
                
            }
        });
        
    },
    
    insertErRes : function(){
        
        go = true;
        
        $('.must').each(function(){
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        
        if(go){

            var formData = new FormData();
            formData.append('myFile', $('#err_img')[0].files[0]);

            $.ajax({
                   url : 'upload.php',
                   type : 'POST',
                   data : formData,
                   processData: false,
                   contentType: false,
                   success : function(filename) {         
            
                        $.ajax({
                            dataType: 'JSON',
                            async: false,
                            type:'POST',
                            url: global.domain,
                            data : {
                                do : 'insertErRes',
                                erot : global.er_id,
                                wgA : $('#err_wgA').val(),
                                wgB : $('#err_wgB').val(),
                                result : $('#err_txt').val(),
                                img : filename
                            },
                            success: function(json) {

                                load.page('erresults.html', function(){
                                    erres.getAllErRes(global.er_id);
                                })

                            }
                        });

                   }
            });
            
        }

    },
    
    updateErRes : function(id){
        
        go = true;
        
        $('.must').each(function(){
            
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        if(go){

            var formData = new FormData();
            formData.append('myFile', $('#err_img')[0].files[0]);

            $.ajax({
                   url : 'upload.php',
                   type : 'POST',
                   data : formData,
                   processData: false,
                   contentType: false,
                   success : function(filename) {

                        $.ajax({
                            dataType: 'JSON',
                            async: false,
                            type:'POST',
                            url: global.domain,
                            data : {
                                do : 'updateErRes',
                                id : id,
                                wgA : $('#err_wgA').val(),
                                wgB : $('#err_wgB').val(),
                                result : $('#err_txt').val(),
                                img : filename != '' ? filename : $("#file span").text()
                            },
                            success: function(json) {

                                load.page('erresults.html', function(){
                                    erres.getAllErRes(global.er_id);
                                })

                            }
                        });
                       
                   }
            });

        }
        
    }
    
};

/**
 * functions for get/insert/update/delete Data for table "users"
 * @type {Object}
 */
var users = {
    
    getAllUsers : function(){
               
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getAllUsers'
            },
            success: function(json) {
                
                global.users = [];
                var tappend = '';
                $.each(json,function(key,value){
                    global.users.push({id:value.user_id,name:value.user_name,email:value.user_email});
                    tappend+='<tr class="pageEntry" id="u_'+value.user_id+'" key="'+value.user_id+'">'+
                                '<td>'+value.user_email+'</td>'+
                                '<td>'+value.user_name+'</td>'+
                                '<td>'+value.user_created+'</td>'+
                                '<td class="center"><button title="edit" type="button" class="btn btn-info btn-circle editUser"><i class="fa fa-edit"></i></button> &nbsp'+
                                '<button title="delete" type="button" class="btn btn-danger btn-circle deleteUser"><i class="fa fa-times"></i></button></td>'+
                              '</tr>';
                });
                $('#dataTable tbody').html(tappend);
                
                $('#dataTable').DataTable({
                    responsive: true
                });
                                
            }
        });
        
    },
    
    getUser : function(id){
        
        $('.insertNewUser').removeClass('insertNewUser').addClass('updateUser');
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'getUser',
                id : id
            },
            success: function(json) {
                
                json = json[0];
                $('#page-wrapper .page-header').text(json.user_name).attr('id',json.user_id);
                $('.panel-heading').text('Edit user');
                $('#uname').val(json.user_name);
                $('#pass').val(json.user_password);
                $('#email').val(json.user_email);
                $('#notify input:radio[name="optionsRadios"]').filter('[value="'+json.user_notify+'"]').attr('checked', true);
            }
        });
        
    },    
    
    deleteUser : function(id_to_del){
        
        $.ajax({
            dataType: 'JSON',
            async: false,
            type:'GET',
            url: global.domain,
            data : {
                do : 'deleteUser',
                id : id_to_del
            },
            success: function(json) {
                
                $('#u_'+id_to_del).hide(300,function(){
                   $(this).remove(); 
                });
                
            }
        });
        
    },
    
    insertUser : function(){
        
        go = true;
        
        $('.must').each(function(){
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        
        if(go){
            
            var chkusr = 0;
            $.each(global.users, function(key,value){
                if(value.email == $('#email').val())
                    chkusr = 1;
            });
            
            if(chkusr == 0){
                $.ajax({
                    dataType: 'JSON',
                    async: false,
                    type:'POST',
                    url: global.domain,
                    data : {
                        do : 'insertUser',
                        email : $('#email').val(),
                        pass : $('#pass').val(),
                        uname : $('#uname').val(),
                        notify : $("#notify input[name='optionsRadios']:checked").val()

                    },
                    success: function(json) {

                        $('a[href="users.html"]').trigger('click');

                    }
                });
            }else
                alert("This email is already taken!");
        }

    },
    
    updateUser : function(id){
        
        go = true;
        
        $('.must').each(function(){
            
            if($(this).val().length === 0){
                
                go = false;
                var t = $(this);
                t.css('border-color','#ffe188');
                
                setTimeout(function(){
                    t.css('border-color','#ccc');
                },5000);
                
            }
            
        });
        
        if(go){
            
            $.ajax({
                dataType: 'JSON',
                async: false,
                type:'POST',
                url: global.domain,
                data : {
                    do : 'updateUser',
                    id : id,
                    uname : $('#uname').val(),
                    pass : $('#pass').val(),
                    email : $('#email').val(),
                    notify : $("#notify input[name='optionsRadios']:checked").val()
                },
                success: function(json) {

                    $('a[href="users.html"]').trigger('click');

                }
                
            });
        }
        
    }
    
};


