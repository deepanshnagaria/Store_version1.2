$("#categorySelected").on('change',function(){
	$(".subcategorySelected").hide()
	$("."+this.value.split(" ")[0]).show()
})

$("#choosen").on('change',function(){
	$(".choices").hide()
	$("#choice"+this.value).show()
})

$("#fattu").on('change',function(){
	$(".ffg").hide()
	$("."+this.value.split(" ")[0]).show()
})