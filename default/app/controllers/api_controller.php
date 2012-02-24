<?php
class ApiController extends AppController {
	protected function before_filter()
	{
		Load::lib('rest');
		Load::models('books');
		/*El nombre de la accion se convierte en parametro*/
	    if(is_numeric($this->action_name)){
			$this->parameters = array($this->action_name);
		}
	    $this->action_name = Rest::init();
	    View::template(null);
	}
	
	public function  get($id=null){
		$book = new Books();
		$this->data =  $book->find();
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
