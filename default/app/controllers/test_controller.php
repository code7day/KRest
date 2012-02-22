<?php
class TestController extends AppController {
	protected function before_filter()
	{
		Load::lib('rest');
		Load::lib('activerecord');
		/*El nombre de la accion se convierte en parametro*/
	    if(!empty($this->action_name) && $this->action_name!= 'index'){
			$this->parameters = array($this->action_name);
		}
		
	    $this->action_name = Rest::init();
	    View::template(null);
	}
	
	public function  get(){
		$c = array();
		$a = Book::find('all');
		foreach($a as $b){
			$c[]=  $b->to_json();
		}
		die('['.implode(',',$c).']');
		$this->data =  $c;
	}
	
	public function put($id){
		$data =  Rest::param();
		$auth =  Book::find($id);
		$auth->update_attributes($data);
		$auth->save();
		die($auth->to_json());
	}
	
	public function post(){
		$data =  Rest::param();
		$post = new Book($data);
		$post->save();
		die($post->to_json());
	}
	
	public function delete($id){
		$data =  Rest::param();
		var_dump($data);
		$auth =  Book::find($id);
		$auth->delete();
		$this->data = null;
	}
}
?>
