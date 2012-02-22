<?php
if (!defined('PHP_VERSION_ID') || PHP_VERSION_ID < 50300)
	die('PHP ActiveRecord requires PHP 5.3 or higher');

define('PHP_ACTIVERECORD_VERSION_ID','1.0');

require 'arecord/Singleton.php';
require 'arecord/Config.php';
require 'arecord/Utils.php';
require 'arecord/DateTime.php';
require 'arecord/Model.php';
require 'arecord/Table.php';
require 'arecord/ConnectionManager.php';
require 'arecord/Connection.php';
require 'arecord/SQLBuilder.php';
require 'arecord/Reflections.php';
require 'arecord/Inflector.php';
require 'arecord/CallBack.php';
require 'arecord/Exceptions.php';

spl_autoload_register('activerecord_autoload');

function activerecord_autoload($class_name)
{
	$path = ActiveRecord\Config::instance()->get_model_directory();
	$root = realpath(isset($path) ? $path : '.');

	if (($namespaces = ActiveRecord\get_namespaces($class_name)))
	{
		$class_name = array_pop($namespaces);
		$directories = array();

		foreach ($namespaces as $directory)
			$directories[] = $directory;

		$root .= DIRECTORY_SEPARATOR . implode($directories, DIRECTORY_SEPARATOR);
	}

	$file = "$root/$class_name.php";

	if (file_exists($file))
		require $file;
}




ActiveRecord\Config::initialize(function($cfg){
     $cfg->set_model_directory(APP_PATH.'models');
     $cfg->set_connections(array(
         'development' => 'mysql://root:@localhost/winw'));
});
?>
