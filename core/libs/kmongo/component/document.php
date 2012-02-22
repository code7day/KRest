<?php
class KMDoc{
	/**
	 * Return all data store in the document
	 * @return Array 
	 */	
	protected $data =array();
	
	/**
	 * Id of document in store
	 * @var String
	 */
	protected $id;
	
	
	function getData(){
		return $this->data;
	}
	
	
	function __set($key, $val){
		$this->data[$key]=$val;
	}
	
	function __get($key){
		return isset($this->data[$key])?$this->data[$key]:null;
	}
}
