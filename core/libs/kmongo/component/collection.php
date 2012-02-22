<?php
class KMCollection{
	
	/**
	 * Mongo colection object
	 * @var type 
	 */
	protected $collection;


	function __construct(MongoCollection $obj){
		$this->collection=$obj;
	}
	
	/**
	* Add a new document to the store
	* @param KMDoc $doc 
	*/
	function save(KMDoc $doc){
		$data = $doc->getData();
		$this->store->insert($data);	
		if(empty($doc->id)){
			$doc->id=$data['_id'];
		}
	}
	
}