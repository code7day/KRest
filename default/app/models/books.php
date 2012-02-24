<?php
class Books extends ActiveRecord{
	public function getPages($page, $ppage=20){
		return $this->paginate("page: $page", "per_page: $ppage");
    }
}
