<?php

class mysqlDb extends PDO {

		protected
			$host='localhost',
			$user='mysqlUser',
 			$password='mysqlPass',
 			$database='dbName',
			$port=3306;
		private
			$result,
			$q,
			$stmt,
			$params=array(),
			$dbLink;
		public	
			$lastCall,
			$records=array();

		public function __construct($host='',$user='',$password='',$database='',$port=3306){
		// connect to MySQL and select database
			try{
				if(!$host || !$user || !$database){
					$this->dbLink = new PDO('mysql:host='.$this->host.';port='.$this->port.';dbname='.$this->database,$this->user, $this->password, array( PDO::ATTR_PERSISTENT => false ,PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
				}else{
					$this->dbLink = new PDO('mysql:host='.$host.';port='.$port.';dbname='.$database,$user, $password, array( PDO::ATTR_PERSISTENT => false,PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
				}
			}catch (Exception $e){
				throw new Exception('COMM FAIL');
			}
			
		}

		
		public function execProc($call,$params=NULL){
			if($this->lastCall==$call && isset($this->stmt)){
				$this->stmt->closeCursor();
				if(is_array($params)){
					$inc=1;
					foreach($params as $param=>$value){
						$this->params[$param]=$value;
					}
					
				}
				$this->stmt->execute();
				return;
			}elseif(isset($this->stmt))$this->stmt->closeCursor();
						
			$this->records=array();
			$this->params=array();
			for($i=0;$i<count($params);$i++)$s[]='?';	
	 
			try{
				$this->stmt= $this->dbLink->prepare('CALL '.$this->database.'.'.$call.'('.((is_array($s))?implode(',',$s):'').')');
			}catch(Exception $e){
				echo($e->getMessage());
			}
			
			if($this->stmt)$this->lastCall=$call;
			
			if(is_array($params)){
				$inc=1;
				foreach($params as $param=>$value){
					$this->params[$param]=$value;
 					if(preg_match ('/_id$/', $value))
				        $this->stmt->bindParam($inc,$this->params[$param],PDO::PARAM_INT);
				    else
				        $this->stmt->bindParam($inc,$this->params[$param],PDO::PARAM_STR);
				
					$inc++;
					
				}
			}

			try{
				$this->stmt->execute();
			}catch(Exception $e){
				echo($e->getMessage());
			}
		}
		
		public function getData(){
			return $this->records=$this->stmt->fetch(PDO::FETCH_OBJ);
		}
		
	
		public function varType($var){
			switch(gettype($var)){
				case 'integer':
					return PDO::PARAM_INT;
					break;
				case 'string':
					return PDO::PARAM_STR;
				break;
				default:
					throw new Exception('unknown type cast');
					break;
			}
		}

	
		//return number of rows of the excecuted query
		public function numRows($query=''){	
  			if(isset($this->stmt))return $this->stmt->rowCount();
  			else return 0;
		}
		
		
		public function query($sql){
			$this->lastCall='query';
			$this->stmt=$this->dbLink->query($sql);
		}
	
}

?>