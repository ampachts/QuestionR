<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Questions</title>

    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <link href="./css/style.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./css/font-awesome.min.css">

</head>

<body>

    <div id="wrapper">

        <div id="sidebar-wrapper">

            <ul class="sidebar-nav nav nav-pills nav-stacked">
                
            </ul>
        </div>
        
        <div class="bg">
            <a href="#menu-toggle" class="btn" id="menu-toggle"><i class="fa fa-toggle-on"></i></a>
            <div id="page-content-wrapper">
                <div class="container">
                    
                    <div class="tab-content">

                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" tabindex="-1" id="resultsModal" role="dialog" aria-labelledby="modalResults">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    
                </div>
            </div>
        </div>

    </div>

    <script src="./js/jquery.min.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/func.js"></script>

    <script>
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
    </script>

</body>

</html>
