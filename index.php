<?php
	session_start();

	if(isset($_REQUEST) && $_REQUEST['do']){
	    
	    include_once('libs/servedata.php');
	    
	    $conobj = new adminDataServer();
	    $conobj->manageData();
	    
	}else{

		header('Location:./page.php');
	                    
	}
        
?>