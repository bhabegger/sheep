function move(obj, dx, dy) {
	return function() {
		var p = $(obj);
		
	}
}

function update() {
	var p = $("#player1");
	
	var transRegExp = /translate\((-?[0-9\.]+),(-?[0-9\.]+)\)/;
	var trans = transRegExp.exec(p.attr("transform"));
	var ox = Number(trans[1]);
	var oy = Number(trans[2]);
	
	var sumX = 0;
	var sumY = 0;
	
	$('g.forces line').each(function() {
		sumX += Number($(this).attr("x2"));
		sumY += Number($(this).attr("y2"));
	});

	$('line.acceleration').attr("x2",sumX);
	$('line.acceleration').attr("y2",sumY);

	var speedX = Number($('line.speed').attr("x2")) + sumX;
	var speedY = Number($('line.speed').attr("y2")) + sumY;
	$('line.speed').attr("x2",speedX);
	$('line.speed').attr("y2",speedY);
	
	var nx = ox + speedX;
	var ny = oy + speedY;
	
	// Update forces for next round
	if(ny >= 550) {
		// We're on the ground
		ny = 550;
		$('g.forces line.reaction').attr("y2", - Number($('g.forces line.gravity').attr("y2")));
		$('line.speed').attr("y2",0);
	} else {
		// We're in the air
		$('g.forces line.reaction').attr("y2", 0);
		$('g.forces line.horizontal').attr("x2", 0);
		$('g.forces line.vertical').attr("y2", 0);
	}
	$('g.forces line.friction').attr("x2", 0.01 * (speedX * speedX) * (speedX > 0 ? -1 : 1));
	console.log("translate("+nx+","+ny+")");
	p.attr("transform","translate("+nx+","+ny+")");
}

function walk(x,f) {
	return function() {
		$('g.forces line.horizontal').attr("x2",f);
		update();
	}
}

function jump(x,f) {
	return function() {
		$('g.forces line.vertical').attr("y2",f);
		update();
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
	
	$('.actions').on("right",walk("#player1",30));
	$('.actions').on("left",walk("#player1",-30));
	$('.actions').on("up",jump("#player1",-60));
	$('.actions').on("down",update);
});


