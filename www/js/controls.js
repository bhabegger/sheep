function move(obj, dx, dy) {
	return function() {
		var p = $(obj);
		var transRegExp = /translate\((-?[0-9]+),(-?[0-9]+)\)/;
		var trans = transRegExp.exec(p.attr("transform"));
		var ox = Number(trans[1]);
		var oy = Number(trans[2]);
		var nx = ox + dx;
		var ny = oy + dy;
		p.attr("transform","translate("+nx+","+ny+")")		
	}
}

$(function(){
	$('body').on('keyup',function(evt) {
		if(evt.keyCode == 37) {
			$('.actions').trigger("left");
		} else if(evt.keyCode == 38) {
			$('.actions').trigger("up");
		} else if(evt.keyCode == 39) {
			$('.actions').trigger("right");
		} else if(evt.keyCode == 40) {
			$('.actions').trigger("down");
		}
		return false;
		console.log(evt.keyCode)
	});
		
	
	$('.actions').on("right",move("#player1",10,0));
	$('.actions').on("left",move("#player1",-10,0));
	$('.actions').on("up",function(){
		$('#player1').trigger("jump");
	});
});


