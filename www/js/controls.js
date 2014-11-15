function move(obj, dx, dy) {
	return function() {
		var p = $(obj);
		var transRegExp = /translate\((-?[0-9\.]+),(-?[0-9\.]+)\)/;
		var trans = transRegExp.exec(p.attr("transform"));
		var ox = Number(trans[1]);
		var oy = Number(trans[2]);
		var nx = ox + dx;
		var ny = oy + dy;
		if(ny >= 0) {
			ny = 0;
		}
		console.log("translate("+nx+","+ny+")");
		p.attr("transform","translate("+nx+","+ny+")")		
	}
}

$(function(){
	$('body').on('keydown',function(evt) {
		if(evt.keyCode == 37) {
			$('.actions').trigger("left");
		} else if(evt.keyCode == 38) {
			$('.actions').trigger("up");
		} else if(evt.keyCode == 39) {
			$('.actions').trigger("right");
		} else if(evt.keyCode == 40) {
			$('.actions').trigger("down");
		}
	});
		
	
	$('.actions').on("right",move("#player1",10,0));
	$('.actions').on("left",move("#player1",-10,0));
	$('.actions').on("up",function(){
		$("#player1").animate({
			dummy: 0,
		},{
			progress: function(a,p,left) {
				var dx = 5;
				var dy = -15*Math.cos(Math.PI * p);
				console.log("p="+p+" dx="+dx+" dy="+dy);
				move("#player1",dx,dy)();
			}
		})
	});
});


