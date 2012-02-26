<?php
/**
 * Esta clase permite extender o modificar la clase ViewBase de Kumbiaphp.
 *
 * @category KumbiaPHP
 * @package View
 **/

// @see KumbiaView
require_once CORE_PATH . 'kumbia/kumbia_view.php';

class View extends KumbiaView {
	static function jsTemplate($tpl){
		ob_start();
		parent::partial("bb/$tpl");
		$content = ob_get_clean();
		return sprintf('<script type="txt/tpl" id="tpl-%s">%s</script>',
			$tpl, $content);
	}
	
	static function jsTpl(){
		$out = array();
		$a_tpl = func_get_args();
		foreach($a_tpl as $tpl){
			$out[] =  self::jsTemplate($tpl);
		}
		return implode($out);
	}

}
