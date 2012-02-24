<?php
class ApiController extends AppController {
	protected function before_filter()
	{
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
		$this->data = $book->find();
		var_dump($book->getPages(1));
	}
	
	public function put($id){
		$data =  Rest::param();
		$book = new Books();
		$book->find($id);
		$book->update($data);
		$this->data = $book;
	}
	
	public function post(){
		$data =  Rest::param();
		$book = new Books($data);
		$book->save();
		$this->data = $book;
	}
	
	public function delete($id){
		$book = new Books($data);
		$book->delete($id);
		$this->data = null;
	}
}
?>
