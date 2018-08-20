

$("small").on("click",function(){
	$("#thisone").before('<div class="form-group row"><div class="col"><label for="feature">Feature</label><input type="text" class="form-control" id="title" placeholder="feature" name="feature[]" ></div><div class="col"><label for="description">Discription</label><input type="text" class="form-control" id="title" placeholder="Description" name="description[]" ></div></div>')
});