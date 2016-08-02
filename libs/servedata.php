<?php

include_once('mysql.php');

/**
 *  adminDataServer -> session, ajax calls, db calls
 */
class adminDataServer{
    
    private $myDB,
            $md,
            $dataArray,
            $userID = false,
            $report,
            $dateFrom,
            $dateTo,
            $type,
            $request,
            $params;

    function __construct(){

        session_start();

        $this->md        = (isset($_REQUEST['do']))?$_REQUEST['do']:'nada';
        $this->myDB      = new mysqlDb();
        $this->dataArray = array();
        $this->request   = $_REQUEST;
        $this->params    = array();
        $this->userID    = ($_SESSION['id'])?$_SESSION['id']:false;

    }

    function __destruct() {
        
        unset($this);

    }

    /**
     * manages all calls
     * @return [type] [description]
     */
    public function manageData(){

        switch($this->md){
            
            case 'adminLogin':
                $this->adminLogin();
                break;
            case 'counts':
                $this->counts();
                break;
            case 'logout':
                session_destroy();
                header('Location:/QuestionR/admin/login.html');
                break;
            case 'getAllErotimatologia':
                $this->getAllErotimatologia();
                break;
            case 'getErotimatologioByID':
                $this->getErotimatologioByID();
                break;
            case 'insertErotimatologio':
                $this->insertErotimatologio();
                break;
            case 'updateErotimatologio':
                $this->updateErotimatologio();
                break;
            case 'deleteErotimatologio':
                $this->deleteErotimatologio();
                break;
            case 'getAllCategories':
                $this->getAllCategories();
                break;
            case 'getCategory':
                $this->getCategory();
                break;
            case 'insertCategory':
                $this->insertCategory();
                break;
            case 'updateCategory':
                $this->updateCategory();
                break;
            case 'deleteCategory':
                $this->deleteCategory();
                break;
            case 'getAllQuestions':
                $this->getAllQuestions();
                break;
            case 'getQuestion':
                $this->getQuestion();
                break;
            case 'insertQuestion':
                $this->insertQuestion();
                break;
            case 'updateQuestion':
                $this->updateQuestion();
                break;
            case 'deleteQuestion':
                $this->deleteQuestion();
                break;
            case 'getAllAnswers':
                $this->getAllAnswers();
                break;
            case 'getAnswer':
                $this->getAnswer();
                break;
            case 'insertAnswer':
                $this->insertAnswer();
                break;
            case 'updateAnswer':
                $this->updateAnswer();
                break;
            case 'deleteAnswer':
                $this->deleteAnswer();
                break;
            case 'getAllCatRes':
                $this->getAllCatRes();
                break;
            case 'getCatRes':
                $this->getCatRes();
                break;
            case 'insertCatRes':
                $this->insertCatRes();
                break;
            case 'updateCatRes':
                $this->updateCatRes();
                break;
            case 'deleteCatRes':
                $this->deleteCatRes();
                break;
            case 'getAllErRes':
                $this->getAllErRes();
                break;
            case 'getErRes':
                $this->getErRes();
                break;
            case 'insertErRes':
                $this->insertErRes();
                break;
            case 'updateErRes':
                $this->updateErRes();
                break;
            case 'deleteErRes':
                $this->deleteErRes();
                break;
            case 'getAllUsers':
                $this->getAllUsers();
                break;
            case 'getUser':
                $this->getUser();
                break;
            case 'insertUser':
                $this->insertUser();
                break;
            case 'updateUser':
                $this->updateUser();
                break;
            case 'deleteUser':
                $this->deleteUser();
                break;
            case 'getData1st':
                $this->getData1st();
                break;
            case 'getData2nd':
                $this->getData2nd();
                break;
            case 'getData3rd':
                $this->getData3rd();
                break;
            case 'getResultsByCat':
                $this->getResultsByCat();
                break;
            case 'getResultsByEr':
                $this->getResultsByEr();
                break;
            case 'insertStoredReply':
                $this->insertStoredReply();
                break;
            default:
                break;

        }
        
        
    }

    /**
     * checks credentials for login to admin panel
     * @return userID
     */
    private function adminLogin(){
        
        $this->params['email'] = (string)$this->request['email'];
        $this->params['pass'] = (string)$this->request['pass'];
        
        $this->myDB->execProc('adminLogin',$this->params);
        while($result=$this->myDB->getData()){
            
            $_SESSION['id'] = $result->user_id;
            $this->userID = $_SESSION['id'];
            
            $this->dataArray[] = $result;

        }
        echo json_encode($this->dataArray);

    }

    /**
     * count records for admin statistics
     * @return array objects
     */
    private function counts(){
        
        $this->myDB->execProc('counts');
        while($result=$this->myDB->getData()){
            $this->dataArray[] = $result;
        }
        echo json_encode($this->dataArray);

    }

    /**
     * functions for table "erotimatologia"
     * @return array/object
     */
    private function getAllErotimatologia(){
        
        $this->myDB->execProc('getAllErotimatologia');
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        echo json_encode($this->dataArray);
        
    }
    private function getErotimatologioByID(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getErotimatologioByID',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        echo json_encode($this->dataArray);

    }
    private function insertErotimatologio(){
        
        $this->params['title'] = (string)$this->request['title'];
        $this->params['descr'] = (string)$this->request['descr'];
        $this->params['active'] = (int)$this->request['active'];
        $this->params['img'] = (string)$this->request['img'];

        $this->myDB->execProc('insertErotimatologio',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
        
    }
    private function updateErotimatologio(){
        
        $this->params['id'] = (int)$this->request['id'];
        $this->params['active'] = (int)$this->request['active'];
        $this->params['title'] = (string)$this->request['title'];
        $this->params['descr'] = (string)$this->request['descr'];
        $this->params['img'] = (string)$this->request['img'];

        $this->myDB->execProc('updateErotimatologio',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
        
    }
    private function deleteErotimatologio(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('deleteErotimatologio',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;

        if(file_exists('uploads/'.$this->request['filename'])){
            unlink('uploads/'.$this->request['filename']);
        }

        echo json_encode($this->dataArray);

    }
    //---------

    /**
     * functions for table "categories"
     * @return array/object
     */
    private function getAllCategories(){

        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getAllCategories', $this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        echo json_encode($this->dataArray);
        
    }
    private function getCategory(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getCategory',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        echo json_encode($this->dataArray);

    }
    private function insertCategory(){
        
        $this->params['erot'] = (int)$this->request['erot'];
        $this->params['title'] = (string)$this->request['title'];
        $this->params['descr'] = (string)$this->request['descr'];
        $this->params['img'] = (string)$this->request['img'];
        $this->params['color'] = (string)$this->request['color'];

        $this->myDB->execProc('insertCategory',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
        
    }
    private function updateCategory(){
        
        $this->params['id'] = (int)$this->request['id'];
        $this->params['title'] = (string)$this->request['title'];
        $this->params['descr'] = (string)$this->request['descr'];
        $this->params['img'] = (string)$this->request['img'];
        $this->params['color'] = (string)$this->request['color'];

        $this->myDB->execProc('updateCategory',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
        
    }
    private function deleteCategory(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('deleteCategory',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;

        if(file_exists('uploads/'.$this->request['filename'])){
            unlink('uploads/'.$this->request['filename']);
        }

        echo json_encode($this->dataArray);

    }
    //---------

    /**
     * functions for table "questions"
     * @return array/object
     */
    private function getAllQuestions(){

        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getAllQuestions', $this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        
        echo json_encode($this->dataArray);
        
    }
    private function getQuestion(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getQuestion',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        echo json_encode($this->dataArray);

    }
    private function insertQuestion(){
        
        $this->params['cat'] = (int)$this->request['cat'];
        $this->params['quest'] = (string)$this->request['quest'];
        $this->params['qorder'] = (int)$this->request['qorder'];
        $this->params['qhelp'] = (string)$this->request['qhelp'];
        $this->params['type'] = (int)$this->request['type'];

        $this->myDB->execProc('insertQuestion',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
        
    }
    private function updateQuestion(){
        
        $this->params['id'] = (int)$this->request['id'];
        $this->params['quest'] = (string)$this->request['quest'];
        $this->params['qorder'] = (int)$this->request['qorder'];
        $this->params['qhelp'] = (string)$this->request['qhelp'];
        $this->params['type'] = (int)$this->request['type'];

        $this->myDB->execProc('updateQuestion',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
        
    }
    private function deleteQuestion(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('deleteQuestion',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);

    }
    //---------

    /**
     * functions for table "answers"
     * @return array/object
     */
    private function getAllAnswers(){

        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getAllAnswers', $this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        
        echo json_encode($this->dataArray);
        
    }
    private function getAnswer(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getAnswer',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        echo json_encode($this->dataArray);

    }
    private function insertAnswer(){
        
        $this->params['quest'] = (string)$this->request['quest'];
        $this->params['anstxt'] = (string)$this->request['anstxt'];
        $this->params['weight'] = (int)$this->request['weight'];
        

        $this->myDB->execProc('insertAnswer',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
        
    }
    private function updateAnswer(){
        
        $this->params['id'] = (int)$this->request['id'];
        $this->params['anstxt'] = (string)$this->request['anstxt'];
        $this->params['weight'] = (int)$this->request['weight'];
        

        $this->myDB->execProc('updateAnswer',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
        
    }
    private function deleteAnswer(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('deleteAnswer',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);

    }
    //---------

    /**
     * functions for table category_results
     * @return array/object
     */
    private function getAllCatRes(){

        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getAllCatRes', $this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        
        echo json_encode($this->dataArray);
        
    }
    private function getCatRes(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getCatRes',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        echo json_encode($this->dataArray);

    }
    private function insertCatRes(){
        
        $this->params['categ'] = (int)$this->request['categ'];
        $this->params['wgA'] = (int)$this->request['wgA'];
        $this->params['wgB'] = (int)$this->request['wgB'];
        $this->params['result'] = (string)$this->request['result'];
        $this->params['img'] = (string)$this->request['img'];

        $this->myDB->execProc('insertCatRes',$this->params);
        $result=$this->myDB->getData();
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
        
    }
    private function updateCatRes(){
        
        $this->params['id'] = (int)$this->request['id'];
        $this->params['wgA'] = (int)$this->request['wgA'];
        $this->params['wgB'] = (int)$this->request['wgB'];
        $this->params['result'] = (string)$this->request['result'];
        $this->params['img'] = (string)$this->request['img'];

        $this->myDB->execProc('updateCatRes',$this->params);
        // $result=$this->myDB->getData();  
        // $this->dataArray[] = $result;
        echo json_encode('true');
        
    }
    private function deleteCatRes(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('deleteCatRes',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;

        if(file_exists('uploads/'.$this->request['filename'])){
            unlink('uploads/'.$this->request['filename']);
        }

        echo json_encode($this->dataArray);

    }
    //---------

    /**
     * functions for table erotimatologio_results
     * @return array/object
     */
    private function getAllErRes(){

        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getAllErRes', $this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        
        echo json_encode($this->dataArray);
        
    }
    private function getErRes(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getErRes',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
        echo json_encode($this->dataArray);

    }
    private function insertErRes(){
        
        $this->params['erot'] = (int)$this->request['erot'];
        $this->params['wgA'] = (int)$this->request['wgA'];
        $this->params['wgB'] = (int)$this->request['wgB'];
        $this->params['result'] = (string)$this->request['result'];
        $this->params['img'] = (string)$this->request['img'];

        $this->myDB->execProc('insertErRes',$this->params);
        $result=$this->myDB->getData();
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
        
    }
    private function updateErRes(){
        
        $this->params['id'] = (int)$this->request['id'];
        $this->params['wgA'] = (int)$this->request['wgA'];
        $this->params['wgB'] = (int)$this->request['wgB'];
        $this->params['result'] = (string)$this->request['result'];
        $this->params['img'] = (string)$this->request['img'];

        $this->myDB->execProc('updateErRes',$this->params);
        // $result=$this->myDB->getData();  
        // $this->dataArray[] = $result;
        echo json_encode('true');
        
    }
    private function deleteErRes(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('deleteErRes',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;

        if(file_exists('uploads/'.$this->request['filename'])){
            unlink('uploads/'.$this->request['filename']);
        }
        
        echo json_encode($this->dataArray);

    }
    //---------

    /**
     * functions for table "users"
     * @return array/object
     */
    private function getAllUsers(){

        $this->myDB->execProc('getAllUsers',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
       
        echo json_encode($this->dataArray);        
    }
    private function getUser(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('getUser',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;

        }
        echo json_encode($this->dataArray);        
    }
    private function insertUser(){
        
        $this->params['email'] = (string)$this->request['email'];
        $this->params['pass'] = (string)$this->request['pass'];
        $this->params['uname'] = (string)$this->request['uname'];
        $this->params['notify'] = (int)$this->request['notify'];

        $this->myDB->execProc('insertUser',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
    }
    private function updateUser(){
        
        $this->params['id'] = (int)$this->request['id'];
        $this->params['email'] = (string)$this->request['email'];
        $this->params['pass'] = (string)$this->request['pass'];
        $this->params['uname'] = (string)$this->request['uname'];
        $this->params['notify'] = (int)$this->request['notify'];
        
        $this->myDB->execProc('updateUser',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
    }
    private function deleteUser(){
        
        $this->params['id'] = (int)$this->request['id'];
        
        $this->myDB->execProc('deleteUser',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);            
    }
    //---------

    /**
     * functions for frontEnd Data
     * @return array/object
     */
    private function getData1st(){

        $this->params['id'] = (int)$this->request['id'];

        $this->myDB->execProc('getData1st',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
       
        echo json_encode($this->dataArray);        
    }
    private function getData2nd(){

        $this->params['id'] = (int)$this->request['id'];

        $this->myDB->execProc('getData2nd',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
       
        echo json_encode($this->dataArray);        
    }
    private function getData3rd(){

        $this->params['id'] = (int)$this->request['id'];

        $this->myDB->execProc('getData3rd',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
       
        echo json_encode($this->dataArray);        
    }
    private function getResultsByCat(){

        $this->params['points'] = (int)$this->request['points'];
        $this->params['category'] = (int)$this->request['category'];

        $this->myDB->execProc('getResultsByCat',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
       
        echo json_encode($this->dataArray);        
    }
    private function getResultsByEr(){

        $this->params['points'] = (int)$this->request['points'];
        $this->params['erot'] = (int)$this->request['erot'];

        $this->myDB->execProc('getResultsByEr',$this->params);
        while($result=$this->myDB->getData()){
            
            $this->dataArray[] = $result;
            
        }
       
        echo json_encode($this->dataArray);        
    }
    private function insertStoredReply(){
        
        $this->params['question'] = (int)$this->request['question'];
        $this->params['answer'] = (int)$this->request['answer'];

        $this->myDB->execProc('insertStoredReply',$this->params);
        $result=$this->myDB->getData();  
        $this->dataArray[] = $result;
        echo json_encode($this->dataArray);
    }
    //---------

}

?>