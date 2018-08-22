$("#categorySelected").on('change',function(){
	$(".subcategorySelected").hide()
	$("."+this.value).show()
})

$("#choosen").on('change',function(){
	$(".choices").hide()
	$("#choice"+this.value).show()
})

$("#fattu").on('change',function(){
	$(".ffg").hide()
	$("."+this.value).show()
	$("."+this.value).show()
})