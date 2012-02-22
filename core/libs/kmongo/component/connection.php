<?php
/**
 * KumbiaPHP web & app Framework
 *
 * LICENSE
 *
 * This source file is subject to the new BSD license that is bundled
 * with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * http://wiki.kumbiaphp.com/Licencia
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@kumbiaphp.com so we can send you a copy immediately.
 *
 * 
 * @author     Ashrey
 * @category   KumbiaPHP
 * @package    validate 
 * @copyright  Copyright (c) 2005-2009 Kumbia Team (http://www.kumbiaphp.com)
 * @license    http://wiki.kumbiaphp.com/Licencia     New BSD License
 */
class KMConnection{
	
	/**
	 * List of instances
	 * @var Array 
	 */
	static $instances=array();
	
	/**
	 * DNS string for connection
	 */
	protected $connStr=null;
	
		
	/**
	 * Mongo object for connection
	 */
	protected $connObj = null;
	
	/**
	 * Database name 
	 */
	 protected $db = null;
	 
	 /**
	  * Store for documents
	  * @var type 
	  */
	 protected $store=null;
	 
	
	/**
	 * Return a connection. 
	 * @param String $name
	 * @param Array  $config
	 * @return KMConnection 
	 */
	static function get($name='default', $config=null){
		if(!isset(self::$instances[$name])){
			self::$instances[$name]= new KMConnection($config);
		}
		return self::$instances[$name];
	}
		
	/**
	* Array with key "dns" for connection, or "db" 
	* @param Array $config 
	*/
	private function __construct($config){
		$dns = isset($config['dns'])?
			$config['dns']:
			'mongodb://'.ini_get('mongo.default_host').':'.ini_get('mongo.default_port');
		
		$db = isset($config['db'])?
			$config['db']:
			'kumbiaphp';
			
		$this->connStr = $dns;
		$this->connObj= new Mongo($dns);
		$this->db=$this->connObj->selectDB($db);
	}
	
	function getCollection($sname){
		$this->db->selectCollection($sname);	
	}
	
	/**
	* Close conection with the server
	*/
	function __destruct(){
		$this->connObj->close();
	}
	
}